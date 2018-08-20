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
        // check permission
        $canViewCreativeTeam = $this->_usersRepo->extractPermission($this->_user_permission, 10, 'view_or_edit');
        $canViewDesigner = $this->_usersRepo->extractPermission($this->_user_permission, 13, 'view_or_edit');
        $canViewEditor = $this->_usersRepo->extractPermission($this->_user_permission, 12, 'view_or_edit');
        $canViewBilling = $this->_usersRepo->extractPermission($this->_user_permission, 11, 'view_or_edit');
        $releaseDateView = $this->_usersRepo->extractPermission($this->_user_permission, 3, 'view_or_edit');
        $projectDescription = $this->_usersRepo->extractPermission($this->_user_permission, 5, 'view_or_edit');
        $canViewMaterialReceived = $this->_usersRepo->extractPermission($this->_user_permission, 17, 'view_or_edit');
        $canViewBudget = $this->_usersRepo->extractPermission($this->_user_permission, 18, 'view_or_edit');
        $canViewNote = $this->_usersRepo->extractPermission($this->_user_permission, 19, 'view_or_edit');
        $canViewRequestMusicTeam = $this->_usersRepo->extractPermission($this->_user_permission, 15, 'view_or_edit');
        $canViewRequestWrittingTeam = $this->_usersRepo->extractPermission($this->_user_permission, 14, 'view_or_edit');
        $canViewPor = $this->_usersRepo->extractPermission($this->_user_permission, 20, 'view_or_edit');
        $canViewInvoice = $this->_usersRepo->extractPermission($this->_user_permission, 21, 'view_or_edit');
        $allProjectAccess = $this->_usersRepo->extractPermission($this->_user_permission, 200, 'view_or_edit');
        $projectNameViewAccess = $this->_usersRepo->extractPermission($this->_user_permission, 2, 'view_or_edit');
        $projectCodeNameViewAccess = $this->_usersRepo->extractPermission($this->_user_permission, 31, 'view_or_edit');

        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $filter['customer_id'] = (int)$this->getRequest()->getQuery('customer_id', 0);
        $filter['detailed'] = (int)$this->getRequest()->getQuery('detailed', 0);
        $filter['project_code'] = $this->getRequest()->getQuery('project_code', null);
        $filter['project_release'] = $this->getRequest()->getQuery('project_release', null);
        $filter['all_project_access'] = $allProjectAccess;
        $filter['project_name_view_access'] = $projectNameViewAccess;
        $filter['project_code_name_view_access'] = $projectCodeNameViewAccess;
        $filter['sort'] = $this->getRequest()->getQuery('sort', 'id');
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $getUser = (int)trim($this->getRequest()->getQuery('get_user', 0));

        $filter['image_path'] = $this->_siteUrl . 'thumb/profile_image/';
        $filter['project_to_campaign_user_id'] = $this->_user_id;

        if ($filter['detailed']) {
            $data = $this->_projectRepo->searchDetailed($filter, $offset, $length);
        } else {
            $data = $this->_projectRepo->search($filter, $offset, $length);
        }

        $totalCount = $this->_projectRepo->searchCount($filter);

        if($getUser) {
            foreach($data as &$dataRow) {
                foreach($dataRow['campaign'] as &$row) {
                    if($canViewCreativeTeam) {
                        $row['user'] = $this->_campaignRepo->getCampaignProjectPeople('user', $row['projectCampaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if($canViewDesigner) {
                        $row['designer'] = $this->_campaignRepo->getCampaignProjectPeople('designer', $row['projectCampaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if($canViewEditor) {
                        $row['editor'] = $this->_campaignRepo->getCampaignProjectPeople('editor', $row['projectCampaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if($canViewBilling) {
                        $row['billingUser'] = $this->_campaignRepo->getCampaignProjectPeople('billing', $row['projectCampaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }
                }
            }
        }

        foreach($data as &$dataRow) {
            $projectName = $this->_projectRepo->getProjectName($dataRow['id'], $this->_user_type_id);
            $dataRow = array_merge($dataRow, $projectName);

            if(!$releaseDateView) {
                unset($dataRow['projectRelease']);
            }

            if(!$canViewMaterialReceived || !$canViewBudget || !$canViewNote) {
                foreach($dataRow['campaign'] as &$campaign) {
                    if(!$canViewMaterialReceived) {
                        unset($campaign['materialReceiveDate']);
                    }

                    if(!$canViewBudget) {
                        unset($campaign['budget']);
                        unset($campaign['budgetNote']);
                    }

                    if(!$canViewNote) {
                        unset($campaign['note']);
                    }

                    if(!$canViewRequestWrittingTeam) {
                        unset($campaign['requestWritingTeam']);
                        unset($campaign['writingTeamNotes']);
                    }

                    if(!$canViewRequestMusicTeam) {
                        unset($campaign['requestMusicTeam']);
                        unset($campaign['musicTeamNotes']);
                    }

                    if(!$canViewPor) {
                        unset($campaign['por']);
                    }

                    if(!$canViewInvoice) {
                        unset($campaign['invoiceContact']);
                    }
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

        if($responseData) {
            // check permission
            $canViewCreativeTeam = $this->_usersRepo->extractPermission($this->_user_permission, 10, 'view_or_edit');
            $canViewDesigner = $this->_usersRepo->extractPermission($this->_user_permission, 13, 'view_or_edit');
            $canViewEditor = $this->_usersRepo->extractPermission($this->_user_permission, 12, 'view_or_edit');
            $canViewBilling = $this->_usersRepo->extractPermission($this->_user_permission, 11, 'view_or_edit');
            $codeNameView = $this->_usersRepo->extractPermission($this->_user_permission, 2, 'view_or_edit');
            $releaseDateView = $this->_usersRepo->extractPermission($this->_user_permission, 3, 'view_or_edit');
            $canViewBudget = $this->_usersRepo->extractPermission($this->_user_permission, 18, 'view_or_edit');
            $canViewNote = $this->_usersRepo->extractPermission($this->_user_permission, 19, 'view_or_edit');
            $canViewMaterialReceived = $this->_usersRepo->extractPermission($this->_user_permission, 17, 'view_or_edit');
            $canViewRequestMusicTeam = $this->_usersRepo->extractPermission($this->_user_permission, 15, 'view_or_edit');
            $canViewRequestWrittingTeam = $this->_usersRepo->extractPermission($this->_user_permission, 14, 'view_or_edit');
            $canViewPor = $this->_usersRepo->extractPermission($this->_user_permission, 20, 'view_or_edit');
            $canViewInvoice = $this->_usersRepo->extractPermission($this->_user_permission, 21, 'view_or_edit');
            $canViewSpotVersionStatus = $this->_usersRepo->extractPermission($this->_user_permission, 29, 'view_or_edit');
            $canViewVersionNote = $this->_usersRepo->extractPermission($this->_user_permission, 30, 'view_or_edit');


            if (count($responseData['campaign'])) {
                foreach ($responseData['campaign'] as &$row) {
                    if($canViewCreativeTeam) {
                        $row['user'] = $this->_campaignRepo->getCampaignProjectPeople('user',  $row['projectCampaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if($canViewDesigner) {
                        $row['designer'] = $this->_campaignRepo->getCampaignProjectPeople('designer',  $row['projectCampaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if($canViewEditor) {
                        $row['editor'] = $this->_campaignRepo->getCampaignProjectPeople('editor',  $row['projectCampaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if($canViewBilling) {
                        $row['billingUser'] = $this->_campaignRepo->getCampaignProjectPeople('billing',  $row['projectCampaignId'], null, null, null, $this->_siteUrl . 'thumb/profile_image/');
                    }

                    if(!$canViewMaterialReceived) {
                        unset($row['materialReceiveDate']);
                    }

                    if(!$canViewBudget) {
                        unset($row['budget']);
                        unset($row['budgetNote']);
                    }

                    if(!$canViewNote) {
                        unset($row['note']);
                    }

                    if(!$canViewRequestWrittingTeam) {
                        unset($row['requestWritingTeam']);
                        unset($row['writingTeamNotes']);
                    }

                    if(!$canViewRequestMusicTeam) {
                        unset($row['requestMusicTeam']);
                        unset($row['musicTeamNotes']);
                    }

                    if(!$canViewPor) {
                        unset($row['por']);
                    }

                    if(!$canViewInvoice) {
                        unset($row['invoiceContact']);
                    }

                    foreach($row['spot'] as &$spot) {
                        foreach($spot['version'] as &$version) {
                            if (!$canViewSpotVersionStatus) {
                                unset($version['versionStatusId']);
                                unset($version['versionStatusName']);
                            }

                            if (!$canViewVersionNote) {
                                unset($version['versionNote']);
                            }
                        }
                    }
                }
            }

            if (!$codeNameView) {
                unset($responseData['projectCode']);
            }

            if (!$releaseDateView) {
                unset($responseData['projectRelease']);
            }

            $projectName = $this->_projectRepo->getProjectName($responseData['id'], $this->_user_type_id);
            $responseData = array_merge($responseData, $projectName);
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
        $canCreateProject = $this->_usersRepo->extractPermission($this->_user_permission, 1, 'edit');
        $canEditReleaseDate = $this->_usersRepo->extractPermission($this->_user_permission, 3, 'edit');
        $canEditProjectName = $this->_usersRepo->extractPermission($this->_user_permission, 2, 'edit');
        $canEditProjectCodeName = $this->_usersRepo->extractPermission($this->_user_permission, 31, 'edit');

        if($canCreateProject) {
            $customerId = (int)(isset($data['customer_id']) ? trim($data['customer_id']) : 0);
            $projectName = trim(($canEditProjectName && !empty($data['name'])) ? $data['name'] : '');
            $notes = trim(isset($data['notes']) ? $data['notes'] : '');
            $projectCode = ($canEditProjectCodeName && !empty($data['project_code'])) ? $data['project_code'] : null;
            $projectRelease = ($canEditReleaseDate && !empty($data['project_release'])) ? $data['project_release'] : null;
            $users = json_decode(isset($data['user']) ? $data['user'] : null, true);

            if ($customerId && ($projectName || $projectCode)) {
                $customer = $this->_customerRepository->find($customerId);

                if ($customer) {
                    $project = new RediProject();
                    $project->setCustomerId($customerId);

                    if ($projectName) {
                        $project->setProjectName($projectName);
                    }

                    if ($projectCode) {
                        $project->setProjectCode($projectCode);
                    }

                    if ($projectRelease) {
                        $projectRelease = new \DateTime($projectRelease);

                        if ($projectRelease) {
                            $project->setProjectRelease($projectRelease);
                        }
                    }

                    if ($notes) {
                        $project->setNotes($notes);
                    }

                    $project->setCreatedByUserId($this->_user_id);
                    $this->_em->persist($project);
                    $this->_em->flush();

                    $projectId = $project->getId();

                    if ($projectId && $users && count($users)) {
                        foreach ($users as $user) {
                            if (isset($user['id'], $user['role_id'])) {
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
                    } else if ($projectName) {
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
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        $canCreateProject = $this->_usersRepo->extractPermission($this->_user_permission, 1, 'edit');
        $canEditReleaseDate = $this->_usersRepo->extractPermission($this->_user_permission, 3, 'edit');
        $canEditProjectName = $this->_usersRepo->extractPermission($this->_user_permission, 2, 'edit');
        $canEditProjectCodeName = $this->_usersRepo->extractPermission($this->_user_permission, 31, 'edit');

        if($canCreateProject) {
            $customerId = isset($data['customer_id']) ? (int)trim($data['customer_id']) : null;
            $projectName = ($canEditProjectName && isset($data['name'])) ? trim($data['name']) : null;
            $notes = isset($data['notes']) ? trim($data['notes']) : null;
            $projectCode = ($canEditProjectCodeName && !empty($data['project_code'])) ? $data['project_code'] : null;
            $projectRelease = ($canEditReleaseDate && !empty($data['project_release'])) ? $data['project_release'] : null;
            $users = json_decode(isset($data['user']) ? $data['user'] : null, true);

            $project = $this->_projectRepository->find($id);

            if ($project) {
                if ($customerId || $projectName || $projectCode || $notes) {
                    if ($projectName || $projectCode) {
                        if ($project->getProjectName() != $projectName || $project->getProjectCode() != $projectCode) {
                            // project history
                            if (!$projectName) {
                                $projectName = $project->getProjectName();
                            }

                            if (!$projectCode) {
                                $projectCode = $project->getProjectCode();
                            }

                            $projectNameString = '"' . $projectName . '"';

                            if ($projectName && $projectCode) {
                                $projectNameString = '"' . $projectName . '" (codename: "' . $projectCode . '")';
                            }
                            if ($projectCode) {
                                $projectNameString = '"' . $projectCode . '"';
                            }

                            if ($projectName && $projectCode) {
                                $projectNameString = '"' . $projectName . '" (codename: "' . $projectCode . '")';
                            } else if ($projectName) {
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

                        if ($projectName) {
                            $project->setProjectName($projectName);
                        }

                        if ($projectCode) {
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

                    if ($projectRelease) {
                        $projectRelease = new \DateTime($projectRelease);

                        if ($projectRelease) {
                            $project->setProjectRelease($projectRelease);
                        }
                    }

                    $this->_em->persist($project);
                    $this->_em->flush();

                    if ($users && count($users)) {
                        $this->_projectRepo->deleteProjectUser($id);

                        foreach ($users as $user) {
                            if (isset($user['id'], $user['role_id'])) {
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
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

}
