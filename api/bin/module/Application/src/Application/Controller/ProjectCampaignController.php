<?php

namespace Application\Controller;

use Application\Entity\RediProject;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectManager;
use Application\Entity\RediProjectProducer;
use Application\Entity\RediProjectToCampaign;
use Application\Entity\RediProjectUser;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class ProjectCampaignController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['project_id'] = (int)$this->getRequest()->getQuery('project_id', 0);
        $filter['campaign_id'] = (int)$this->getRequest()->getQuery('campaign_id', 0);
        $filter['request_writing_team'] = $this->getRequest()->getQuery('request_writing_team', null);
        $filter['request_music_team'] = $this->getRequest()->getQuery('request_music_team', null);
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $getUser = (int)trim($this->getRequest()->getQuery('get_user', 0));


        $data = $this->_projectCampaignRepo->search($filter, $offset, $length);
        $totalCount = $this->_projectCampaignRepo->searchCount($filter);

        if($getUser) {
            foreach($data as &$row) {
                $row['user'] = $this->_campaignRepo->getCampaignProjectPeople('user', $row['projectId'], $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');                
                $row['designer'] = $this->_campaignRepo->getCampaignProjectPeople('designer', $row['projectId'], $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                $row['editor'] = $this->_campaignRepo->getCampaignProjectPeople('editor', $row['projectId'], $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                $row['billingUser'] = $this->_campaignRepo->getCampaignProjectPeople('billing', $row['projectId'], $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
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

    public function get($projectId) {
        $campaignId = (int)$this->params()->fromRoute('param1', 0);

        if($projectId && $campaignId) {
            $data = $this->_projectCampaignRepo->search(array('project_id' => $projectId, 'campaign_id' => $campaignId), 0, 1);

            if (count($data)) {
                $response = array(
                    'status' => 1,
                    'message' => "Request successful",
                    'data' => $data[0]
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


        if($response['status']==0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }


    public function update($projectId, $data)
    {
        $projectId = (int)$projectId;
        $campaignId = (int)$this->params()->fromRoute('param1', 0);
        $firstPointOfContact = (isset($data['first_point_of_contact_id']) ? trim($data['first_point_of_contact_id']) : 0);
        $firstPointOfContact = (strtolower($firstPointOfContact) != 'null') ? (int)$firstPointOfContact : null;
        $requestWritingTeam = isset($data['request_writing_team']) ? (int)trim($data['request_writing_team']) : null;
        $requestMusicTeam = isset($data['request_music_team']) ? (int)trim($data['request_music_team']) : null;
        $writingTeamNote = (isset($data['writing_team_notes']) ? trim($data['writing_team_notes']) : null);
        $musicTeamNote = (isset($data['music_team_notes']) ? trim($data['music_team_notes']) : null);
        $note = (isset($data['note']) ? trim($data['note']) : null);
        $budget = (isset($data['budget']) ? trim($data['budget']) : null);
        $por = isset($data['por']) ? $data['por'] : null;
        $invoiceContact = isset($data['invoice_contact']) ? $data['invoice_contact'] : null;
        $materialReceiveDate = isset($data['material_receive_date']) ? $data['material_receive_date'] : null;

        if ($projectId && $campaignId) {
            $project = $this->_projectRepository->find($projectId);

            if ($project) {
                $campaign = $this->_campaignRepository->find($campaignId);

                if ($campaign) {
                    $existingProjectToCampaign = $this->_projectToCampaignRepository->findOneBy(array('projectId' => $projectId, 'campaignId' => $campaignId));

                    $existing = true;

                    if(!$existingProjectToCampaign) {
                        $existingProjectToCampaign = new RediProjectToCampaign();
                        $existingProjectToCampaign->setProjectId($projectId);
                        $existingProjectToCampaign->setCampaignId($campaignId);
                        $existing = false;
                    }

                    if($requestMusicTeam != $existingProjectToCampaign->getRequestMusicTeam()
                        || $musicTeamNote != $existingProjectToCampaign->getMusicTeamNotes()) {
                        // project history
                        $historyMessage = 'Music team request was changed on campaign "' . $campaign->getCampaignName() . '"';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($projectId);
                        $projectHistory->setCampaignId($campaign->getId());
                        $projectHistory->setUserId($this->_user_id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);
                        $this->_em->flush();
                    }

                    if($requestWritingTeam != $existingProjectToCampaign->getRequestWritingTeam()
                        || $writingTeamNote != $existingProjectToCampaign->getWritingTeamNotes()) {
                        // project history
                        $historyMessage = 'Writing team request was changed on campaign "' . $campaign->getCampaignName() . '"';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($projectId);
                        $projectHistory->setCampaignId($campaign->getId());
                        $projectHistory->setUserId($this->_user_id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);
                        $this->_em->flush();
                    }

                    if($firstPointOfContact !== 0) {
                        $existingProjectToCampaign->setFirstPointOfContactId($firstPointOfContact);
                    }

                    if($requestMusicTeam !== null) {
                        $existingProjectToCampaign->setRequestMusicTeam($requestMusicTeam);
                    }

                    if($requestWritingTeam !== null) {
                        $existingProjectToCampaign->setRequestWritingTeam($requestWritingTeam);
                    }

                    if($writingTeamNote !== null) {
                        $existingProjectToCampaign->setWritingTeamNotes($writingTeamNote);
                    }

                    if($musicTeamNote !== null) {
                        $existingProjectToCampaign->setMusicTeamNotes($musicTeamNote);
                    }

                    if($note !== null) {
                        $existingProjectToCampaign->setNote($note);
                    }

                    if($budget !== null) {
                        $existingProjectToCampaign->setBudget($budget);
                    }

                    if($por !== null) {
                        $existingProjectToCampaign->setPor($por);
                    }

                    if($invoiceContact !== null) {
                        $existingProjectToCampaign->setInvoiceContact($invoiceContact);
                    }

                    if($materialReceiveDate !== null) {
                        $materialReceiveDate = $materialReceiveDate ? new \DateTime($materialReceiveDate) : null;
                        $existingProjectToCampaign->setMaterialReceiveDate($materialReceiveDate);
                    }

                    $this->_em->persist($existingProjectToCampaign);
                    $this->_em->flush();

                    if(!$existing) {
                        // project history
                        $historyMessage = 'Campaign "' . $campaign->getCampaignName() . '" was added to project "' . $project->getProjectName() . '"';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($projectId);
                        $projectHistory->setCampaignId($campaign->getId());
                        $projectHistory->setUserId($this->_user_id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);
                        $this->_em->flush();
                    }


                    $response = array(
                        'status' => 1,
                        'message' => 'Request successful.',
                        'data' => array(
                            'id' => (int)$existingProjectToCampaign->getId()
                        )
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Campaign not found.'
                    );
                }
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Project not found.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(project_id, campaign_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function delete($projectId) {
        $campaignId = (int)$this->params()->fromRoute('param1', 0);

        if($projectId && $campaignId) {
            $data = $this->_projectCampaignRepo->search(array('project_id' => $projectId, 'campaign_id' => $campaignId), 0, 1);

            if (count($data)) {
                $projectCampaign = $this->_projectToCampaignRepository->find($data[0]['id']);
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
                'message' => 'Please send project id and campaign id'
            );
        }


        if($response['status']==0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

}
