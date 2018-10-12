<?php

namespace Application\Controller;

use Application\Entity\RediProjectHistory;
use Application\Entity\RediSpot;
use Application\Entity\RediSpotSent;
use Application\Entity\RediSpotSentToCustomerContact;
use Application\Entity\RediSpotSentToSpotVersion;
use Application\Entity\RediSpotSentToSpotVersionToEditorDesigner;
use Zend\Db\Sql\Ddl\Column\Datetime;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;
use Application\Entity\RediSpotVersionEditor;

class SpotSentController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['status_id'] = (int)trim($this->getRequest()->getQuery('status_id', ''));
        $filter['offset'] = (int)trim($this->getRequest()->getQuery('offset', 0));
        $filter['length'] = (int)trim($this->getRequest()->getQuery('length', 10));
        $filter['sort'] = strtolower(trim($this->getRequest()->getQuery('sort', 'update')));

        $data = $this->_spotRepo->searchSpotSent($filter);
        $totalCount = $this->_spotRepo->searchSpotSentCount($filter);

        foreach ($data as &$dataRow) {
            if (!empty($dataRow['specSheetFile'])) {
                $dataRow['specSheetFile'] = json_decode($dataRow['specSheetFile'], true);

                foreach ($dataRow['specSheetFile'] as &$file) {
                    $file = $this->_config['site_url'] . 'spec_sheet/' . $dataRow['id'] . '/' . $file;
                }
            }

            if (!empty($dataRow['projectId'])) {
                $projectName = $this->_projectRepo->getProjectName($dataRow['projectId'], $this->_user_type_id, true);
                $dataRow = array_merge($dataRow, $projectName);
            }
        }

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data
        );

        return new JsonModel($response);
    }

    public function get($requestId)
    {
        $data = $this->getSingle($requestId);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );

        return new JsonModel($response);
    }

    public function create($data)
    {
        $response = $this->createRequestEntry($data);

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($requestId, $data)
    {
        $existingSpotSents = $this->_spotSentRepository->findOneBy(array('requestId' => $requestId));

        if ($existingSpotSents) {
            $this->removeByRequestId($requestId);
            $response = $this->createRequestEntry($data, $existingSpotSents);
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Spot sent not exists'
            );

        }
        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function delete($requestId)
    {
        $response = $this->removeByRequestId($requestId);
        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    private function removeByRequestId($requestId)
    {
        $spotSents = $this->_spotSentRepository->findBy(array('requestId' => $requestId));

        if (count($spotSents)) {
            foreach ($spotSents as $spotSent) {
                $this->_em->remove($spotSent);
            }

            $this->_em->flush();

            $response = array(
                'status' => 1,
                'message' => 'Request successful.'
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Spot not found.'
            );
        }

        return $response;
    }

    private function createRequestEntry($data, $existingSpotSent = null)
    {
        $requestId = ($existingSpotSent && $existingSpotSent->getRequestId())
            ? (int)$existingSpotSent->getRequestId() : null;
        $isUpdate = (bool)$requestId;

        $specSheetDir = $this->_config['directory_path']['spot_sent_spec_sheet'];

        $projectId = $this->_commonRepo->filterPostData($data, 'project_id', 'int');
        $fullLock = $this->_commonRepo->filterPostData($data, 'full_lock', 'boolean', 0);
        $notes = $this->_commonRepo->filterPostData($data, 'notes');
        $deadline = $this->_commonRepo->filterPostData($data, 'deadline', 'datetime');
        $finishingHouse = $this->_commonRepo->filterPostData($data, 'finishing_house', 'int');
        $framerate = $this->_commonRepo->filterPostData($data, 'framerate');
        $framerateNote = $this->_commonRepo->filterPostData($data, 'framerate_note');
        $rasterSize = $this->_commonRepo->filterPostData($data, 'raster_size');
        $rasterSizeNote = $this->_commonRepo->filterPostData($data, 'raster_size_note');
        $musicCueSheet = $this->_commonRepo->filterPostData($data, 'music_cue_sheet', 'boolean', 0);
        $audioPrep = $this->_commonRepo->filterPostData($data, 'audio_prep', 'boolean', 0);
        $graphicsFinish = $this->_commonRepo->filterPostData($data, 'graphics_finish', 'boolean', 0);
        $gfxFinish = $this->_commonRepo->filterPostData($data, 'gfx_finish', 'boolean', 0);
        $videoPrep = $this->_commonRepo->filterPostData($data, 'video_prep', 'boolean', 0);
        $specNote = $this->_commonRepo->filterPostData($data, 'spec_note');
        $specSheetFile = $this->_commonRepo->filterPostData($data, 'spec_sheet_file');
        $deliveryNote = $this->_commonRepo->filterPostData($data, 'delivery_note');
        $statusId = $this->_commonRepo->filterPostData($data, 'status_id', 'int');
        $audioNote = $this->_commonRepo->filterPostData($data, 'audio_note');

        $deliveryToClient = $this->_commonRepo->filterPostData($data, 'delivery_to_client', 'json');
        $audio = $this->_commonRepo->filterPostData($data, 'audio', 'json');
        // $sentViaMethod = $this->_commonRepo->filterPostData($data, 'sent_via_method', 'json');
        $finishOption = $this->_commonRepo->filterPostData($data, 'finish_option', 'json');
        $spotVersionData = $this->_commonRepo->filterPostData($data, 'spot_version', 'json');
        $customerContact = $this->_commonRepo->filterPostData($data, 'customer_contact', 'json');

        // array to commaseparated string
        // $sentViaMethod = $this->arrayToCommanSeparated($sentViaMethod);
        $finishOption = $this->arrayToCommanSeparated($finishOption, true);
        $audio = $this->arrayToCommanSeparated($audio);
        $deliveryToClient = $this->arrayToCommanSeparated($deliveryToClient, true);
        $customerContact = $this->arrayToCommanSeparated($customerContact);

        $files = array();

        if ($specSheetFile) {
            $files = json_decode($specSheetFile, true);

            foreach ($files as $key => $file) {
                $files[$key] = $this->_commonRepo->base64DecodeFile($file);
            }
        }


        if (is_array($spotVersionData)) {
        // process spot version data
            foreach ($spotVersionData as &$sv) {
            // check if spot id is present
                if (empty($sv['spot_version_id']) && (empty($sv['spot_id']) || empty(['verion_id']))) {
                    continue;
                }

                if (!empty($sv['spot_version_id']) && (int)$sv['spot_version_id']) {
                    $spotVersion = $this->_spotVersionRepository->find((int)$sv['spot_version_id']);

                    if ($spotVersion) {
                        $sv['spot_id'] = $spotVersion->getSpotId();
                        $sv['version_id'] = $spotVersion->getVersionId();
                    }
                } else {
                    $sv['spot_version_id'] = null;
                }

                if (!empty($sv['spot_id']) && !empty($sv['version_id'])) {
                    $spotVersion = $this->_spotVersionRepository->findOneBy(array('spotId' => (int)$sv['spot_id'], 'versionId' => (int)$sv['version_id']));

                    if ($spotVersion) {
                        $sv['spot_version_id'] = $spotVersion->getId();
                    }
                }

                if (!empty($sv['campaign_id']) && $projectId) {
                    $projectCampaign = $this->_projectToCampaignRepository->findOneBy(array('projectId' => $projectId, 'campaignId' => $sv['campaign_id']));

                    if ($projectCampaign) {
                        $sv['project_id'] = $projectCampaign->getProjectId();
                        $sv['project_campaign_id'] = $projectCampaign->getId();
                    } else {
                        $sv['project_id'] = $projectId;
                        $sv['project_campaign_id'] = null;
                    }
                } else if (!empty($sv['project_campaign_id'])) {
                    $projectCampaign = $this->_projectToCamapignReposivoty->findOne($sv['project_campaign_id']);

                    if ($projectCampaign) {
                        $sv['project_id'] = $projectCampaign->getProjectId();
                        $sv['campaign_id'] = $projectCampaign->getCampaignId();
                    }
                } else {
                    $sv['project_id'] = $projectId;
                    $sv['campaign_id'] = null;
                    $sv['project_campaign_id'] = null;
                }

                if (!empty($sv['editors']) && is_array($sv['editors'])) {
                    $sv['editors_string'] = $this->arrayToCommanSeparated($sv['editors']);
                } else {
                    $sv['editors_string'] = null;
                }

                $sv['spot_resend'] = (!empty($sv['spot_resend'])) ? 1 : 0;
                $sv['finish_request'] = (!empty($sv['finish_request'])) ? 1 : 0;
                $sv['line_status_id'] = $this->_commonRepo->filterPostData($sv, 'line_status_id', 'int', 1);
                $sentViaMethod = $this->_commonRepo->filterPostData($sv, 'sent_via_method', 'array', array());
                $sv['sent_via_method'] = $this->arrayToCommanSeparated($sentViaMethod);
            }
        }

        // var_dump($spotVersionData); exit;
        if (($sentViaMethod || $finishOption) && is_array($spotVersionData)) {
            $requestId = $requestId ? $requestId : $this->_spotRepo->getNextSpotSentRequestId();
            $now = new \DateTime('now');
            $spotSentIds = [];

            foreach ($spotVersionData as $svd) {
                $spotSent = new RediSpotSent();
                $spotSent->setRequestId($requestId);
                $spotSent->setProjectId($svd['project_id']);
                $spotSent->setCampaignId($svd['campaign_id']);
                $spotSent->setProjectCampaignId($svd['project_campaign_id']);
                $spotSent->setFullLock($fullLock);
                $spotSent->setDeadline($deadline);
                $spotSent->setFinishingHouse($finishingHouse);
                $spotSent->setFramerate($framerate);
                $spotSent->setFramerateNote($framerateNote);
                $spotSent->setRasterSize($rasterSize);
                $spotSent->setRasterSizeNote($rasterSizeNote);
                $spotSent->setMusicCueSheet($musicCueSheet);
                $spotSent->setAudioPrep($audioPrep);
                $spotSent->setAudio($audio);
                $spotSent->setAudioNote($audioNote);
                $spotSent->setGraphicsFinish($graphicsFinish);
                $spotSent->setGfxFinish($gfxFinish);
                $spotSent->setVideoPrep($videoPrep);
                $spotSent->setSpecNote($specNote);
                $spotSent->setDeliveryToClient($deliveryToClient);
                $spotSent->setDeliveryNote($deliveryNote);
                $spotSent->setStatusId($statusId);
                $spotSent->setNotes($notes);
                $spotSent->setFinishOption($finishOption);
                $spotSent->setCustomerContact($customerContact);

                $spotSent->setSpotId($svd['spot_id']);
                $spotSent->setVersionId($svd['version_id']);
                $spotSent->setSpotVersionId($svd['spot_version_id']);
                $spotSent->setEditor($svd['editors_string']);
                $spotSent->setSpotResend($svd['spot_resend']);
                $spotSent->setFinishRequest($svd['finish_request']);
                $spotSent->setLineStatusId($svd['line_status_id']);
                $spotSent->setSentViaMethod($svd['sent_via_method']);

                if ($isUpdate) {
                    $spotSent->setCreatedAt($existingSpotSent->getCreatedAt());
                    $spotSent->setCreatedBy($existingSpotSent->getCreatedBy());

                    $spotSent->setUpdatedAt($now);
                    $spotSent->setUpdatedBy($this->_user_id);
                } else {
                    $spotSent->setCreatedAt($now);
                    $spotSent->setCreatedBy($this->_user_id);
                }

                $this->_em->persist($spotSent);
                $this->_em->flush();
                $spotSentIds[] = $spotSent->getId();
            }

            if (count($spotSentIds)) {
                // save files
                $fileNames = array();

                if (count($files)) {
                    $newDir = $specSheetDir . $requestId;

                    if (!file_exists($newDir)) {
                        mkdir($newDir);
                    }

                    foreach ($files as $key => $file) {
                        $newFileName = md5($key) . $file['extension'];
                        $fileNames[] = $newFileName;
                        $newFileName = $newDir . '/' . $newFileName;

                        file_put_contents($newFileName, $file['data']);
                    }

                    $spotSents = $this->_spotSentRepository->findBy(array('requestId' => $requestId));

                    foreach ($spotSents as $spotSent) {
                        $spotSent->setSpecSheetFile(json_encode($fileNames));
                        $this->_em->persist($spotSent);
                    }

                    $this->_em->flush();
                }

                foreach ($spotVersionData as $row) {
                    if (!empty($row['spot_version_id'])) {
                        if (!empty($row['editors']) && is_array($row['editors'])) {
                            $editors = array_unique($row['editors']);
                            $spotVersionId = (int)$row['spot_version_id'];

                            $spotVersionEditors = $this->_spotVersionEditorRepository->findBy(array('spotVersionId' => $spotVersionId));

                            foreach ($spotVersionEditors as $spotVersionEditor) {
                                $this->_em->remove($spotVersionEditor);
                            }

                            $this->_em->flush();

                            foreach ($editors as $editorId) {
                                $spotVersionEditor = new RediSpotVersionEditor();
                                $spotVersionEditor->setSpotVersionId($spotVersionId);
                                $spotVersionEditor->setUserId($editorId);
                                $this->_em->persist($spotVersionEditor);
                            }
                        }

                        $this->_em->flush();
                    }
                }
            }

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => $this->getSingle($requestId),
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(finish_option, sent_via_method, spot_version).'
            );
        }

        return $response;
    }
    private function getSingle($requestId)
    {
        $searchResult = $this->_spotRepo->searchSpotSent(array(
            "request_id" => $requestId,
            "details" => true,
        ));
        $data = null;

        if (count($searchResult)) {
            $data = $searchResult[0];

            if (!empty($data['projectId'])) {
                $projectName = $this->_projectRepo->getProjectName($data['projectId'], $this->_user_type_id, true);
                $data = array_merge($data, $projectName);
            }
        }

        $data['deliveryToClient'] = $this->commaSeparatedToArray($data['deliveryToClient'], true);
        $data['audio'] = $this->commaSeparatedToArray($data['audio']);
        // $data['sentViaMethod'] = $this->commaSeparatedToArray($data['sentViaMethod']);
        $data['finishOption'] = $this->commaSeparatedToArray($data['finishOption'], true);
        $data['customerContact'] = $this->commaSeparatedToArray($data['customerContact']);

        return $data;
    }

    private function arrayToCommanSeparated($arr, $isParentChild = false)
    {
        if ($isParentChild) {
            if (is_array($arr) && count($arr) === 2 && !empty($arr['parent']) && !empty($arr['child'])) {
                $arr = array(
                    $arr['parent'],
                    $arr['child'],
                );
            }
        }

        return ((is_array($arr) && count($arr)) ? implode(',', $arr) : null);
    }

    private function commaSeparatedToArray($str, $isParentChild = false)
    {
        $result = explode(',', $str);

        if (!count($result)) {
            $result = null;
        } else {
            $result = array_map('intval', $result);
        }

        if ($isParentChild) {
            if (count($result) === 2) {
                $result = array(
                    'parent' => $result[0],
                    'child' => $result[1],
                );
            } else {
                $result = null;
            }
        }

        return $result;

    }

    private function filterSpotVersionData($projectId, $spotVersionData)
    {
        // process spot version data
        foreach ($spotVersionData as &$sv) {
            // check if spot id is present
            if (empty($sv['spot_version_id']) && (empty($sv['spot_id']) || empty(['verion_id']))) {
                continue;
            }

            if (!empty($sv['spot_version_id']) && (int)$sv['spot_version_id']) {
                $spotVersion = $this->_spotVersionRepository->find((int)$sv['spot_version_id']);

                if ($spotVersion) {
                    $sv['spot_id'] = $spotVersion->getSpotId();
                    $sv['version_id'] = $spotVersion->getVersionId();
                }
            } else {
                $sv['spot_version_id'] = null;
            }

            if (!empty($sv['spot_id']) && !empty($sv['version_id'])) {
                $spotVersion = $this->_spotVersionRepository->findOneBy(array('spotId' => (int)$sv['spot_id'], 'versionId' => (int)$sv['version_id']));

                if ($spotVersion) {
                    $sv['spot_version_id'] = $spotVersion->getId();
                }
            }

            if (!empty($sv['campaign_id']) && $projectId) {
                $projectCampaign = $this->_projectToCampaignRepository->findOneBy(array('projectId' => $projectId, 'campaignId' => $sv['campaign_id']));

                if ($projectCampaign) {
                    $sv['project_id'] = $projectCampaign->getProjectId();
                    $sv['project_campaign_id'] = $projectCampaign->getId();
                } else {
                    $sv['project_id'] = $projectId;
                    $sv['project_campaign_id'] = null;
                }
            } else if (!empty($sv['project_campaign_id'])) {
                $projectCampaign = $this->_projectToCamapignReposivoty->findOne($sv['project_campaign_id']);

                if ($projectCampaign) {
                    $sv['project_id'] = $projectCampaign->getProjectId();
                    $sv['campaign_id'] = $projectCampaign->getCampaignId();
                }
            } else {
                $sv['project_id'] = $projectId;
                $sv['campaign_id'] = null;
                $sv['project_campaign_id'] = null;
            }

            if (!empty($sv['editors']) && is_array($sv['editors'])) {
                $sv['editors_string'] = $this->arrayToCommanSeparated($sv['editors']);
            } else {
                $sv['editors_string'] = null;
            }

            $sv['spot_resend'] = (!empty($sv['spot_resend'])) ? 1 : 0;
            $sv['finish_request'] = (!empty($sv['finish_request'])) ? 1 : 0;
        }

        return $spotVersionData;
    }
}
