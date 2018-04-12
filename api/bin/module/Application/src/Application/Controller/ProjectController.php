<?php

namespace Application\Controller;

use Application\Entity\RediProject;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectManager;
use Application\Entity\RediProjectProducer;
use Application\Entity\RediProjectUser;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class ProjectController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $filter['customer_id'] = (int)$this->getRequest()->getQuery('customer_id', 0);
        $filter['detailed'] = (int)$this->getRequest()->getQuery('detailed', 0);
        $filter['project_code'] = $this->getRequest()->getQuery('project_code', null);
        $filter['project_release'] = $this->getRequest()->getQuery('project_release', null);
        $filter['sort'] = $this->getRequest()->getQuery('sort', 'id');
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $getUser = (int)trim($this->getRequest()->getQuery('get_user', 0));

        $filter['image_path'] = $this->_siteUrl . 'thumb/profile_image/';
        // $filter['project_to_campaign_user_id'] = $this->_user_id;

        if ($filter['detailed']) {
            $data = $this->_projectRepo->searchDetailed($filter, $offset, $length);
        } else {
            $data = $this->_projectRepo->search($filter, $offset, $length);
        }

        $totalCount = $this->_projectRepo->searchCount($filter);

        if($getUser) {
            foreach($data as &$dataRow) {
                foreach($dataRow['campaign'] as &$row) {
                    $row['user'] = $this->_campaignRepo->getCampaignProjectPeople('user', $dataRow['id'], $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');                
                    $row['designer'] = $this->_campaignRepo->getCampaignProjectPeople('designer', $dataRow['id'], $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    $row['editor'] = $this->_campaignRepo->getCampaignProjectPeople('editor', $dataRow['id'], $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    $row['billingUser'] = $this->_campaignRepo->getCampaignProjectPeople('billing', $dataRow['id'], $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
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

    public function get($projectId) {
        $filter['project_id'] = $projectId;
        $filter['sort'] = 'id';
        $filter['detailed'] = $this->getRequest()->getQuery('detailed', 0);
        $filter['image_path'] = $this->_siteUrl . 'thumb/profile_image/';

        if ($filter['detailed']) {
            $data = $this->_projectRepo->searchDetailed($filter, 0, 1, true);
        } else {
            $data = $this->_projectRepo->search($filter, 0, 1, true);
        }

        $responseData = isset($data[0])?$data[0]:null;

        if($responseData && count($responseData['campaign'])) {
            foreach($responseData['campaign'] as &$row) {
                $row['user'] = $this->_campaignRepo->getCampaignProjectPeople('user', $projectId, $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');                
                $row['designer'] = $this->_campaignRepo->getCampaignProjectPeople('designer', $projectId, $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                $row['editor'] = $this->_campaignRepo->getCampaignProjectPeople('editor', $projectId, $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                $row['billingUser'] = $this->_campaignRepo->getCampaignProjectPeople('billing', $projectId, $row['campaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
            }
        }

        if(count($data)) {
            $response = array(
                'status' => 1,
                'message' => "Request successful",
                'data' => $responseData
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Project not found'
            );
        }


        if($response['status']==0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }


    public function create($data)
    {
        $customerId = (int)(isset($data['customer_id']) ? trim($data['customer_id']) : 0);
        $projectName = trim(isset($data['name']) ? $data['name'] : '');
        $notes = trim(isset($data['notes']) ? $data['notes'] : '');
        $projectCode = (!empty($data['project_code'])) ? $data['project_code'] : null;
        $projectRelease = (!empty($data['project_release'])) ? $data['project_release'] : null;
        $users = json_decode(isset($data['user']) ? $data['user']:null, true);

        if ($customerId && ($projectName || $projectCode)) {
            $customer = $this->_customerRepository->find($customerId);

            if ($customer) {
                $project = new RediProject();
                $project->setCustomerId($customerId);

                if($projectName) {
                    $project->setProjectName($projectName);
                }

                if($projectCode) {
                    $project->setProjectCode($projectCode);
                }

                if($projectRelease) {
                    $projectRelease = new \DateTime($projectRelease);

                    if($projectRelease) {
                        $project->setProjectRelease($projectRelease);
                    }
                }

                if ($notes) {
                    $project->setNotes($notes);
                }

                $this->_em->persist($project);
                $this->_em->flush();

                $projectId = $project->getId();

                if($projectId && $users && count($users)) {
                    foreach($users as $user) {
                        if(isset($user['id'], $user['role_id'])) {
                            $projectUser = new RediProjectUser();
                            $projectUser->setProjectId($projectId);
                            $projectUser->setUserId($user['id']);
                            $projectUser->setRoleId($user['role_id']);
                            $this->_em->persist($projectUser);
                        }
                    }

                    $this->_em->flush();
                }
                // project history
                if ($projectName && $projectCode) {
                    $projectNameString = '"' . $projectName . '" (codename: "' . $projectCode . '")';
                } else  if($projectName) {
                    $projectNameString = '"' . $projectName . '"';
                } else if ($projectCode) {
                    $projectNameString = '"' . $projectCode . '"';
                }

                $historyMessage = 'Project ' . $projectNameString . ' created for client "' . $customer->getCustomerName() . '"';
                $projectHistory = new RediProjectHistory();
                $projectHistory->setProjectId($projectId);
                $projectHistory->setUserId($this->_user_id);
                $projectHistory->setMessage($historyMessage);
                $projectHistory->setCreatedAt(new \DateTime('now'));
                $this->_em->persist($projectHistory);
                $this->_em->flush();

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => array(
                        'project_id' => $projectId
                    ),
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Customer not found.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(project_name or project_code and customer_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        $customerId = isset($data['customer_id']) ? (int)trim($data['customer_id']) : null;
        $projectName = isset($data['name']) ? trim($data['name']) : null;
        $notes = isset($data['notes']) ? trim($data['notes']) : null;
        $projectCode = (!empty($data['project_code'])) ? $data['project_code'] : null;
        $projectRelease = (!empty($data['project_release'])) ? $data['project_release'] : null;
        $users = json_decode(isset($data['user']) ? $data['user']:null, true);

        $project = $this->_projectRepository->find($id);

        if ($project) {
            if ($customerId || $projectName || $projectCode || $notes) {
                if ($projectName || $projectCode) {
                    if ($project->getProjectName() != $projectName ||  $project->getProjectCode() != $projectCode) {
                        // project history
                        if(!$projectName) {
                            $projectName = $project->getProjectName();
                        }

                        if(!$projectCode) {
                            $projectCode = $project->getProjectCode();
                        }

                        $projectNameString = '"' . $projectName . '"';

                        if ($projectName && $projectCode) {
                            $projectNameString = '"' . $projectName . '" (codename: "' . $projectCode . '")';
                        } if($projectCode) {
                            $projectNameString = '"' . $projectCode . '"';
                        }
                        
                        if ($projectName && $projectCode) {
                            $projectNameString = '"' . $projectName . '" (codename: "' . $projectCode . '")';
                        } else  if($projectName) {
                            $projectNameString = '"' . $projectName . '"';
                        } else if ($projectCode) {
                            $projectNameString = '"' . $projectCode . '"';
                        }
                        
                        $historyMessage = 'Project renamed to "' . $projectNameString . '" from "' . $project->getProjectName() . '"';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);
//                        $this->_em->flush();
                    }

                    if($projectName) {
                        $project->setProjectName($projectName);
                    }

                    if($projectCode) {
                        $project->setProjectCode($projectCode);
                    }
                }

                if ($customerId) {
                    $customer = $this->_customerRepository->find($customerId);

                    if ($customer) {
                        if ($project->getCustomerId() != $customerId) {
                            $previousCustomer = $this->_customerRepository->find($project->getCustomerId());

                            // project history
                            $historyMessage = 'Project customer changed to "' . $customer->getCustomerName() . '" from "' . $previousCustomer->getCustomerName() . '"';
                            $projectHistory = new RediProjectHistory();
                            $projectHistory->setProjectId($id);
                            $projectHistory->setUserId($this->_user_id);
                            $projectHistory->setMessage($historyMessage);
                            $projectHistory->setCreatedAt(new \DateTime('now'));
                            $this->_em->persist($projectHistory);
//                            $this->_em->flush();
                        }

                        $project->setCustomerId($customerId);
                    }
                }

                if ($notes) {
                    $project->setNotes($notes);
                }

                if($projectRelease) {
                    $projectRelease = new \DateTime($projectRelease);

                    if($projectRelease) {
                        $project->setProjectRelease($projectRelease);
                    }
                }
                
                $this->_em->persist($project);
                $this->_em->flush();

                if($users && count($users)) {
                    $this->_projectRepo->deleteProjectUser($id);
                    
                    foreach($users as $user) {
                        if(isset($user['id'], $user['role_id'])) {
                            $projectUser = new RediProjectUser();
                            $projectUser->setProjectId($id);
                            $projectUser->setUserId($user['id']);
                            $projectUser->setRoleId($user['role']);
                            $this->_em->persist($projectUser);
                        }
                    }

                    $this->_em->flush();
                }

                $response = array(
                    'status' => 1,
                    'message' => 'Project updated successfully.'
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
                'message' => 'Project not found.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

}
