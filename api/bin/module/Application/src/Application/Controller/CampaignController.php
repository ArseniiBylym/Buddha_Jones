<?php

namespace Application\Controller;

use Application\Entity\RediCampaign;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectToCampaign;
use Application\Entity\RediProjectToCampaignUser;
use Zend\View\Model\JsonModel;
use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class CampaignController extends CustomAbstractActionController
{
    public function getList()
    {
        $search = trim($this->getRequest()->getQuery('search', ''));
        $projectId = (int)trim($this->getRequest()->getQuery('project_id', 0));
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));

        $data = $this->_campaignRepo->search($projectId, $search, $offset, $length);
        $totalCount = $this->_campaignRepo->searchCount($projectId, $search);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data
        );


        return new JsonModel($response);
    }

    public function create($data)
    {
        $name = trim(isset($data['name']) ? $data['name'] : '');
        $description = isset($data['description']) ? trim($data['description']) : null;
        $project = isset($data['project']) ? $data['project'] : null;
        $editorReq = isset($data['editor_req']) ? $data['editor_req'] : null;
        $materialReceived = isset($data['material_received']) ? $data['material_received'] : null;

        $project = (array)json_decode($project, true);

        if ($name) {
            $campaign = new RediCampaign();
            $campaign->setCampaignName($name);

            if ($description) {
                $campaign->setDescription($description);
            }

            if($editorReq) {
                $campaign->setEditorReq($editorReq);
            }

            if($materialReceived) {
                $materialReceived = new \DateTime($materialReceived);

                if($materialReceived) {
                    $campaign->setMaterialReceived($materialReceived);
                }
            }

            $this->_em->persist($campaign);
            $this->_em->flush();

            $campaignId = $campaign->getId();

            foreach ($project as $row) {
                if (isset($row['project_id'])) {
                    $project = $this->_projectRepository->find($row['project_id']);

                    if ($project) {
                        $projectToCampaign = new RediProjectToCampaign();
                        $projectToCampaign->setProjectId($row['project_id']);
                        $projectToCampaign->setCampaignId($campaignId);

                        if(isset($row['first_point_of_contact_id'])) {
                            $projectToCampaign->setFirstPointOfContactId($row['first_point_of_contact_id']);
                        }

                        $this->_em->persist($projectToCampaign);
                        $this->_em->flush();
                        $projectCampaignEntryId = $projectToCampaign->getid();

                        // project history
                        $historyMessage = 'Campaign "' . $name . '" was added to project "' . $project->getProjectName() . '"';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($row['project_id']);
                        $projectHistory->setCampaignId($campaign->getId());
                        $projectHistory->setUserId($this->_user_id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);

                        if (isset($row['user'])) {
                            foreach ($row['user'] as $user) {
                                if(isset($user['id'], $user['role_id'])) {
                                    $userInfo = $this->_userRepository->find($user['id']);

                                    if($userInfo) {
                                        $projectToCampaignUser = new RediProjectToCampaignUser();
                                        $projectToCampaignUser->setProjectCampaignId($projectCampaignEntryId);
                                        $projectToCampaignUser->setUserId($user['id']);
                                        $projectToCampaignUser->setRoleId($user['role_id']);
                                        $this->_em->persist($projectToCampaignUser);

                                        // project history
                                        $historyMessage = 'User "' . trim($userInfo->getFirstName() . " " . $userInfo->getLastName()) . '" was added to campaign "' . $campaign->getCampaignName() . '"';
                                        $projectHistory = new RediProjectHistory();
                                        $projectHistory->setProjectId($row['project_id']);
                                        $projectHistory->setCampaignId($campaign->getId());
                                        $projectHistory->setUserId($this->_user_id);
                                        $projectHistory->setMessage($historyMessage);
                                        $projectHistory->setCreatedAt(new \DateTime('now'));
                                        $this->_em->persist($projectHistory);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            $this->_em->flush();

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => array(
                    'campaign_id' => $campaignId
                ),
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(name).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($campaignId, $data)
    {
        $name = trim(isset($data['name']) ? $data['name'] : '');
        $description = isset($data['description']) ? trim($data['description']) : null;
        $project = isset($data['project']) ? $data['project'] : null;
        $editorReq = isset($data['editor_req']) ? $data['editor_req'] : null;
        $materialReceived = isset($data['material_received']) ? $data['material_received'] : null;

        $project = (array)json_decode($project, true);

        $campaign = $this->_campaignRepository->find($campaignId);

        if($campaign) {
            if($name) {
                $campaign->setCampaignName($name);
            }

            if ($description) {
                $campaign->setDescription($description);
            }

            if($editorReq) {
                $campaign->setEditorReq($editorReq);
            }

            if($materialReceived) {
                $materialReceived = new \DateTime($materialReceived);

                if($materialReceived) {
                    $campaign->setMaterialReceived($materialReceived);
                }
            }
            
            $this->_em->persist($campaign);
            $this->_em->flush();

            $campaignId = $campaign->getId();

            foreach ($project as $row) {
                if (isset($row['project_id'])) {
                    $project = $this->_projectRepository->find($row['project_id']);

                    if ($project) {
                        $projectToCampaign = $this->_projectToCampaignRepository->findOneBy(array('projectId' => $row['project_id'], 'campaignId' => $campaignId));

                        if(!$projectToCampaign) {
                            $projectToCampaign = new RediProjectToCampaign();

                            $projectToCampaign->setProjectId($row['project_id']);
                            $projectToCampaign->setCampaignId($campaignId);

                            if(isset($row['first_point_of_contact_id'])) {
                                $projectToCampaign->setFirstPointOfContactId($row['first_point_of_contact_id']);
                            }

                            $this->_em->persist($projectToCampaign);

                            $this->_em->flush();
                        }

                        $projectCampaignEntryId = $projectToCampaign->getid();

                        // project history
                        $historyMessage = 'Campaign "' . $name . '" was added to project "' . $project->getProjectName() . '"';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($row['project_id']);
                        $projectHistory->setCampaignId($campaign->getId());
                        $projectHistory->setUserId($this->_user_id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);

                        if (isset($row['user'])) {
                            foreach ($row['user'] as $user) {
                                if(isset($user['id'], $user['role_id'])) {
                                    $userInfo = $this->_userRepository->find($user['id']);

                                    if($userInfo) {
                                        $projectCampaignUser = $this->_projectToCampaignUserRepository->findOneBy(array('projectCampaignId' => $projectCampaignEntryId, 'userId' => $user['id']));

                                        if (!$projectCampaignUser) {
                                            $projectCampaignUser = new RediProjectToCampaignUser();
                                            $projectCampaignUser->setProjectCampaignId($projectCampaignEntryId);
                                            $projectCampaignUser->setManagerId($user['id']);
                                            $projectCampaignUser->setRoleId($user['role_id']);
                                            $this->_em->persist($projectCampaignUser);

                                            // project history
                                            $historyMessage = 'User "' . trim($userInfo->getFirstName() . " " . $userInfo->getLastName()) . '" was added to campaign "' . $campaign->getCampaignName() . '"';
                                            $projectHistory = new RediProjectHistory();
                                            $projectHistory->setProjectId($row['project_id']);
                                            $projectHistory->setCampaignId($campaign->getId());
                                            $projectHistory->setUserId($this->_user_id);
                                            $projectHistory->setMessage($historyMessage);
                                            $projectHistory->setCreatedAt(new \DateTime('now'));
                                            $this->_em->persist($projectHistory);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            $this->_em->flush();

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => array(
                    'campaign_id' => $campaignId
                ),
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Campaign not found.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function delete($campaignId)
    {

        $projectId = $this->params()->fromRoute('param1', 0);

        if ($campaignId && $projectId) {

            $campaign = $this->_campaignRepository->find($campaignId);
            $project = $this->_projectRepository->find($projectId);

            if ($campaign && $project) {
                $projectToCampaign = $this->_projectToCampaignRepository->findOneBy(array('projectId' => $projectId, 'campaignId' => $campaignId));

                if ($projectToCampaign) {

                    $this->_em->remove($projectToCampaign);
                    $this->_em->flush();

                    $otherProjectToCampaign = $this->_projectToCampaignRepository->findBy(array('campaignId' => $campaignId));

                    if (!$otherProjectToCampaign) {
                        $this->_em->remove($campaign);
                        $this->_em->flush();
                    }

                    // project history for project to campaign
                    $historyMessage = 'Campaign "' . $campaign->getCampaignName() . '" was removed from project "' . $project->getProjectName() . '"';
                    $projectHistory = new RediProjectHistory();
                    $projectHistory->setProjectId($projectId);
                    $projectHistory->setCampaignId($campaign->getId());
                    $projectHistory->setUserId($this->_user_id);
                    $projectHistory->setMessage($historyMessage);
                    $projectHistory->setCreatedAt(new \DateTime('now'));
                    $this->_em->persist($projectHistory);
                    $this->_em->flush();

                    $response = array(
                        'status' => 1,
                        'message' => 'Request successful.'
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Project to campaign relation not found.'
                    );
                }

            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Campaign or Project not found'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(campaign_id, project_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);

    }


}
