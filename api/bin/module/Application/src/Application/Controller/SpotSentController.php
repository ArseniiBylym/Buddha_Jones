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

        $projectId = (!empty($data['project_id'])) ? (int)$data['project_id'] : 0;
        $fullLock = (!empty($data['full_lock'])) ? 1 : 0;
        $notes = (!empty($data['notes'])) ? trim($data['notes']) : null;
        $deadline = (!empty($data['deadline'])) ? trim($data['deadline']) : null;
        $finishingHouse = (!empty($data['finishing_house'])) ? trim($data['finishing_house']) : null;
        $framerate = (!empty($data['framerate'])) ? trim($data['framerate']) : null;
        $framerateNote = (!empty($data['framerate_note'])) ? trim($data['framerate_note']) : null;
        $rasterSize = (!empty($data['raster_size'])) ? trim($data['raster_size']) : null;
        $rasterSizeNote = (!empty($data['raster_size_note'])) ? trim($data['raster_size_note']) : null;
        $musicCueSheet = (!empty($data['music_cue_sheet'])) ? 1 : 0;
        $audioPrep = (!empty($data['audio_prep'])) ? 1 : 0;
        $graphicsFinish = (!empty($data['graphics_finish'])) ? 1 : 0;
        $gfxFinish = (!empty($data['gfx_finish'])) ? 1 : 0;
        $videoPrep = (!empty($data['video_prep'])) ? 1 : 0;
        $specNote = (!empty($data['spec_note'])) ? trim($data['spec_note']) : null;
        $specSheetFile = (!empty($data['spec_sheet_file'])) ? trim($data['spec_sheet_file']) : null;
        $deliveryNote = (!empty($data['delivery_note'])) ? trim($data['delivery_note']) : null;
        $statusId = (!empty($data['status_id'])) ? trim($data['status_id']) : null;
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

        if ($sentViaMethod || $finishOption) {
            $now = new \DateTime('now');

            $spotSent = new RediSpotSent();
            $spotSent->setProjectId($projectId);
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

            $data = array_merge($this->getSingle($spotSentId), array(
                'spot_sent_id' => $spotSentId
            ));

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
