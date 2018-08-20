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
    public function get($projectCampaignId)
    {
        $canViewProjectCampaignCreativeTeam = $this->_usersRepo->extractPermission($this->_user_permission, 10, 'view_or_edit');

        if($canViewProjectCampaignCreativeTeam) {
            $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
            $length = (int)trim($this->getRequest()->getQuery('length', 10));
            $type = json_decode(trim($this->getRequest()->getQuery('type', '')), null);

            $data = $this->_campaignRepo->getCampaignProjectPeople('user', $projectCampaignId, $offset, $length, $type, $this->_siteUrl . 'thumb/profile_image/');
            $totalCount = $this->_campaignRepo->getCampaignProjectPeopleCount('user', $projectCampaignId, $type);

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

    public function create($data)
    {
        $canEditProjectCampaignCreativeTeam = $this->_usersRepo->extractPermission($this->_user_permission, 10, 'edit');

        if($canEditProjectCampaignCreativeTeam) {
            $projectCampaignId = (int)(isset($data['project_campaign_id']) ? trim($data['project_campaign_id']) : 0);
            $userId = (int)(isset($data['user_id']) ? trim($data['user_id']) : 0);
            $roleId = (int)(isset($data['role_id']) ? trim($data['role_id']) : 0);

            if($projectCampaignId && $userId) {
                $user = $this->_userRepository->find($userId);

                if($projectCampaignId && $user) {
                    $existingProjectToCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);
                    $campaign = $this->_campaignRepository->find($existingProjectToCampaign->getCampaignId());

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
                                    $projectHistory->setProjectId($existingProjectToCampaign->getProjectId());
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
                        $projectHistory->setProjectId($existingProjectToCampaign->getProjectId());
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
                    $response = array(
                        'status' => 0,
                        'message' => "User does not exist"
                    );
                }
            }  else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data(project_id, campaign_id, user_id, role_id).'
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
        $canEditProjectCampaignCreativeTeam = $this->_usersRepo->extractPermission($this->_user_permission, 10, 'edit');

        if($canEditProjectCampaignCreativeTeam) {
            $projectCampaignId = (int)$projectCampaignId;
            $userId = $this->params()->fromRoute('param1', 0);

            if($projectCampaignId && $userId) {
                $user = $this->_userRepository->find($userId);

                if($user) {
                    $existingProjectToCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);

                    if ($existingProjectToCampaign) {
                        $projectCampaignUser = $this->_projectToCampaignUserRepository->findOneBy(array('projectCampaignId' => $existingProjectToCampaign->getId(), 'userId' => $userId));

                        if ($projectCampaignUser) {
                            $this->_em->remove($projectCampaignUser);
                            $this->_em->flush();

                            // project history
                            $campaign = $this->_campaignRepository->find($existingProjectToCampaign->getCampaignId());
                            $historyMessage = 'User "' . trim($user->getFirstName() . " " . $user->getLastName()) . '" was removed from campaign "' . $campaign->getCampaignName() . '"';
                            $projectHistory = new RediProjectHistory();
                            $projectHistory->setProjectId($existingProjectToCampaign->getProjectId());
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
                    $response = array(
                        'status' => 0,
                        'message' => "User does not exist"
                    );
                }
            }  else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data(project_campaign_id, user_id).'
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
