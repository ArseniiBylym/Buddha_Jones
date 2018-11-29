<?php

namespace Application\Controller;

use Application\Entity\RediProjectHistory;
use Application\Entity\RediSpot;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class SpotBillingController extends CustomAbstractActionController
{
    public function getList()
    {
        $canViewSpot = $this->_usersRepo->extractPermission($this->_user_permission, 22, 'view_or_edit');
        $canViewFirstRevisionCost = $this->_usersRepo->extractPermission($this->_user_permission, 23, 'view_or_edit');
        $canViewInternalDeadline = $this->_usersRepo->extractPermission($this->_user_permission, 24, 'view_or_edit');
        $canViewClientDeadline = $this->_usersRepo->extractPermission($this->_user_permission, 25, 'view_or_edit');
        $canViewSpotRevision = $this->_usersRepo->extractPermission($this->_user_permission, 26, 'view_or_edit');
        $canViewSpotGraphicsRevision = $this->_usersRepo->extractPermission($this->_user_permission, 27, 'view_or_edit');

        if($canViewSpot) {
            $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
            $filter['project_id'] = (int)trim($this->getRequest()->getQuery('project_id', 0));
            $filter['campaign_id'] = (int)trim($this->getRequest()->getQuery('campaign_id', 0));
            $filter['project_campaign_id'] = (int)trim($this->getRequest()->getQuery('project_campaign_id', 0));
            $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
            $length = (int)trim($this->getRequest()->getQuery('length', 10));

            $data = $this->_spotRepo->search($filter, $offset, $length);
            $totalCount = $this->_spotRepo->searchCount($filter);

            foreach($data as &$row) {
                if(!$canViewFirstRevisionCost) {
                    unset($row['firstRevisionCost']);
                    unset($row['billingType']);
                    unset($row['billingNote']);
                }

                if(!$canViewInternalDeadline) {
                    unset($row['internalDeadline']);
                }

                if(!$canViewClientDeadline) {
                    unset($row['clientDeadline']);
                }

                if(!$canViewSpotRevision) {
                    unset($row['revisions']);
                }

                if(!$canViewSpotGraphicsRevision) {
                    unset($row['graphicsRevisions']);
                }
            }
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

    public function get($spotId)
    {
        $canViewSpot = $this->_usersRepo->extractPermission($this->_user_permission, 22, 'view_or_edit');

        if($canViewSpot) {
            $data = $this->getSingle($spotId);

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
        $canEditSpot = $this->_usersRepo->extractPermission($this->_user_permission, 22, 'edit');
        $canEditFirstRevisionCost = $this->_usersRepo->extractPermission($this->_user_permission, 23, 'edit');
        $canEditInternalDeadline = $this->_usersRepo->extractPermission($this->_user_permission, 24, 'edit');
        $canEditClientDeadline = $this->_usersRepo->extractPermission($this->_user_permission, 25, 'edit');
        $canEditSpotRevision = $this->_usersRepo->extractPermission($this->_user_permission, 26, 'edit');
        $canEditSpotGraphicsRevision = $this->_usersRepo->extractPermission($this->_user_permission, 27, 'edit');

        if($canEditSpot) {
            $projectCampaignId = (int)(isset($data['project_campaign_id']) ? trim($data['project_campaign_id']) : 0);
            $name = trim(isset($data['name']) ? $data['name'] : '');
            $notes = trim(isset($data['notes']) ? $data['notes'] : '');
            $revisions = ($canEditSpotRevision && isset($data['revisions']) ? (int)trim($data['revisions']) : null);
            $graphicsRevisions = (int)($canEditSpotGraphicsRevision && isset($data['graphics_revisions']) ? trim($data['graphics_revisions']) : 0);
            $firstRevisionCost = ($canEditFirstRevisionCost && isset($data['first_revision_cost']) ? (float)trim($data['first_revision_cost']) : null);
            $internalDeadline = ($canEditInternalDeadline && isset($data['internal_deadline'])) ? $data['internal_deadline'] : null;
            $clientDeadline = ($canEditClientDeadline && isset($data['client_deadline'])) ? $data['client_deadline'] : null;
            $billingType = ($canEditFirstRevisionCost && isset($data['billing_type'])) ? $data['billing_type'] : null;
            $billingNote = ($canEditFirstRevisionCost && isset($data['billing_note'])) ? trim($data['billing_note']) : null;
            $trtId = (isset($data['trt_id'])) ? trim($data['trt_id']) : null;

            if ($name && $projectCampaignId) {
                $projectCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);

                if ($projectCampaign) {
                    $spot = new RediSpot();
                    $spot->setSpotName($name);

                    $spot->setProjectCampaignId($projectCampaignId);

                    if ($notes) {
                        $spot->setNotes($notes);
                    }

                    if ($internalDeadline) {
                        $internalDeadline = $this->_commonRepo->formatDateForInsert($internalDeadline);

                        $spot->setInternalDeadline($internalDeadline);
                    }

                    if ($clientDeadline) {
                        $clientDeadline = $this->_commonRepo->formatDateForInsert($clientDeadline);

                        $spot->setClientDeadline($clientDeadline);
                    }

                    $spot->setRevisions($revisions);
                    $spot->setGraphicsRevisions($graphicsRevisions);
                    $spot->setFirstRevisionCost($firstRevisionCost);
                    $spot->setBillingType($billingType);
                    $spot->setTrtId($trtId);

                    if ($billingNote) {
                        $spot->setBillingNote($billingNote);
                    }

                    $this->_em->persist($spot);

                    // project history
                    $campaign = $this->_campaignRepository->find($projectCampaign->getCampaignId());
                    $historyMessage = 'Spot "' . $name . '" was added to "' . $campaign->getCampaignName() . '" campaign';
                    $projectHistory = new RediProjectHistory();
                    $projectHistory->setProjectId($projectCampaign->getProjectId());
                    $projectHistory->setUserId($this->_user_id);
                    $projectHistory->setMessage($historyMessage);
                    $projectHistory->setCreatedAt(new \DateTime('now'));
                    $this->_em->persist($projectHistory);

                    $this->_em->flush();

                    $spotId = $spot->getId();
                    $data = $this->getSingle($spotId);
                    $data['spot_id'] = $spotId;

                    $response = array(
                        'status' => 1,
                        'message' => 'Request successful.',
                        'data' => $data,
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Project campaign not found.'
                    );
                }
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data(name, project_campaign_id).'
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
        $canEditSpot = $this->_usersRepo->extractPermission($this->_user_permission, 22, 'edit');
        $canEditFirstRevisionCost = $this->_usersRepo->extractPermission($this->_user_permission, 23, 'edit');
        $canEditInternalDeadline = $this->_usersRepo->extractPermission($this->_user_permission, 24, 'edit');
        $canEditClientDeadline = $this->_usersRepo->extractPermission($this->_user_permission, 25, 'edit');
        $canEditSpotRevision = $this->_usersRepo->extractPermission($this->_user_permission, 26, 'edit');
        $canEditSpotGraphicsRevision = $this->_usersRepo->extractPermission($this->_user_permission, 27, 'edit');

        if($canEditSpot) {
            $projectCampaignId = (int)(isset($data['project_campaign_id']) ? trim($data['project_campaign_id']) : 0);
            $name = trim(isset($data['name']) ? $data['name'] : '');
            $notes = trim(isset($data['notes']) ? $data['notes'] : '');
            $revisions = ($canEditSpotRevision && isset($data['revisions']) ? (int)trim($data['revisions']) : null);
            $graphicsRevisions = (int)($canEditSpotGraphicsRevision && isset($data['graphics_revisions']) ? trim($data['graphics_revisions']) : 0);
            $firstRevisionCost = ($canEditFirstRevisionCost && isset($data['first_revision_cost'])) ? (float)trim($data['first_revision_cost']) : null;
            $internalDeadline = ($canEditInternalDeadline && isset($data['internal_deadline'])) ? $data['internal_deadline'] : null;
            $clientDeadline = ($canEditClientDeadline && isset($data['client_deadline'])) ? $data['client_deadline'] : null;
            $billingType = ($canEditFirstRevisionCost && isset($data['billing_type'])) ? $data['billing_type'] : null;
            $billingNote = ($canEditFirstRevisionCost && isset($data['billing_note'])) ? trim($data['billing_note']) : null;
            $trtId = (isset($data['trt_id'])) ? trim($data['trt_id']) : null;

            $spot = $this->_spotRepository->find($id);

            if ($spot) {
                if ($name) {
                    $spot->setSpotName($name);
                }

                if ($projectCampaignId) {
                    $projectCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);

                    if($projectCampaign) {
                        $spot->setProjectCampaignId($projectCampaignId);
                    }
                }

                if ($notes) {
                    $spot->setNotes($notes);
                }

                if ($revisions) {
                    $spot->setRevisions($revisions);
                }

                if ($graphicsRevisions) {
                    $spot->setGraphicsRevisions($graphicsRevisions);
                }

                if ($firstRevisionCost) {
                    $spot->setFirstRevisionCost($firstRevisionCost);
                }

                if ($trtId) {
                    $spot->setTrtId($trtId);
                }

                if ($internalDeadline) {
                    $initialDeadline = $this->_commonRepo->formatDateForInsert($internalDeadline);

                    if ($internalDeadline) {
                        $spot->setInternalDeadline($initialDeadline);
                    }
                }

                if ($clientDeadline) {
                    $clientDeadline = $this->_commonRepo->formatDateForInsert($clientDeadline);

                    if ($clientDeadline) {
                        $spot->setClientDeadline($clientDeadline);
                    }
                }

                if($billingType!==null) {
                    $spot->setBillingType($billingType);
                }

                if ($billingNote) {
                    $spot->setBillingNote($billingNote);
                }

                $this->_em->persist($spot);
                $this->_em->flush();

                $spotId = $spot->getId();
                $data = $this->getSingle($spotId);
                $data['spot_id'] = $spotId;

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $data,
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Spot not found.'
                );
            }
        }  else {
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

    public function delete($id)
    {
        $canEditSpot = $this->_usersRepo->extractPermission($this->_user_permission, 22, 'edit');

        if($canEditSpot) {
            $spot = $this->_spotRepository->find($id);

            if ($spot) {
                $this->_em->remove($spot);

                $spotToVersion = $this->_spotVersionRepository->findBy(array('spotId' => $id));

                foreach ($spotToVersion as $stvRow) {
                    $this->_em->remove($stvRow);
                }

                $editorToSpot = $this->_editorToSpotRepository->findBy(array('spotId' => $id));

                foreach ($editorToSpot as $etsRow) {
                    $this->_em->remove($etsRow);
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

    private function getSingle($spotId) {
        $canViewSpot = $this->_usersRepo->extractPermission($this->_user_permission, 22, 'view_or_edit');
        $canViewFirstRevisionCost = $this->_usersRepo->extractPermission($this->_user_permission, 23, 'view_or_edit');
        $canViewInternalDeadline = $this->_usersRepo->extractPermission($this->_user_permission, 24, 'view_or_edit');
        $canViewClientDeadline = $this->_usersRepo->extractPermission($this->_user_permission, 25, 'view_or_edit');
        $canViewSpotRevision = $this->_usersRepo->extractPermission($this->_user_permission, 26, 'view_or_edit');
        $canViewSpotGraphicsRevision = $this->_usersRepo->extractPermission($this->_user_permission, 27, 'view_or_edit');

        $data = array();

        if($canViewSpot) {
            $data = $this->_spotRepo->getById($spotId);

            if($data) {
                $projectCampaign = $this->_projectToCampaignRepository->find($data['projectCampaignId']);

                if($projectCampaign) {
                    $data['projectId'] = $projectCampaign->getProjectId();
                    $data['campaignId'] = $projectCampaign->getCampaignId();
                }

                if (isset($data['id'])) {
                    $data['id'] = (int)$data['id'];
                }

                if(!$canViewFirstRevisionCost) {
                    unset($data['firstRevisionCost']);
                    unset($data['billingType']);
                    unset($data['billingNote']);
                }

                if(!$canViewInternalDeadline) {
                    unset($data['internalDeadline']);
                }

                if(!$canViewClientDeadline) {
                    unset($data['clientDeadline']);
                }

                if(!$canViewSpotRevision) {
                    unset($data['revisions']);
                }

                if(!$canViewSpotGraphicsRevision) {
                    unset($data['graphicsRevisions']);
                }
            }
        }

        return $data;
            
    }
}
