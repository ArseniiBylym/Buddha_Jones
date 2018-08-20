<?php

namespace Application\Controller;

use Application\Entity\RediCampaign;
use Application\Entity\RediProjectCampaignManager;
use Application\Entity\RediProjectCampaignProducer;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectToCampaign;
use Application\Entity\RediProjectToCampaignBilling;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class ProjectCampaignBillingUserController extends CustomAbstractActionController
{
    public function get($projectCampaignId)
    {
        $canViewBilling = $this->_usersRepo->extractPermission($this->_user_permission, 11, 'view_or_edit');

        if($canViewBilling) {
            $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
            $length = (int)trim($this->getRequest()->getQuery('length', 10));

            $data = $this->_campaignRepo->getCampaignProjectPeople('billing', $projectCampaignId, $offset, $length, null, $this->_siteUrl . 'thumb/profile_image/');
            $totalCount = $this->_campaignRepo->getCampaignProjectPeopleCount('billing', $projectCampaignId);

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
        $canEditBilling = $this->_usersRepo->extractPermission($this->_user_permission, 11, 'edit');

        if($canEditBilling) {
            $projectCampaignId = (int)(isset($data['project_campaign_id']) ? trim($data['project_campaign_id']) : 0);
            $userId = (int)(isset($data['user_id']) ? trim($data['user_id']) : 0);
            $role = isset($data['role']) ? trim($data['role']) : null;

            if ($projectCampaignId && $userId) {
                $user = $this->_userRepository->find($userId);

                if ($user) {
                    $existingProjectToCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);

                    if ($existingProjectToCampaign) {
                        $projectCampaignUser = $this->_projectToCampaignBillingUserRepository->findOneBy(array('projectCampaignId' => $existingProjectToCampaign->getId(), 'userId' => $userId));

                        if (!$projectCampaignUser) {
                            $projectCampaignUser = new RediProjectToCampaignBilling();
                            $projectCampaignUser->setProjectCampaignId($existingProjectToCampaign->getId());
                            $projectCampaignUser->setUserId($userId);
                            $projectCampaignUser->setRole($role);

                            $this->_em->persist($projectCampaignUser);
                            $this->_em->flush();

                            // project history
                            $campaign = $this->_campaignRepository->find($existingProjectToCampaign->getCampaignId());
                            $historyMessage = 'Billing user "' . trim($user->getFirstName() . " " . $user->getLastName()) . '" was added to campaign "' . $campaign->getCampaignName() . '"';
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
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data(project_to_campaign_id, user_id, role).'
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
        $canEditBilling = $this->_usersRepo->extractPermission($this->_user_permission, 11, 'edit');

        if($canEditBilling) {
            $projectCampaignId = (int)$projectCampaignId;
            $userId = $this->params()->fromRoute('param2', 0);

            if ($projectCampaignId && $userId) {
                $user = $this->_userRepository->find($userId);

                if ($projectCampaignId && $user) {
                    $existingProjectToCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);

                    if ($existingProjectToCampaign) {
                        $projectCampaignUser = $this->_projectToCampaignBillingUserRepository->findOneBy(array('projectCampaignId' => $existingProjectToCampaign->getId(), 'userId' => $userId));

                        if ($projectCampaignUser) {
                            $this->_em->remove($projectCampaignUser);
                            $this->_em->flush();

                            // project history
                            $campaign = $this->_campaignRepository->find($existingProjectToCampaign->getCampaignId());
                            $historyMessage = 'Billing user "' . trim($user->getFirstName() . " " . $user->getLastName()) . '" was removed from campaign "' . $campaign->getCampaignName() . '"';
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
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data(project_to_campaign_id, user_id).'
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
