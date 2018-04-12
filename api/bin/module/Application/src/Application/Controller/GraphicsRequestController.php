<?php

namespace Application\Controller;

use Application\Entity\RediGraphicsRequest;
use Application\Entity\RediGraphicsRequestDesign;
use Application\Entity\RediGraphicsRequestFile;
use Application\Entity\RediGraphicsRequestFinishing;
use Zend\Mvc\MvcEvent;
use Zend\View\Model\JsonModel;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class GraphicsRequestController extends CustomAbstractActionController
{
    public function getList()
    {
        if (in_array($this->_user_type_id, array(2, 3, 8))) {
            $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
            $length = (int)trim($this->getRequest()->getQuery('length', 10));
            $filter['sort'] = trim($this->getRequest()->getQuery('sort', ''));
            $filter['sort_order'] = trim($this->getRequest()->getQuery('sort_order', ''));
            $filter['status_id'] = trim($this->getRequest()->getQuery('status_id', ''));
            $filter['user_type_id'] = $this->_user_type_id;
            $filter['user_id'] = $this->_user_id;

            $data = $this->_graphicsRequestRepo->search($offset, $length, $filter);
            $totalCount = $this->_graphicsRequestRepo->searchCount($filter);

            $response = array(
                'status' => 1,
                'message' => 'Request successful',
                'total_count' => $totalCount,
                'object_count' => count($data),
                'data' => $data
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function get($id)
    {
        if (in_array($this->_user_type_id, array(3, 8))) {
            $data = $this->_graphicsRequestRepo->getById($id);

            $response = array(
                'status' => 1,
                'message' => 'Request successful',
                'data' => $data
            );

        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function create($data)
    {
        if (in_array($this->_user_type_id, array(3, 8))) {
            // common param
            $projectId = (int)trim(isset($data['project_id']) ? $data['project_id'] : '');
            $campaignId = (int)trim(isset($data['campaign_id']) ? $data['campaign_id'] : '');
            $spotId = (int)trim(isset($data['spot_id']) ? $data['spot_id'] : '');
            $versionId = (int)trim(isset($data['version_id']) ? $data['version_id'] : '');
            $resolution = trim(isset($data['resolution']) ? $data['resolution'] : '');
            $resolutionNote = trim(isset($data['resolution_note']) ? $data['resolution_note'] : '');
            $statusId = trim(isset($data['status_id']) ? $data['status_id'] : 1);
            $note = trim(isset($data['note']) ? $data['note'] : '');
            $urgent = (int)trim(isset($data['urgent']) ? $data['urgent'] : 0);
            $inHouse = trim(isset($data['in_house']) ? $data['in_house'] : 1);

            // graphics param
            $frameRate = trim(isset($data['frame_rate']) ? $data['frame_rate'] : '');
            $priority = trim(isset($data['priority']) ? $data['priority'] : '');
            $priorityDate = trim(isset($data['priority_date']) ? $data['priority_date'] : '');
            $burnIn = trim(isset($data['burn_in']) ? $data['burn_in'] : '');

            // finishing param
            $finisherId = (int)trim(isset($data['finisher_id']) ? $data['finisher_id'] : '');
            $formatComped = trim(isset($data['format_comped']) ? $data['format_comped'] : '');
            $formatTextless = trim(isset($data['format_textless']) ? $data['format_textless'] : '');
            $formatKeyable = trim(isset($data['format_keyable']) ? $data['format_keyable'] : '');
            $checkerDue = trim(isset($data['checker_due']) ? $data['checker_due'] : '');
            $checkerDueDate = trim(isset($data['checker_due_date']) ? $data['checker_due_date'] : '');
            $finalRendersDue = trim(isset($data['final_renders_due']) ? $data['final_renders_due'] : '');
            $finalRendersDueDate = trim(isset($data['final_renders_due_date']) ? $data['final_renders_due_date'] : '');
            $finishingAt = trim(isset($data['finishing_at']) ? $data['finishing_at'] : '');
            $finishingContact = trim(isset($data['finishing_contact']) ? $data['finishing_contact'] : '');
            $projectCollect = isset($data['project_collect']) ? (int)trim($data['project_collect']) : null;
            $projectCollectNote = trim(isset($data['project_collect_note']) ? $data['project_collect_note'] : '');
            $stereoFinish = isset($data['stereo_finish']) ? (int)trim($data['stereo_finish']) : null;
            $stereoFinishNote = trim(isset($data['stereo_finish_note']) ? $data['stereo_finish_note'] : '');

            // files
            $files = (array)json_decode(trim(isset($data['files']) ? $data['files'] : ''), true);

            if ($projectId && $statusId) {
                $createdAt = new \DateTime('now');

                if ($priorityDate) {
                    $priorityDate = new \DateTime($priorityDate);
                }

                if ($checkerDueDate) {
                    $checkerDueDate = new \DateTime($checkerDueDate);
                }

                if ($finalRendersDueDate) {
                    $finalRendersDueDate = new \DateTime($finalRendersDueDate);
                }

                $graphicsRequest = new RediGraphicsRequest();
                $graphicsRequest->setProjectId($projectId);
                $graphicsRequest->setCreatedAt($createdAt);
                $graphicsRequest->setCreatedByUserId($this->_user_id);
                $graphicsRequest->setStatusId($statusId);
                $graphicsRequest->setUrgent($urgent);
                $graphicsRequest->setInHouse($inHouse);

                if ($campaignId) {
                    $graphicsRequest->setCampaignId($campaignId);
                }

                if ($spotId) {
                    $graphicsRequest->setSpotId($spotId);
                }

                if ($versionId) {
                    $graphicsRequest->setVersionId($versionId);
                }

                if ($resolution) {
                    $graphicsRequest->setResolution($resolution);
                }

                if ($resolutionNote) {
                    $graphicsRequest->setResolutionNote($resolutionNote);
                }

                if ($note) {
                    $graphicsRequest->setNote($note);
                }

                $this->_em->persist($graphicsRequest);
                $this->_em->flush();

                $graphicsRequestId = $graphicsRequest->getId();


                if ($finisherId) {
                    $graphicsRequestFinishing = new RediGraphicsRequestFinishing();
                    $graphicsRequestFinishing->setGraphicsRequestId($graphicsRequestId);
                    $graphicsRequestFinishing->setFinisherId($finisherId);

                    if ($formatComped) {
                        $graphicsRequestFinishing->setFormatComped($formatComped);
                    }

                    if ($formatTextless) {
                        $graphicsRequestFinishing->setFormatTextless($formatTextless);
                    }

                    if ($formatKeyable) {
                        $graphicsRequestFinishing->setFormatKeyable($formatKeyable);
                    }

                    if ($checkerDue) {
                        $graphicsRequestFinishing->setCheckerDue($checkerDue);
                    }

                    if ($checkerDueDate) {
                        $graphicsRequestFinishing->setCheckerDueDate($checkerDueDate);
                    }

                    if ($finalRendersDue) {
                        $graphicsRequestFinishing->setFinalRendersDue($finalRendersDue);
                    }

                    if ($finalRendersDueDate) {
                        $graphicsRequestFinishing->setFinalRendersDueDate($finalRendersDueDate);
                    }

                    if ($finishingAt) {
                        $graphicsRequestFinishing->setFinishingAt($finishingAt);
                    }

                    if ($finishingContact) {
                        $graphicsRequestFinishing->setFinishingContact($finishingContact);
                    }

                    if ($projectCollect !== null) {
                        $graphicsRequestFinishing->setProjectCollect($projectCollect);
                    }

                    if ($projectCollectNote) {
                        $graphicsRequestFinishing->setProjectCollectNote($projectCollectNote);
                    }

                    if ($stereoFinish !== null) {
                        $graphicsRequestFinishing->setStereoFinish($stereoFinish);
                    }

                    if ($stereoFinishNote) {
                        $graphicsRequestFinishing->setStereoFinishNote($stereoFinishNote);
                    }

                    $this->_em->persist($graphicsRequestFinishing);
                    $this->_em->flush();
                } else if ($frameRate || $priority || $priorityDate || $burnIn) {
                    $graphicsRequestDesign = new RediGraphicsRequestDesign();

                    $graphicsRequestDesign->setGraphicsRequestId($graphicsRequestId);

                    if ($frameRate) {
                        $graphicsRequestDesign->setFrameRate($frameRate);
                    }

                    if ($priority) {
                        $graphicsRequestDesign->setPriority($priority);
                    }

                    if ($priorityDate) {
                        $graphicsRequestDesign->setPriorityDate($priorityDate);
                    }

                    if ($burnIn) {
                        $graphicsRequestDesign->setBurnIn($burnIn);
                    }

                    $this->_em->persist($graphicsRequestDesign);
                    $this->_em->flush();
                }

                if (count($files)) {
                    foreach ($files as $file) {
                        if ($file) {
                            $graphicsRequestFile = new RediGraphicsRequestFile();
                            $graphicsRequestFile->setGraphicsRequestId($graphicsRequestId);
                            $graphicsRequestFile->setFileName($file);

                            $this->_em->persist($graphicsRequestFile);
                        }
                    }

                    $this->_em->flush();
                }

                $responseData = $this->_graphicsRequestRepo->getById($graphicsRequestId);

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $responseData,
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        if (in_array($this->_user_type_id, array(3, 8))) {
            // common param
            $projectId = (int)trim(isset($data['project_id']) ? $data['project_id'] : '');
            $campaignId = (int)trim(isset($data['campaign_id']) ? $data['campaign_id'] : '');
            $spotId = (int)trim(isset($data['spot_id']) ? $data['spot_id'] : '');
            $versionId = (int)trim(isset($data['version_id']) ? $data['version_id'] : '');
            $resolution = trim(isset($data['resolution']) ? $data['resolution'] : '');
            $resolutionNote = trim(isset($data['resolution_note']) ? $data['resolution_note'] : '');
            $statusId = trim(isset($data['status_id']) ? $data['status_id'] : '');
            $note = trim(isset($data['note']) ? $data['note'] : '');
            $urgent = isset($data['urgent']) ? $data['urgent'] : null;
            $inHouse = isset($data['in_house']) ? $data['in_house'] : null;

            // graphics param
            $frameRate = trim(isset($data['frame_rate']) ? $data['frame_rate'] : '');
            $priority = trim(isset($data['priority']) ? $data['priority'] : '');
            $priorityDate = trim(isset($data['priority_date']) ? $data['priority_date'] : '');
            $burnIn = trim(isset($data['burn_in']) ? $data['burn_in'] : '');

            // finishing param
            $finisherId = (int)trim(isset($data['finisher_id']) ? $data['finisher_id'] : '');
            $formatComped = trim(isset($data['format_comped']) ? $data['format_comped'] : '');
            $formatTextless = trim(isset($data['format_textless']) ? $data['format_textless'] : '');
            $formatKeyable = trim(isset($data['format_keyable']) ? $data['format_keyable'] : '');
            $checkerDue = trim(isset($data['checker_due']) ? $data['checker_due'] : '');
            $checkerDueDate = trim(isset($data['checker_due_date']) ? $data['checker_due_date'] : '');
            $finalRendersDue = trim(isset($data['final_renders_due']) ? $data['final_renders_due'] : '');
            $finalRendersDueDate = trim(isset($data['final_renders_due_date']) ? $data['final_renders_due_date'] : '');
            $finishingAt = trim(isset($data['finishing_at']) ? $data['finishing_at'] : '');
            $finishingContact = trim(isset($data['finishing_contact']) ? $data['finishing_contact'] : '');
            $projectCollect = isset($data['project_collect']) ? (int)trim($data['project_collect']) : null;
            $projectCollectNote = trim(isset($data['project_collect_note']) ? $data['project_collect_note'] : '');
            $stereoFinish = isset($data['stereo_finish']) ? (int)trim($data['stereo_finish']) : null;
            $stereoFinishNote = trim(isset($data['stereo_finish_note']) ? $data['stereo_finish_note'] : '');

            // files
            $files = (array)json_decode(trim(isset($data['files']) ? $data['files'] : ''), true);
            $graphicsRequest = $this->_graphicsRequestRepository->find($id);

            if ($graphicsRequest) {
                $updatedAt = new \DateTime('now');

                if ($priorityDate) {
                    $priorityDate = new \DateTime($priorityDate);
                }

                if ($checkerDueDate) {
                    $checkerDueDate = new \DateTime($checkerDueDate);
                }

                if ($finalRendersDueDate) {
                    $finalRendersDueDate = new \DateTime($finalRendersDueDate);
                }

//            $graphicsRequest = new RediGraphicsRequest();
                if ($projectId) {
                    $graphicsRequest->setProjectId($projectId);
                }

                $graphicsRequest->setUpdatedAt($updatedAt);
                $graphicsRequest->setCreatedByUserId($this->_user_id);

                if ($statusId) {
                    $graphicsRequest->setStatusId($statusId);
                }

                if ($campaignId) {
                    $graphicsRequest->setCampaignId($campaignId);
                }

                if ($spotId) {
                    $graphicsRequest->setSpotId($spotId);
                }

                if ($versionId) {
                    $graphicsRequest->setVersionId($versionId);
                }

                if ($resolution) {
                    $graphicsRequest->setResolution($resolution);
                }

                if ($resolutionNote) {
                    $graphicsRequest->setResolutionNote($resolutionNote);
                }

                if ($note) {
                    $graphicsRequest->setNote($note);
                }

                if ($urgent!==null) {
                    $graphicsRequest->setUrgent($urgent);
                }

                if ($inHouse!==null) {
                    $graphicsRequest->setInHouse($inHouse);
                }

                $this->_em->persist($graphicsRequest);
                $this->_em->flush();

                $graphicsRequestId = $graphicsRequest->getId();

                $graphicsRequestDesign = $this->_graphicsRequestDesignRepository->findOneBy(array('graphicsRequestId' => $graphicsRequestId));
                $graphicsRequestFinishing = $this->_graphicsRequestFinishingRepository->findOneBy(array('graphicsRequestId' => $graphicsRequestId));


                if ($graphicsRequestFinishing) {
//                $graphicsRequestFinishing = new RediGraphicsRequestFinishing();
//                if($graphicsRequestId) {
//                    $graphicsRequestFinishing->setGraphicsRequestId($graphicsRequestId);
//                }

                    if ($finisherId) {
                        $graphicsRequestFinishing->setFinisherId($finisherId);
                    }

                    if ($formatComped) {
                        $graphicsRequestFinishing->setFormatComped($formatComped);
                    }

                    if ($formatTextless) {
                        $graphicsRequestFinishing->setFormatTextless($formatTextless);
                    }

                    if ($formatKeyable) {
                        $graphicsRequestFinishing->setFormatKeyable($formatKeyable);
                    }

                    if ($checkerDue) {
                        $graphicsRequestFinishing->setCheckerDue($checkerDue);
                    }

                    if ($checkerDueDate) {
                        $graphicsRequestFinishing->setCheckerDueDate($checkerDueDate);
                    }

                    if ($finalRendersDue) {
                        $graphicsRequestFinishing->setFinalRendersDue($finalRendersDue);
                    }

                    if ($finalRendersDueDate) {
                        $graphicsRequestFinishing->setFinalRendersDueDate($finalRendersDueDate);
                    }

                    if ($finishingAt) {
                        $graphicsRequestFinishing->setFinishingAt($finishingAt);
                    }

                    if ($finishingContact) {
                        $graphicsRequestFinishing->setFinishingContact($finishingContact);
                    }

                    if ($projectCollect !== null) {
                        $graphicsRequestFinishing->setProjectCollect($projectCollect);
                    }

                    if ($projectCollectNote) {
                        $graphicsRequestFinishing->setProjectCollectNote($projectCollectNote);
                    }

                    if ($stereoFinish !== null) {
                        $graphicsRequestFinishing->setStereoFinish($stereoFinish);
                    }

                    if ($stereoFinishNote) {
                        $graphicsRequestFinishing->setStereoFinishNote($stereoFinishNote);
                    }

                    $this->_em->persist($graphicsRequestFinishing);
                    $this->_em->flush();
                } else if ($graphicsRequestDesign) {
//                $graphicsRequestDesign = new RediGraphicsRequestDesign();

//
//                $graphicsRequestDesign->setGraphicsRequestId($graphicsRequestId);

                    if ($frameRate) {
                        $graphicsRequestDesign->setFrameRate($frameRate);
                    }

                    if ($priority) {
                        $graphicsRequestDesign->setPriority($priority);
                    }

                    if ($priorityDate) {
                        $graphicsRequestDesign->setPriorityDate($priorityDate);
                    }

                    if ($burnIn) {
                        $graphicsRequestDesign->setBurnIn($burnIn);
                    }

                    $this->_em->persist($graphicsRequestDesign);
                    $this->_em->flush();
                }

                if (count($files)) {
                    $existingFiles = $this->_graphicsRequestFileRepository->findBy(array('graphicsRequestId' => $graphicsRequestId));

                    foreach ($existingFiles as $existingFile) {
                        $this->_em->remove($existingFile);
                    }

                    $this->_em->flush();

                    foreach ($files as $file) {
                        if ($file) {
                            $graphicsRequestFile = new RediGraphicsRequestFile();
                            $graphicsRequestFile->setGraphicsRequestId($graphicsRequestId);
                            $graphicsRequestFile->setFileName($file);

                            $this->_em->persist($graphicsRequestFile);
                        }
                    }

                    $this->_em->flush();
                }

                $responseData = $this->_graphicsRequestRepo->getById($graphicsRequestId);

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $responseData,
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Graphics request not found.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }


        return new JsonModel($response);
    }


}
