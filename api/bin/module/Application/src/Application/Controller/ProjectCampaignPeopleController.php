<?php

namespace Application\Controller;

use Application\Entity\RediCampaign;
use Application\Entity\RediProjectCampaignManager;
use Application\Entity\RediProjectCampaignProducer;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectToCampaign;
use Application\Entity\RediProjectToCampaignUser;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class ProjectCampaignPeopleController extends CustomAbstractActionController
{
    public function get($projectId)
    {
        $campaignId = $this->params()->fromRoute('param1', 0);
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $type = json_decode(trim($this->getRequest()->getQuery('type', '')), null);

        $data = $this->_campaignRepo->getCampaignProjectPeople('user', $projectId, $campaignId, $offset, $length, $type, $this->_siteUrl . 'thumb/profile_image/');
        $totalCount = $this->_campaignRepo->getCampaignProjectPeopleCount('user',$projectId, $campaignId, $type);

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
        $projectId = (int)(isset($data['project_id']) ? trim($data['project_id']) : 0);
        $campaignId = (int)(isset($data['campaign_id']) ? trim($data['campaign_id']) : 0);
        $userId = (int)(isset($data['user_id']) ? trim($data['user_id']) : 0);
        $roleId = (int)(isset($data['role_id']) ? trim($data['role_id']) : 0);

        if($projectId && $campaignId && $userId) {
            $project = $this->_projectRepository->find($projectId);
            $campaign = $this->_campaignRepository->find($campaignId);
            $user = $this->_userRepository->find($userId);

            if($project && $campaign && $user) {
                $existingProjectToCampaign = $this->_projectToCampaignRepository->findOneBy(array('projectId' => $projectId, 'campaignId' => $campaignId));

                if ($existingProjectToCampaign) {
                    $projectCampaignUser = $this->_projectToCampaignUserRepository->findOneBy(array('projectCampaignId' => $existingProjectToCampaign->getId(), 'userId' => $userId));

                    if (!$projectCampaignUser) {
                        $projectCampaignUser = new RediProjectToCampaignUser();
                        $projectCampaignUser->setProjectCampaignId($existingProjectToCampaign->getId());
                    }

                    $projectCampaignUser->setUserId($userId);

                    if ($roleId) {
                        $role = $this->_userRoleRepository->find($roleId);

                        if($role) {
                            if ($roleId != $projectCampaignUser->getRoleId()) {
                                // project history
                                $historyMessage = 'User "' . trim($user->getFirstName() . " " . $user->getLastName()) . '" was changed to "' . $role->getRoleName() . '" on campaign "' . $campaign->getCampaignName() . '"';
                                $projectHistory = new RediProjectHistory();
                                $projectHistory->setProjectId($projectId);
                                $projectHistory->setCampaignId($campaign->getId());
                                $projectHistory->setUserId($this->_user_id);
                                $projectHistory->setMessage($historyMessage);
                                $projectHistory->setCreatedAt(new \DateTime('now'));
                                $this->_em->persist($projectHistory);
                                $this->_em->flush();
                            }

                            $projectCampaignUser->setRoleId($roleId);
                        }
                    }

                    $this->_em->persist($projectCampaignUser);
                    $this->_em->flush();

                    // project history
                    $historyMessage = 'User "' . trim($user->getFirstName() . " " . $user->getLastName()) . '" was added to campaign "' . $campaign->getCampaignName() . '"';
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
                        'message' => 'Request successful',
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Project campaign not found.'
                    );
                }
            } else {
                $message = "";

                if(!$project) {
                    $message = "Project does not exist";
                } else if(!$campaign) {
                    $message = "Campaign does not exist";
                } else if(!$user) {
                    $message = "User does not exist";
                }

                $response = array(
                    'status' => 0,
                    'message' => $message
                );
            }
        }  else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(project_id, campaign_id, user_id, role_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function delete($projectId)
    {
        $projectId = (int)$projectId;
        $campaignId = $this->params()->fromRoute('param1', 0);
        $userId = $this->params()->fromRoute('param2', 0);

        if($projectId && $campaignId && $userId) {
            $project = $this->_projectRepository->find($projectId);
            $campaign = $this->_campaignRepository->find($campaignId);
            $user = $this->_userRepository->find($userId);

            if($project && $campaign && $user) {
                $existingProjectToCampaign = $this->_projectToCampaignRepository->findOneBy(array('projectId' => $projectId, 'campaignId' => $campaignId));

                if ($existingProjectToCampaign) {
                    $projectCampaignUser = $this->_projectToCampaignUserRepository->findOneBy(array('projectCampaignId' => $existingProjectToCampaign->getId(), 'userId' => $userId));

                    if ($projectCampaignUser) {
                        $this->_em->remove($projectCampaignUser);
                        $this->_em->flush();

                        // project history
                        $historyMessage = 'User "' . trim($user->getFirstName() . " " . $user->getLastName()) . '" was removed from campaign "' . $campaign->getCampaignName() . '"';
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
                        'message' => 'Request successful',
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Project campaign not found.'
                    );
                }
            } else {
                $message = "";

                if(!$project) {
                    $message = "Project does not exist";
                } else if(!$campaign) {
                    $message = "Campaign does not exist";
                } else if(!$user) {
                    $message = "User does not exist";
                }

                $response = array(
                    'status' => 0,
                    'message' => $message
                );
            }
        }  else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(project_id, campaign_id, user_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }
}
