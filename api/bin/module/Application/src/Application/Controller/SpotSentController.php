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

            if (!empty($dataRow['projectSpotVersion'])) {
                foreach ($dataRow['projectSpotVersion'] as &$projectSpotVersion) {
                    // set project name
                    $projectName = $this->_projectRepo->getProjectName($projectSpotVersion['projectId'], $this->_user_type_id, true);
                    $projectSpotVersion = array_merge($projectSpotVersion, $projectName);
                }
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

    public function get($spotSentId)
    {
        $data = $this->getSingle($spotSentId);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );

        return new JsonModel($response);
    }

    public function create($data)
    {
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
        $sentViaMethod = $this->_commonRepo->filterPostData($data, 'sent_via_method', 'json');
        $finishOption = $this->_commonRepo->filterPostData($data, 'finish_option', 'json');
        $spotVersionData = $this->_commonRepo->filterPostData($data, 'spot_version', 'json');

        // array to commaseparated string
        $sentViaMethod = $this->arrayToCommanSeparated($sentViaMethod);
        $finishOption = $this->arrayToCommanSeparated($finishOption, true);
        $audio = $this->arrayToCommanSeparated($audio);
        $deliveryToClient = $this->arrayToCommanSeparated($deliveryToClient, true);

        $files = array();

        if ($specSheetFile) {
            $files = json_decode($specSheetFile, true);

            foreach ($files as $key => $file) {
                $files[$key] = $this->_commonRepo->base64DecodeFile($file);
            }
        }

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

        if ($sentViaMethod || $finishOption) {
            $requestId = $this->_spotRepo->getNextSpotSentRequestId();
            $now = new \DateTime('now');
            $spotSentIds = [];

            foreach ($spotVersionData as $sv) {
                $spotSent = new RediSpotSent();
                $spotSent->setRequestId($requestId);
                $spotSent->setProjectId($sv['project_id']);
                $spotSent->setCampaignId($sv['campaign_id']);
                $spotSent->setProjectCampaignId($sv['project_campaign_id']);
                $spotSent->setFullLock($fullLock);
                $spotSent->setSentViaMethod($sentViaMethod);
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
                $spotSent->setCreatedAt($now);
                $spotSent->setCreatedBy($this->_user_id);

                $spotSent->setSpotId($sv['spot_id']);
                $spotSent->setVersionId($sv['version_id']);
                $spotSent->setSpotVersionId($sv['spot_version_id']);
                $spotSent->setEditor($sv['editors_string']);
                $spotSent->setSpotResend($sv['spot_resend']);
                $spotSent->setFinishRequest($sv['finish_request']);

                $this->_em->persist($spotSent);
                $this->_em->flush();
                $spotSentIds[] = $spotSent->getId();
            }
            
            if(count($spotSentIds)) {
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

                    foreach($spotSents as $spotSent) {  
                        $spotSent->setSpecSheetFile(json_encode($fileNames));
                        $this->_em->persist($spotSent);
                    }

                    $this->_em->flush();
                }

                foreach ($spotVersion as $row) {
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

            $data = $requestId; 
            // array_merge($this->getSingle($spotSentId), array(
            //     'spot_sent_id' => $spotSentId
            // ));

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => $data,
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(finsish_option, sent_via_method).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        $specSheetDir = $this->_config['directory_path']['spot_sent_spec_sheet'];

        $projectId = (isset($data['project_id'])) ? (int)$data['project_id'] : null;
        $fullLock = (isset($data['full_lock'])) ? (int)$data['full_lock'] : null;
        $notes = (isset($data['notes'])) ? trim($data['notes']) : null;
        $deadline = (isset($data['deadline'])) ? trim($data['deadline']) : null;
        $finishingHouse = (isset($data['finishing_house'])) ? trim($data['finishing_house']) : null;
        $framerate = (isset($data['framerate'])) ? trim($data['framerate']) : null;
        $framerateNote = (isset($data['framerate_note'])) ? trim($data['framerate_note']) : null;
        $rasterSize = (isset($data['raster_size'])) ? trim($data['raster_size']) : null;
        $rasterSizeNote = (isset($data['raster_size_note'])) ? trim($data['raster_size_note']) : null;
        $musicCueSheet = (isset($data['music_cue_sheet'])) ? (int)$data['music_cue_sheet'] : null;
        $audioPrep = (isset($data['audio_prep'])) ? (int)$data['audio_prep'] : null;
        $graphicsFinish = (isset($data['graphics_finish'])) ? (int)$data['graphics_finish'] : null;
        $gfxFinish = (isset($data['gfx_finish'])) ? (int)$data['gfx_finish'] : null;
        $videoPrep = (isset($data['video_prep'])) ? (int)$data['video_prep'] : null;
        $specNote = (isset($data['spec_note'])) ? trim($data['spec_note']) : null;
        $specSheetFile = (isset($data['spec_sheet_file'])) ? trim($data['spec_sheet_file']) : null;
        $deliveryNote = (isset($data['delivery_note'])) ? trim($data['delivery_note']) : null;
        $statusId = (isset($data['status_id'])) ? trim($data['status_id']) : null;
        $deliveryToClient = (array)json_decode((!empty($data['delivery_to_client'])) ? trim($data['delivery_to_client']) : null, true);
        $audio = (array)json_decode((isset($data['audio'])) ? $data['audio'] : null, true);
        $sentViaMethod = (array)json_decode((!empty($data['sent_via_method'])) ? trim($data['sent_via_method']) : null, true);
        $finishOption = (array)json_decode((!empty($data['finish_option'])) ? trim($data['finish_option']) : null, true);
        $spotVersion = (array)json_decode(isset($data['spot_version']) ? trim($data['spot_version']) : null, true);

        // array to commaseparated string
        $sentViaMethod = $this->arrayToCommanSeparated($sentViaMethod);
        $finishOption = $this->arrayToCommanSeparated($finishOption, true);
        $audio = $this->arrayToCommanSeparated($audio);
        $deliveryToClient = $this->arrayToCommanSeparated($deliveryToClient, true);

        $files = array();

        if ($specSheetFile) {
            $files = json_decode($specSheetFile, true);

            foreach ($files as $key => $file) {
                $files[$key] = $this->_commonRepo->base64DecodeFile($file);
            }
        }

        if ($id) {
            $spotSent = $this->_spotSentRepository->find($id);

            if ($spotSent) {
                $now = new \DateTime('now');

                if ($projectId !== null) {
                    $spotSent->setProjectId($projectId);
                }

                if ($fullLock !== null) {
                    $spotSent->setFullLock($fullLock);
                }

                if ($sentViaMethod !== null) {
                    $spotSent->setSentViaMethod($sentViaMethod);
                }

                if ($deadline !== null) {
                    $spotSent->setDeadline($deadline);
                }

                if ($finishingHouse !== null) {
                    $spotSent->setFinishingHouse($finishingHouse);
                }

                if ($framerate !== null) {
                    $spotSent->setFramerate($framerate);
                }

                if ($framerateNote !== null) {
                    $spotSent->setFramerateNote($framerateNote);
                }

                if ($rasterSize !== null) {
                    $spotSent->setRasterSize($rasterSize);
                }

                if ($rasterSizeNote !== null) {
                    $spotSent->setRasterSizeNote($rasterSizeNote);
                }

                if ($musicCueSheet !== null) {
                    $spotSent->setMusicCueSheet($musicCueSheet);
                }

                if ($audioPrep !== null) {
                    $spotSent->setAudioPrep($audioPrep);
                }

                if ($audio !== null) {
                    $spotSent->setAudio($audio);
                }

                if ($graphicsFinish !== null) {
                    $spotSent->setGraphicsFinish($graphicsFinish);
                }

                if ($gfxFinish !== null) {
                    $spotSent->setGfxFinish($gfxFinish);
                }

                if ($projectId !== null) {
                    $spotSent->setVideoPrep($videoPrep);
                }

                if ($videoPrep !== null) {
                    $spotSent->setSpecNote($specNote);
                }

                if ($deliveryToClient !== null) {
                    $spotSent->setDeliveryToClient($deliveryToClient);
                }

                if ($deliveryNote !== null) {
                    $spotSent->setDeliveryNote($deliveryNote);
                }

                if ($statusId !== null) {
                    $spotSent->setStatusId($statusId);
                }

                if ($notes !== null) {
                    $spotSent->setNotes($notes);
                }

                if ($finishOption !== null) {
                    $spotSent->setFinishOption($finishOption);
                }

                $spotSent->setUpdatedAt($now);
                $spotSent->setUpdatedBy($this->_user_id);

                $this->_em->persist($spotSent);
                $this->_em->flush();

                $spotSentId = $spotSent->getId();

                // save files
                $fileNames = array();

                if (count($files)) {
                    $newDir = $specSheetDir . $spotSentId;

                    if (!file_exists($newDir)) {
                        mkdir($newDir);
                    }

                    foreach ($files as $key => $file) {
                        $newFileName = md5($key) . $file['extension'];
                        $fileNames[] = $newFileName;
                        $newFileName = $newDir . '/' . $newFileName;

                        file_put_contents($newFileName, $file['data']);
                    }

                    $spotSent->setSpecSheetFile(json_encode($fileNames));
                    $this->_em->persist($spotSent);
                    $this->_em->flush();
                }

                $existingSpotVersion = $this->_spotSentToSpotVersionRepository->findBy(array('spotSentId' => $spotSentId));

                foreach ($existingSpotVersion as $existingRow) {
                    $this->_em->remove($existingRow);
                }

                $this->_em->flush();

                foreach ($spotVersion as $row) {
                    if (!empty($row['spot_version_id'])) {
                        $spotVersionId = (int)$row['spot_version_id'];
                        $spotSentToSpotVersion = new RediSpotSentToSpotVersion();
                        $spotSentToSpotVersion->setSpotSentId($spotSentId);
                        $spotSentToSpotVersion->setSpotVersionId($spotVersionId);

                        $this->_em->persist($spotSentToSpotVersion);

                        if (!empty($row['editors']) && is_array($row['editors'])) {
                            $editors = array_unique($row['editors']);
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

                $data = array_merge($this->getSingle($id), array(
                    'spot_sent_id' => $id
                ));

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $data,
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Spot sent does not exist'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(finsish_option, sent_via_method).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function delete($id)
    {
        $spotSent = $this->_spotSentRepository->find($id);

        if ($spotSent) {
            $this->_em->remove($spotSent);
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

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    private function getSingle($spotSentId)
    {
        $searchResult = $this->_spotRepo->searchSpotSent(array("id" => $spotSentId));
        $data = null;

        if (count($searchResult)) {
            $data = $searchResult[0];

            foreach ($data['projectSpotVersion'] as &$projectSpotVersion) {
                // set project name
                $projectName = $this->_projectRepo->getProjectName($projectSpotVersion['projectId'], $this->_user_type_id, true);
                $projectSpotVersion = array_merge($projectSpotVersion, $projectName);

                unset($projectSpotVersion['projectCode']);
            }
        }

        $data['deliveryToClient'] = $this->commaSeparatedToArray($data['deliveryToClient'], true);
        $data['audio'] = $this->commaSeparatedToArray($data['audio']);
        $data['sentViaMethod'] = $this->commaSeparatedToArray($data['sentViaMethod']);
        $data['finishOption'] = $this->commaSeparatedToArray($data['finishOption'], true);

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
}
