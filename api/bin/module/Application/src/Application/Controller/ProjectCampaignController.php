<?php

namespace Application\Controller;

use Application\Entity\RediProject;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectManager;
use Application\Entity\RediProjectProducer;
use Application\Entity\RediProjectToCampaign;
use Application\Entity\RediProjectUser;
use Exception;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class ProjectCampaignController extends CustomAbstractActionController
{
    public function getList()
    {
        $canViewCampaign = $this->_usersRepo->extractPermission($this->_user_permission, 6, 'view_or_edit');
        $canViewCreativeTeam = $this->_usersRepo->extractPermission($this->_user_permission, 10, 'view_or_edit');
        $canViewDesigner = $this->_usersRepo->extractPermission($this->_user_permission, 13, 'view_or_edit');
        $canViewEditor = $this->_usersRepo->extractPermission($this->_user_permission, 12, 'view_or_edit');
        $canViewBilling = $this->_usersRepo->extractPermission($this->_user_permission, 11, 'view_or_edit');
        $canViewInvoice = $this->_usersRepo->extractPermission($this->_user_permission, 21, 'view_or_edit');
        $canViewBudget = $this->_usersRepo->extractPermission($this->_user_permission, 18, 'view_or_edit');
        $canViewNote = $this->_usersRepo->extractPermission($this->_user_permission, 19, 'view_or_edit');
        $canViewMaterialReceived = $this->_usersRepo->extractPermission($this->_user_permission, 17, 'view_or_edit');
        $canViewRequestMusicTeam = $this->_usersRepo->extractPermission($this->_user_permission, 15, 'view_or_edit');
        $canViewRequestWrittingTeam = $this->_usersRepo->extractPermission($this->_user_permission, 14, 'view_or_edit');
        $canViewPor = $this->_usersRepo->extractPermission($this->_user_permission, 20, 'view_or_edit');
        // check if user is a billing user
        $isBillingUser = $this->_usersRepo->isBillingUser($this->_user_id);

        if ($canViewCampaign) {
            $filter['project_id'] = (int)$this->getRequest()->getQuery('project_id', 0);
            $filter['campaign_id'] = (int)$this->getRequest()->getQuery('campaign_id', 0);
            $filter['request_writing_team'] = $this->getRequest()->getQuery('request_writing_team', null);
            $filter['request_music_team'] = $this->getRequest()->getQuery('request_music_team', null);
            $filter['approved_by_billing'] = $this->getRequest()->getQuery('approved_by_billing', null);
            $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
            $length = (int)trim($this->getRequest()->getQuery('length', 10));
            $getUser = (int)trim($this->getRequest()->getQuery('get_user', 0));

            if (!$isBillingUser) {
                $filter['approved_by_billing'] = 1;
            }

            if (strlen($filter['approved_by_billing']) == 0) {
                $filter['approved_by_billing'] = null;
            }

            if (!$canViewRequestMusicTeam) {
                unset($filter['request_music_team']);
            }

            if (!$canViewRequestWrittingTeam) {
                unset($filter['request_writing_team']);
            }

            $data = $this->_projectCampaignRepo->search($filter, $offset, $length);
            $totalCount = $this->_projectCampaignRepo->searchCount($filter);


            foreach ($data as &$row) {
                // set project name
                $projectName = $this->_projectRepo->getProjectName($row['projectId'], $this->_user_type_id, true);
                $row = array_merge($row, $projectName);

                if ($getUser) {
                    if ($canViewCreativeTeam) {
                        $row['user'] = $this->_campaignRepo->getCampaignProjectPeople('user', $row['id'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if ($canViewDesigner) {
                        $row['designer'] = $this->_campaignRepo->getCampaignProjectPeople('designer', $row['id'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if ($canViewEditor) {
                        $row['editor'] = $this->_campaignRepo->getCampaignProjectPeople('editor', $row['id'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if ($canViewBilling) {
                        $row['billingUser'] = $this->_campaignRepo->getCampaignProjectPeople('billing', $row['id'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if (!$canViewBudget) {
                        unset($row['budget']);
                        unset($row['budgetNote']);
                    }

                    if (!$canViewNote) {
                        unset($row['note']);
                    }

                    if (!$canViewMaterialReceived) {
                        unset($row['materialReceiveDate']);
                    }

                    if (!$canViewRequestMusicTeam) {
                        unset($row['requestMusicTeam']);
                        unset($row['musicTeamNotes']);
                    }

                    if (!$canViewRequestWrittingTeam) {
                        unset($row['requestWritingTeam']);
                        unset($row['writingTeamNotes']);
                    }

                    if (!$canViewPor) {
                        unset($row['por']);
                    }

                    if (!$canViewInvoice) {
                        unset($row['invoiceContact']);
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

    public function get($projectCampaignId)
    {
        $response = $this->getSingle($projectCampaignId);

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }


    public function create($data)
    {
        $this->getResponse()->setStatusCode(400);

        return new JsonModel(array());
    }

    public function update($projectCampaignId, $data)
    {
        $canEditCampaign = $this->_usersRepo->extractPermission($this->_user_permission, 6, 'edit');
        $canEditBudget = $this->_usersRepo->extractPermission($this->_user_permission, 18, 'edit');
        $canEditwNote = $this->_usersRepo->extractPermission($this->_user_permission, 19, 'edit');
        $canEditMusicTeam = $this->_usersRepo->extractPermission($this->_user_permission, 15, 'edit');
        $canEditWrittingTeam = $this->_usersRepo->extractPermission($this->_user_permission, 14, 'edit');
        $canEditPor = $this->_usersRepo->extractPermission($this->_user_permission, 20, 'edit');
        $canEditInvoice = $this->_usersRepo->extractPermission($this->_user_permission, 21, 'edit');
        $canEditMaterialReceived = $this->_usersRepo->extractPermission($this->_user_permission, 17, 'edit');
        // check if user is a billing user
        $isBillingUser = $this->_usersRepo->isBillingUser($this->_user_id);

        if ($canEditCampaign) {
            $projectCampaignId = (int)$projectCampaignId;
            $firstPointOfContact = (isset($data['first_point_of_contact_id']) ? trim($data['first_point_of_contact_id']) : 0);
            $firstPointOfContact = (strtolower($firstPointOfContact) != 'null') ? (int)$firstPointOfContact : null;
            $requestWritingTeam = ($canEditWrittingTeam && isset($data['request_writing_team'])) ? (int)trim($data['request_writing_team']) : null;
            $requestMusicTeam = ($canEditMusicTeam && isset($data['request_music_team'])) ? (int)trim($data['request_music_team']) : null;
            $writingTeamNote = ($canEditWrittingTeam && isset($data['writing_team_notes']) ? trim($data['writing_team_notes']) : null);
            $musicTeamNote = ($canEditMusicTeam && isset($data['music_team_notes']) ? trim($data['music_team_notes']) : null);
            $note = ($canEditwNote && isset($data['note']) ? trim($data['note']) : null);
            $budgetNote = ($canEditBudget && isset($data['budget_note']) ? trim($data['budget_note']) : null);
            $budget = ($canEditBudget && isset($data['budget']) ? trim($data['budget']) : null);
            $por = ($canEditPor && isset($data['por'])) ? $data['por'] : null;
            $invoiceContact = ($canEditInvoice && isset($data['invoice_contact'])) ? $data['invoice_contact'] : null;
            $materialReceiveDate = ($canEditMaterialReceived && isset($data['material_receive_date'])) ? $data['material_receive_date'] : null;
            $approvedByBilling = ($isBillingUser && isset($data['approved_by_billing']) && strlen($data['approved_by_billing']) > 0)
                ? (((int)$data['approved_by_billing']) ? 1 : 0)
                : null;
            $channelId = ($isBillingUser && isset($data['channel_id']) && strlen($data['channel_id']) > 0)
                ? (((int)$data['channel_id']) ? 1 : 0)
                : null;

            if ($projectCampaignId) {
                $existingProjectToCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);

                if ($existingProjectToCampaign) {
                    $campaign = $this->_campaignRepository->find($existingProjectToCampaign->getCampaignId());

                    if ($requestMusicTeam != $existingProjectToCampaign->getRequestMusicTeam()
                        || $musicTeamNote != $existingProjectToCampaign->getMusicTeamNotes()) {
                        // project history
                        $historyMessage = 'Music team request was changed on campaign "' . $campaign->getCampaignName() . '"';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($existingProjectToCampaign->getProjectId());
                        $projectHistory->setCampaignId($campaign->getId());
                        $projectHistory->setUserId($this->_user_id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);
                        $this->_em->flush();
                    }

                    if ($requestWritingTeam != $existingProjectToCampaign->getRequestWritingTeam()
                        || $writingTeamNote != $existingProjectToCampaign->getWritingTeamNotes()) {
                        // project history
                        $historyMessage = 'Writing team request was changed on campaign "' . $campaign->getCampaignName() . '"';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($existingProjectToCampaign->getProjectId());
                        $projectHistory->setCampaignId($campaign->getId());
                        $projectHistory->setUserId($this->_user_id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);
                        $this->_em->flush();
                    }

                    if ($firstPointOfContact !== 0) {
                        $existingProjectToCampaign->setFirstPointOfContactId($firstPointOfContact);
                    }

                    if ($requestMusicTeam !== null) {
                        $existingProjectToCampaign->setRequestMusicTeam($requestMusicTeam);
                    }

                    if ($requestWritingTeam !== null) {
                        $existingProjectToCampaign->setRequestWritingTeam($requestWritingTeam);
                    }

                    if ($writingTeamNote !== null) {
                        $existingProjectToCampaign->setWritingTeamNotes($writingTeamNote);
                    }

                    if ($musicTeamNote !== null) {
                        $existingProjectToCampaign->setMusicTeamNotes($musicTeamNote);
                    }

                    if ($note !== null) {
                        $existingProjectToCampaign->setNote($note);
                    }

                    if ($budget !== null) {
                        $existingProjectToCampaign->setBudget($budget);
                    }

                    if ($por !== null) {
                        $existingProjectToCampaign->setPor($por);
                    }

                    if ($invoiceContact !== null) {
                        $existingProjectToCampaign->setInvoiceContact($invoiceContact);
                    }

                    if ($materialReceiveDate !== null) {
                        if ($materialReceiveDate) {
                            try {
                                $materialReceiveDate = new \DateTime($materialReceiveDate);
                            } catch (\Exception $err) {
                                $materialReceiveDate = null;
                            }
                        } else {
                            $materialReceiveDate = null;
                        }

                        $existingProjectToCampaign->setMaterialReceiveDate($materialReceiveDate);
                    }

                    if ($budgetNote) {
                        $existingProjectToCampaign->setBudgetNote($budgetNote);
                    }

                    if($approvedByBilling !== null) {
                        $existingProjectToCampaign->setApprovedByBilling($approvedByBilling);
                    }

                    if($channelId !== null) {
                        $existingProjectToCampaign->setChannelId($channelId);
                    }

                    $this->_em->persist($existingProjectToCampaign);
                    $this->_em->flush();

                    $id = (int)$existingProjectToCampaign->getId();
                    $data = $this->getSingle($id);

                    $response = array(
                        'status' => 1,
                        'message' => 'Request successful.',
                        'data' => $data,
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Entry does not exist.'
                    );
                }
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data(project_campaign_id).'
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

    public function delete($projectCampaignId)
    {
        $canEditCampaign = $this->_usersRepo->extractPermission($this->_user_permission, 6, 'edit');

        if ($canEditCampaign) {
            if ($projectCampaignId) {
                $projectCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);

                if ($projectCampaign) {
                    $this->_em->remove($projectCampaign);
                    $this->_em->flush();

                    $response = array(
                        'status' => 1,
                        'message' => "Request successful"
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Project campaign not found'
                    );
                }
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please send project_campaign_id'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied'
            );
        }


        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    private function getSingle($projectCampaignId) {
        $canViewCampaign = $this->_usersRepo->extractPermission($this->_user_permission, 6, 'view_or_edit');
        $canViewBudget = $this->_usersRepo->extractPermission($this->_user_permission, 18, 'view_or_edit');
        $canViewNote = $this->_usersRepo->extractPermission($this->_user_permission, 19, 'view_or_edit');
        $canViewMaterialReceived = $this->_usersRepo->extractPermission($this->_user_permission, 17, 'view_or_edit');
        $canViewRequestMusicTeam = $this->_usersRepo->extractPermission($this->_user_permission, 15, 'view_or_edit');
        $canViewRequestWrittingTeam = $this->_usersRepo->extractPermission($this->_user_permission, 14, 'view_or_edit');
        $canViewPor = $this->_usersRepo->extractPermission($this->_user_permission, 20, 'view_or_edit');
        $canViewInvoice = $this->_usersRepo->extractPermission($this->_user_permission, 21, 'view_or_edit');

        if ($canViewCampaign) {
            if ($projectCampaignId) {
                $data = $this->_projectCampaignRepo->search(array('project_campaign_id' => $projectCampaignId), 0, 1);

                if (count($data)) {
                    $data = $data[0];

                    // set project name
                    $projectName = $this->_projectRepo->getProjectName($data['projectId'], $this->_user_type_id, true);
                    $data = array_merge($data, $projectName);

                    if (!$canViewBudget) {
                        unset($data['budget']);
                        unset($data['budgetNote']);
                    }

                    if (!$canViewNote) {
                        unset($data['note']);
                    }

                    if (!$canViewMaterialReceived) {
                        unset($data['materialReceiveDate']);
                    }

                    if (!$canViewRequestMusicTeam) {
                        unset($data['requestMusicTeam']);
                        unset($data['musicTeamNotes']);
                    }

                    if (!$canViewRequestWrittingTeam) {
                        unset($data['requestWritingTeam']);
                        unset($data['writingTeamNotes']);
                    }

                    if (!$canViewPor) {
                        unset($data['por']);
                    }

                    if (!$canViewInvoice) {
                        unset($data['invoiceContact']);
                    }

                    $response = array(
                        'status' => 1,
                        'message' => "Request successful",
                        'data' => $data
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Project campaign not found'
                    );
                }
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please send project id and campaign id'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied.'
            );
        }

        return $response;
    }

}
