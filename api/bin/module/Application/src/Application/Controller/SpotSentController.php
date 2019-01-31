<?php

namespace Application\Controller;

use Application\Entity\RediSpotSent;
use Application\Entity\RediSpotSentFile;
use Application\Entity\RediSpotVersionEditor;
use Zend\Db\Sql\Ddl\Column\Datetime;
use Zend\View\Model\JsonModel;

class SpotSentController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['status_id'] = (int) trim($this->getRequest()->getQuery('status_id', ''));
        $filter['offset'] = (int) trim($this->getRequest()->getQuery('offset', 0));
        $filter['length'] = (int) trim($this->getRequest()->getQuery('length', 10));
        $filter['sort'] = strtolower(trim($this->getRequest()->getQuery('sort', 'update')));
        $filter['spot_sent_type'] = (int) trim($this->getRequest()->getQuery('spot_sent_type', 0));

        $data = $this->_spotRepo->searchSpotSent($filter);
        $totalCount = $this->_spotRepo->searchSpotSentCount($filter);

        foreach ($data as &$dataRow) {
            // if (!empty($dataRow['specSheetFile'])) {
            //     $dataRow['specSheetFile'] = json_decode($dataRow['specSheetFile'], true);

            //     foreach ($dataRow['specSheetFile'] as &$file) {
            //         $file = $this->_config['site_url'] . 'spec_sheet/' . $dataRow['id'] . '/' . $file;
            //     }
            // }

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
            'data' => $data,
        );

        return new JsonModel($response);
    }

    public function get($requestId)
    {
        $data = $this->getSingle($requestId);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data,
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
            $response = $this->createRequestEntry($data, $existingSpotSents);
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Spot sent not exists',
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
            $this->_spotRepo->deleteSpotSentFileByRequestId($requestId);

            foreach ($spotSents as $spotSent) {
                $this->_em->remove($spotSent);
            }

            $this->_em->flush();

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Spot not found.',
            );
        }

        return $response;
    }

    private function createRequestEntry($data, $existingSpotSent = null)
    {
        $requestId = ($existingSpotSent && $existingSpotSent->getRequestId())
        ? (int) $existingSpotSent->getRequestId() : null;
        $isUpdate = (bool) $requestId;
        $existingData = array();

        if ($isUpdate) {
            $existingData = $this->getSingle($requestId, true);

            if (!$existingData) {
                return array(
                    'status' => 0,
                    'message' => 'Spot sent request not found',
                );
            }
        }

        $specSheetDir = $this->_config['directory_path']['spot_sent_spec_sheet'];

        $projectId = $this->_commonRepo->filterPostData($data, 'project_id', 'int', $this->_commonRepo->filterPostData($existingData, 'projectId', 'int', null));
        $fullLock = $this->_commonRepo->filterPostData($data, 'full_lock', 'boolean', $this->_commonRepo->filterPostData($existingData, 'fullLock', 'boolean', 0), true);
        $notes = $this->_commonRepo->filterPostData($data, 'notes', 'string', $this->_commonRepo->filterPostData($existingData, 'notes', 'string', null), true);
        $internalNote = $this->_commonRepo->filterPostData($data, 'internal_note', 'string', $this->_commonRepo->filterPostData($existingData, 'internalNote', 'string', null), true);
        $studioNote = $this->_commonRepo->filterPostData($data, 'studio_note', 'string', $this->_commonRepo->filterPostData($existingData, 'studioNote', 'string', null), true);
        $deadline = $this->_commonRepo->filterPostData($data, 'deadline', 'datetime', $this->_commonRepo->filterPostData($existingData, 'deadline', 'datetimeObj', null));
        $spotSentDate = $this->_commonRepo->filterPostData($data, 'spot_sent_date', 'datetime', $this->_commonRepo->filterPostData($existingData, 'spotSentDate', 'datetimeObj', null));
        $finishingHouse = $this->_commonRepo->filterPostData($data, 'finishing_house', 'int', $this->_commonRepo->filterPostData($existingData, 'finishingHouse', 'int', null));
        $framerate = $this->_commonRepo->filterPostData($data, 'framerate', 'json', $this->_commonRepo->filterPostData($existingData, 'framerate', null, null), true);
        $framerateNote = $this->_commonRepo->filterPostData($data, 'framerate_note', 'string', $this->_commonRepo->filterPostData($existingData, 'framerateNote', 'string', null), true);
        $rasterSize = $this->_commonRepo->filterPostData($data, 'raster_size', 'json', $this->_commonRepo->filterPostData($existingData, 'rasterSize', null, null), true);
        $rasterSizeNote = $this->_commonRepo->filterPostData($data, 'raster_size_note', 'string', $this->_commonRepo->filterPostData($existingData, 'rasterSizeNote', 'string', null), true);
        $musicCueSheet = $this->_commonRepo->filterPostData($data, 'music_cue_sheet', 'boolean', $this->_commonRepo->filterPostData($existingData, 'musicCueSheet', 'boolean', 0), true);
        $audioPrep = $this->_commonRepo->filterPostData($data, 'audio_prep', 'boolean', $this->_commonRepo->filterPostData($existingData, 'audioPrep', 'boolean', 0), true);
        $graphicsFinish = $this->_commonRepo->filterPostData($data, 'graphics_finish', 'boolean', $this->_commonRepo->filterPostData($existingData, 'graphicsFinish', 'boolean', 0), true);
        // $prodAccept = $this->_commonRepo->filterPostData($data, 'prod_accept', 'boolean', $this->_commonRepo->filterPostData($existingData, 'prodAccept', 'boolean', 0));
        // $finishAccept = $this->_commonRepo->filterPostData($data, 'finish_accept', 'boolean', $this->_commonRepo->filterPostData($existingData, 'finishAccept', 'boolean', 0));
        $gfxFinish = $this->_commonRepo->filterPostData($data, 'gfx_finish', 'boolean', $this->_commonRepo->filterPostData($existingData, 'gfxFinish', 'boolean', 0), true);
        $videoPrep = $this->_commonRepo->filterPostData($data, 'video_prep', 'boolean', $this->_commonRepo->filterPostData($existingData, 'videoPrep', 'boolean', 0), true);
        $specNote = $this->_commonRepo->filterPostData($data, 'spec_note', 'string', $this->_commonRepo->filterPostData($existingData, 'specNote', 'string', null), true);
        // $specSheetFile = $this->_commonRepo->filterPostData($data, 'spec_sheet_file');
        $deliveryNote = $this->_commonRepo->filterPostData($data, 'delivery_note', 'string', $this->_commonRepo->filterPostData($existingData, 'deliveryNote', 'string', null), true);
        $statusId = $this->_commonRepo->filterPostData($data, 'status_id', 'int', $this->_commonRepo->filterPostData($existingData, 'statusId', 'int', null), true);
        $audioNote = $this->_commonRepo->filterPostData($data, 'audio_note', 'string', $this->_commonRepo->filterPostData($existingData, 'audioNote', 'string', null), true);
        $graphicsNote = $this->_commonRepo->filterPostData($data, 'graphics_note', 'string', $this->_commonRepo->filterPostData($existingData, 'graphicsNote', 'string', null), true);
        $musicNote = $this->_commonRepo->filterPostData($data, 'music_note', 'string', $this->_commonRepo->filterPostData($existingData, 'musicNote', 'string', null), true);
        $finalNarr = $this->_commonRepo->filterPostData($data, 'final_narr', 'string', $this->_commonRepo->filterPostData($existingData, 'finalNarr', 'string', null), true);

        $deliveryToClient = $this->_commonRepo->filterPostData($data, 'delivery_to_client', 'json', $this->_commonRepo->filterPostData($existingData, 'deliveryToClient', null, null), true);
        $audio = $this->_commonRepo->filterPostData($data, 'audio', 'json', $this->_commonRepo->filterPostData($existingData, 'audio', null, null), true);
        // $sentViaMethod = $this->_commonRepo->filterPostData($data, 'sent_via_method', 'json');
        $finishOption = $this->_commonRepo->filterPostData($data, 'finish_option', 'json', $this->_commonRepo->filterPostData($existingData, 'finishOption', null, null), true);
        $spotVersionData = $this->_commonRepo->filterPostData($data, 'spot_version', 'json', null);
        $customerContact = $this->_commonRepo->filterPostData($data, 'customer_contact', 'json', $this->_commonRepo->filterPostData($existingData, 'customerContact', null, null), true);
        $specSheetFile = $this->_commonRepo->filterPostData($data, 'spec_sheet_file', 'json', null);

        $spotSentType = $this->_commonRepo->filterPostData($data, 'spot_sent_type', 'int', $this->_commonRepo->filterPostData($existingData, 'spotSentType', 'int', 1), 1);
        $qcApproved = $this->_commonRepo->filterPostData($data, 'qc_approved', 'boolean', null, true);
        $qcNote = $this->_commonRepo->filterPostData($data, 'qc_note', 'string', null, true);
        $qcLink = $this->_commonRepo->filterPostData($data, 'qc_link', 'string', null, true);

        // array to commaseparated string
        // $sentViaMethod = $this->arrayToCommaSeparated($sentViaMethod);
        $finishOption = is_array($finishOption) ? $this->arrayToCommaSeparated($finishOption, true) : $finishOption;
        $audio = is_array($audio) ? $this->arrayToCommaSeparated($audio) : $audio;
        $deliveryToClient = is_array($deliveryToClient) ? $this->arrayToCommaSeparated($deliveryToClient, true) : $deliveryToClient;
        $customerContact = is_array($customerContact) ? $this->arrayToCommaSeparated($customerContact) : $customerContact;
        $framerate = is_array($framerate) ? $this->arrayToCommaSeparated($framerate) : $framerate;
        $rasterSize = is_array($rasterSize) ? $this->arrayToCommaSeparated($rasterSize) : $rasterSize;

        if ($isUpdate && !$spotVersionData) {
            $spotVersionData = $this->_spotRepo->getRawSpotVersionDataByRequestId($requestId);
        }

        $files = array();
        $existingSpecSheetFile = array();

        try {
            if (is_array($specSheetFile)) {
                $files = array();

                foreach ($specSheetFile as $key => $file) {
                    $fileDecoded = $this->_commonRepo->base64DecodeFile($file);

                    if (!empty($fileDecoded['extension'])) {
                        $files[$key] = $fileDecoded;
                    }
                }
            } else if ($isUpdate) {
                $existingSpecSheetFile = $this->_commonRepo->filterPostData($existingData, 'specSheetFile', 'json', null, true);
            }
        } catch (\Exception $e) {
            // throw some exception
        }

        if (is_array($spotVersionData)) {
            // if ($isUpdate) {
            //     $this->removeByRequestId($requestId);
            // }

            // process spot version data
            foreach ($spotVersionData as &$sv) {
                // check if spot id is present
                if (!(empty($sv['spot_version_id']) && (empty($sv['spot_id']) || empty(['verion_id'])))) {
                    if (!empty($sv['spot_version_id']) && (int) $sv['spot_version_id']) {
                        $spotVersion = $this->_spotVersionRepository->find((int) $sv['spot_version_id']);

                        if ($spotVersion) {
                            $sv['spot_id'] = $spotVersion->getSpotId();
                            $sv['version_id'] = $spotVersion->getVersionId();
                        }
                    } else {
                        $sv['spot_version_id'] = null;
                    }

                    if (!empty($sv['spot_id']) && !empty($sv['version_id'])) {
                        $spotVersion = $this->_spotVersionRepository->findOneBy(array('spotId' => (int) $sv['spot_id'], 'versionId' => (int) $sv['version_id']));

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
                        $sv['editors_string'] = $this->arrayToCommaSeparated($sv['editors']);
                    }
                }

                $sv['spot_sent_id'] = (!empty($sv['spot_sent_id'])) ? $sv['spot_sent_id'] : null;
                $sv['spot_id'] = (!empty($sv['spot_id'])) ? $sv['spot_id'] : null;
                $sv['version_id'] = (!empty($sv['version_id'])) ? $sv['version_id'] : null;
                $sv['spot_version_id'] = (!empty($sv['spot_version_id'])) ? $sv['spot_version_id'] : null;
                $sv['project_id'] = (!empty($sv['project_id'])) ? $sv['project_id'] : $projectId;
                $sv['campaign_id'] = (!empty($sv['campaign_id'])) ? $sv['campaign_id'] : null;
                $sv['project_campaign_id'] = (!empty($sv['project_campaign_id'])) ? $sv['project_campaign_id'] : null;
                $sv['editors_string'] = (!empty($sv['editors_string'])) ? $sv['editors_string'] : null;
                $sv['spot_resend'] = (isset($sv['spot_resend'])) ? (int) $sv['spot_resend'] : null;
                $sv['finish_request'] = (isset($sv['finish_request'])) ? (int) $sv['finish_request'] : null;
                $sv['finish_accept'] = (isset($sv['finish_accept'])) ? (int) $sv['finish_accept'] : null;
                $sv['prod_accept'] = (isset($sv['prod_accept'])) ? (int) $sv['prod_accept'] : null;
                $sv['line_status_id'] = (isset($sv['line_status_id'])) ? (int) $sv['line_status_id'] : null;
                $sv['graphics_status_id'] = (isset($sv['graphics_status_id'])) ? (int) $sv['graphics_status_id'] : null;
                $sv['qc_approved'] = (isset($sv['qc_approved'])) ? (int) $sv['qc_approved'] : null;
                $sv['qc_note'] = (isset($sv['qc_note'])) ? $sv['qc_note'] : null;
                $sv['qc_link'] = (isset($sv['qc_link'])) ? $sv['qc_link'] : null;
                $sv['delete'] = (isset($sv['delete'])) ? (int) $sv['delete'] : null;

                if ($sv['line_status_id'] < 6) {
                    $sv['graphics_status_id'] = null;
                } else if ($sv['line_status_id'] == 6 && !$sv['graphics_status_id']) {
                    $sv['graphics_status_id'] = 1;
                }

                if ($sv['line_status_id'] == 5) {
                    $sv['qc_approved'] = 1;
                }

                $sentViaMethod = $this->_commonRepo->filterPostData($sv, 'sent_via_method', 'array', array());

                if (!$sentViaMethod) {
                    $sentViaMethod = $this->_commonRepo->filterPostData($sv, 'sent_via_method');
                }

                $sv['sent_via_method'] = is_array($sentViaMethod) ? $this->arrayToCommaSeparated($sentViaMethod) : $sentViaMethod;
                $sv['no_graphics'] = $this->_commonRepo->filterPostData($sv, 'no_graphics', 'boolean', null, true);
                $sv['is_pdf'] = $this->_commonRepo->filterPostData($sv, 'is_pdf', 'boolean', null, true);
                $sv['spot_sent_type'] = $spotSentType;

                $graphicsFiles = $this->_commonRepo->filterPostData($sv, 'graphics_file', 'array', array());

                if (!$graphicsFiles) {
                    $graphicsFiles = $this->_commonRepo->filterPostData($sv, 'graphics_file');
                }

                $sv['graphics_file'] = array();

                if ($graphicsFiles) {
                    $sv['graphics_file'] = array_map(function ($file) {
                        $file['file_name'] = (!empty($file['file_name'])) ? $file['file_name'] : null;
                        $file['file_description'] = (!empty($file['file_description'])) ? $file['file_description'] : null;
                        $file['resend'] = (!empty($file['resend'])) ? $file['resend'] : null;

                        return $file;
                    }, $graphicsFiles);
                }
            }
        }

        if ($projectId && is_array($spotVersionData) && count($spotVersionData)) {
            $requestId = $requestId ? $requestId : $this->_spotRepo->getNextSpotSentRequestId();
            $now = new \DateTime('now');
            $spotSentIds = [];
            // $validate = $this->validateData($requestId, $spotVersionData);

            // if ($validate['result']) {
            foreach ($spotVersionData as $svd) {
                // if spot_sent_id is provided then update
                // if spot_sent_id is provided and delete = 1, then delete existing row
                // if spot_sent_id is not provided then insert a new row
                if ($svd['spot_sent_id']) {
                    $spotSent = $this->_spotSentRepository->find($svd['spot_sent_id']);

                    if (!$spotSent || $spotSent->getRequestId() != $requestId) {
                        continue;
                    }

                    if ($svd['delete']) {
                        $this->_em->remove($spotSent);
                        continue;
                    }
                } else {
                    $spotSent = new RediSpotSent();
                }

                $spotSent->setRequestId($requestId);
                $spotSent->setProjectId($svd['project_id']);
                $spotSent->setCampaignId($svd['campaign_id']);
                $spotSent->setProjectCampaignId($svd['project_campaign_id']);
                $spotSent->setFullLock($fullLock);
                $spotSent->setDeadline($deadline);
                $spotSent->setSpotSentDate($spotSentDate);
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
                $spotSent->setInternalNote($internalNote);
                $spotSent->setStudioNote($studioNote);
                $spotSent->setFinishOption($finishOption);
                $spotSent->setCustomerContact($customerContact);
                $spotSent->setSpotSentType($spotSentType);
                $spotSent->setGraphicsNote($graphicsNote);
                $spotSent->setMusicNote($musicNote);
                $spotSent->setFinalNarr($finalNarr);

                if ($svd['prod_accept'] !== null) {
                    $spotSent->setProdAccept($svd['prod_accept']);
                }

                if ($svd['finish_accept'] !== null) {
                    $spotSent->setFinishAccept($svd['finish_accept']);
                }

                if ($svd['spot_id'] !== null) {
                    $spotSent->setSpotId($svd['spot_id']);
                }

                if ($svd['version_id'] !== null) {
                    $spotSent->setVersionId($svd['version_id']);
                }

                if ($svd['spot_version_id'] !== null) {
                    $spotSent->setSpotVersionId($svd['spot_version_id']);
                }

                if ($svd['editors_string'] !== null) {
                    $spotSent->setEditor($svd['editors_string']);
                }

                if ($svd['spot_resend'] !== null) {
                    $spotSent->setSpotResend($svd['spot_resend']);
                }

                if ($svd['finish_request'] !== null) {
                    $spotSent->setFinishRequest($svd['finish_request']);
                }

                if ($svd['line_status_id'] !== null) {
                    $spotSent->setLineStatusId($svd['line_status_id']);
                }

                if ($svd['graphics_status_id'] !== null) {
                    $spotSent->setGraphicsStatusId($svd['graphics_status_id']);
                }

                if ($svd['sent_via_method'] !== null) {
                    $spotSent->setSentViaMethod($svd['sent_via_method']);
                }

                if ($svd['no_graphics'] !== null) {
                    $spotSent->setNoGraphics($svd['no_graphics']);
                }

                if ($svd['is_pdf'] !== null) {
                    $spotSent->setIsPdf($svd['is_pdf']);
                }

                if ($svd['qc_approved'] !== null) {
                    $spotSent->setQcApproved($svd['qc_approved']);
                } else if ($qcApproved !== null) {
                    $spotSent->setQcApproved($qcApproved);
                }

                if ($svd['qc_note'] !== null) {
                    $spotSent->setQcNote($svd['qc_note']);
                } else if ($qcNote !== null) {
                    $spotSent->setQcNote($qcNote);
                }

                if ($svd['qc_link'] !== null) {
                    $spotSent->setQcLink($svd['qc_link']);
                } else if ($qcLink !== null) {
                    $spotSent->setQcLink($qcLink);
                }

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
                $spotSentId = $spotSent->getId();

                if ($svd['graphics_file']) {
                    $existingGraphicsFiles = $this->_spotSentFileRepository->findBy(array('spotSentId' => $spotSentId));

                    if ($existingGraphicsFiles) {
                        foreach ($existingGraphicsFiles as $existingGraphicsFile) {
                            $this->_em->remove($existingGraphicsFile);
                        }
                    }

                    $this->_em->flush();

                    foreach ($svd['graphics_file'] as $file) {
                        if (empty($file['file_name'])) {
                            continue;
                        }

                        $spotSentFile = new RediSpotSentFile();
                        $spotSentFile->setSpotSentId($spotSentId);
                        $spotSentFile->setFileName($file['file_name']);
                        $spotSentFile->setFileDescription($file['file_description']);
                        $spotSentFile->setResend($file['resend']);
                        $this->_em->persist($spotSentFile);
                    }

                    $this->_em->flush();
                }

                $spotSentIds[] = $spotSentId;
            }

            if (count($spotSentIds)) {
                // save files
                $fileNames = array();

                if (count($files)) {
                    $newDir = $specSheetDir . $requestId;

                    if (!file_exists($newDir)) {
                        mkdir($newDir);
                    }

                    $fileCounter = 0;
                    foreach ($files as $key => $file) {
                        $fileCounter++;
                        $newFileName = md5($fileCounter) . $file['extension'];
                        $fileNames[$key] = $newFileName;
                        $newFileName = $newDir . '/' . $newFileName;

                        file_put_contents($newFileName, $file['data']);
                    }

                    $spotSents = $this->_spotSentRepository->findBy(array('requestId' => $requestId));

                    foreach ($spotSents as $spotSent) {
                        $spotSent->setSpecSheetFile(json_encode($fileNames));
                        $this->_em->persist($spotSent);
                    }

                    $this->_em->flush();
                } else if ($existingSpecSheetFile && count($existingSpecSheetFile)) {
                    $spotSents = $this->_spotSentRepository->findBy(array('requestId' => $requestId));

                    foreach ($spotSents as $spotSent) {
                        $spotSent->setSpecSheetFile(json_encode($existingSpecSheetFile));
                        $this->_em->persist($spotSent);
                    }

                    $this->_em->flush();
                }

                foreach ($spotVersionData as $row) {
                    if (!empty($row['spot_version_id'])) {
                        if (!empty($row['editors']) && is_array($row['editors'])) {
                            $editors = array_unique($row['editors']);
                            $spotVersionId = (int) $row['spot_version_id'];

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

            $this->spotSentSubmissionPostProcess($requestId);

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => $this->getSingle($requestId),
            );

            // }
            //  else {
            //     $response = array(
            //         'status' => 0,
            //         'message' => 'Spot sent information already exists.',
            //         'duplicateData' => $validate['data'],
            //     );
            // }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(project_id, spot_version).',
            );
        }

        return $response;
    }
    private function getSingle($requestId, $raw = false)
    {
        $specSheetDir = $this->_config['file_path_suffix']['spot_sent_spec_sheet'];

        $searchResult = $this->_spotRepo->searchSpotSent(array(
            "request_id" => $requestId,
            "details" => true,
        ));
        $data = array();

        if (count($searchResult)) {
            $data = $searchResult[0];

            if (!$raw) {
                if (!empty($data['projectId'])) {
                    $projectName = $this->_projectRepo->getProjectName($data['projectId'], $this->_user_type_id, true);
                    $data = array_merge($data, $projectName);
                }

                $data['deliveryToClient'] = $this->commaSeparatedToArray($data['deliveryToClient'], true);
                $data['audio'] = $this->commaSeparatedToArray($data['audio']);
                $data['finishOption'] = $this->commaSeparatedToArray($data['finishOption'], true);
                $data['framerate'] = $this->commaSeparatedToArray($data['framerate'], false, 'strval');
                $data['rasterSize'] = $this->commaSeparatedToArray($data['rasterSize'], false, 'strval');
                // $data['customerContact'] = $this->commaSeparatedToArray($data['customerContact']);
                $data['finishingHouseName'] = null;
                $data['customerContact'] = array();

                if (isset($data['customerContactList'])) {
                    $data['customerContact'] = $data['customerContactList'];

                    unset($data['customerContactList']);
                }

                if ((int) $data['finishingHouse']) {
                    $finishingHouse = $this->_finishingHouseRepository->find($data['finishingHouse']);

                    if ($finishingHouse) {
                        $data['finishingHouseName'] = $finishingHouse->getName();
                    }
                }

                if (!empty($data['specSheetFile'])) {
                    $specSheetFiles = json_decode($data['specSheetFile'], true);

                    foreach ($specSheetFiles as &$file) {
                        $file = $this->_config['site_url'] . $specSheetDir . $data['requestId'] . '/' . $file;
                    }

                    $data['specSheetFile'] = $specSheetFiles;
                }

                foreach ($data['spotData'] as &$row) {
                    $row['editor'] = $this->commaSeparatedToArray($row['editor']);
                }
            }
        }

        return $data;
    }

    private function arrayToCommaSeparated($arr, $isParentChild = false)
    {
        if ($isParentChild) {
            if (is_array($arr) && count($arr) === 2 && !empty($arr['parent']) && !empty($arr['child'])) {
                $arr = array(
                    $arr['parent'],
                    $arr['child'],
                );
            }
        }

        $arr = array_filter($arr, function ($item) {
            return !is_array($item);
        });

        return ((is_array($arr) && count($arr)) ? implode(',', $arr) : null);
    }

    private function commaSeparatedToArray($str, $isParentChild = false, $filterFunction = 'intval')
    {
        if (!$str) {
            return array();
        }

        $result = explode(',', $str);

        if (!count($result)) {
            $result = null;
        } else {
            $result = array_map($filterFunction, $result);
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

            if (!empty($sv['spot_version_id']) && (int) $sv['spot_version_id']) {
                $spotVersion = $this->_spotVersionRepository->find((int) $sv['spot_version_id']);

                if ($spotVersion) {
                    $sv['spot_id'] = $spotVersion->getSpotId();
                    $sv['version_id'] = $spotVersion->getVersionId();
                }
            } else {
                $sv['spot_version_id'] = null;
            }

            if (!empty($sv['spot_id']) && !empty($sv['version_id'])) {
                $spotVersion = $this->_spotVersionRepository->findOneBy(array('spotId' => (int) $sv['spot_id'], 'versionId' => (int) $sv['version_id']));

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
                $sv['editors_string'] = $this->arrayToCommaSeparated($sv['editors']);
            } else {
                $sv['editors_string'] = null;
            }

            $sv['spot_resend'] = (!empty($sv['spot_resend'])) ? 1 : 0;
            $sv['finish_request'] = (!empty($sv['finish_request'])) ? 1 : 0;
            $sv['prod_accept'] = (!empty($sv['prod_accept'])) ? 1 : 0;
            $sv['finish_accept'] = (!empty($sv['finish_accept'])) ? 1 : 0;
        }

        return $spotVersionData;
    }

    public function spotSentSubmissionPostProcess($requestId)
    {
        $data = $this->getSingle($requestId);

        if (!$data) {
            return;
        }

        // update all graphics resend field
        $graphicsFilesArr = array_column($data['spotData'], 'graphicsFile');

        if ($graphicsFilesArr) {
            foreach ($graphicsFilesArr as $graphicsFiles) {
                if (!empty($graphicsFiles[0]['spotSentId'])) {
                    $spotSentId = (int) $graphicsFiles[0]['spotSentId'];
                    $hasNull = array_intersect(array(0, null), array_column($graphicsFiles, 'resend'));
                    $resend = $hasNull ? 0 : 1;
                    $spotSentRow = $this->_spotSentRepository->find($spotSentId);

                    if ($spotSentRow) {
                        $spotSentRow->setAllGraphicsResend($resend);
                        $this->_em->persist($spotSentRow);
                    }
                }
            }

            $this->_em->flush();
        }

        $this->_notificationRepo->sendSpotSentNoficationByRequestId($requestId, $this->_user_id);
    }
}
