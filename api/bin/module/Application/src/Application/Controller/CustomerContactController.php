<?php

namespace Application\Controller;

use Application\Entity\RediCustomerContact;
use Application\Entity\RediProjectToCampaignCc;
use Application\Entity\RediProject;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectManager;
use Application\Entity\RediProjectProducer;
use Application\Entity\RediProjectToCampaign;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class CustomerContactController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $filter['customer_id'] = (int)$this->getRequest()->getQuery('customer_id', 0);

        if ($filter['customer_id']) {
            $data = $this->_customerRepo->searchCustomerContact($filter);
            $totalCount = count($data);

            $response = array(
                'status' => 1,
                'message' => 'Request successful',
                'total_count' => $totalCount,
                'object_count' => $totalCount,
                'data' => $data
            );


        } else {
            $response = array(
                'status' => 1,
                'message' => 'Please provide required query parameter (customer_id)'
            );
        }


        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function get($id)
    {
        $data = $this->getSingle($id);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );


        return new JsonModel($response);
    }

    public function create($data)
    {
        $customerId = $this->_commonRepo->filterPostData($data, 'customer_id', 'int', null);
        $name = $this->_commonRepo->filterPostData($data, 'name', 'string', null);
        $title = $this->_commonRepo->filterPostData($data, 'title', 'string', null);
        $email = $this->_commonRepo->filterPostData($data, 'email', 'string', null);
        $mobilePhone = $this->_commonRepo->filterPostData($data, 'mobile_phone', 'string', null);
        $projectCampaign = (array)json_decode(trim(isset($data['project_campaign']) ? $data['project_campaign'] : ''), true);

        if ($customerId && $name) {
            $customer = $this->_customerRepository->find($customerId);

            if ($customer) {
                $customerContact = new RediCustomerContact();
                $customerContact->setCustomerId($customerId);
                $customerContact->setName($name);
                $customerContact->setEmail($email);
                $customerContact->setTitle($title);
                $customerContact->setMobilePhone($mobilePhone);

                $this->_em->persist($customerContact);
                $this->_em->flush();

                $customerContactId = $customerContact->getId();

                if ($projectCampaign) {
                    foreach ($projectCampaign as $projectCampaignRow) {
                        if (isset($projectCampaignRow['project_id'], $projectCampaignRow['campaign_id']) && $projectCampaignRow['project_id'] && $projectCampaignRow['campaign_id']) {
                            $existingProjectCampaign = $this->_projectToCampaignRepository->findOneBy(array('projectId' => $projectCampaignRow['project_id'], 'campaignId' => $projectCampaignRow['campaign_id']));

                            if (!$existingProjectCampaign) {
                                $existingProjectCampaign = new RediProjectToCampaign();
                                $existingProjectCampaign->setProjectId($projectCampaignRow['project_id']);
                                $existingProjectCampaign->setCampaignId($projectCampaignRow['campaign_id']);

                                $this->_em->persist($existingProjectCampaign);
                                $this->_em->flush();
                            }

                            $customerContactToProjectCampaign = new RediProjectToCampaignCc();
                            $customerContactToProjectCampaign->setCustomerContactId($customerContactId);
                            $customerContactToProjectCampaign->setProjectToCampaignId($existingProjectCampaign->getId());
                            $this->_em->persist($customerContactToProjectCampaign);
                        }
                    }

                    $this->_em->flush();
                }

                $data = array_merge($this->getSingle($customerContactId), array(
                    'customer_contact_id' => $customerContactId
                ));

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $data,
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
                'message' => 'Please provide required data(name, email, customer_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        $customerId = $this->_commonRepo->filterPostData($data, 'customer_id', 'int', null);
        $name = $this->_commonRepo->filterPostData($data, 'name', 'string', null);
        $title = $this->_commonRepo->filterPostData($data, 'title', 'string', null);
        $email = $this->_commonRepo->filterPostData($data, 'email', 'string', null);
        $mobilePhone = $this->_commonRepo->filterPostData($data, 'mobile_phone', 'string', null);
        $projectCampaign = (array)json_decode(trim(isset($data['project_campaign']) ? $data['project_campaign'] : ''), true);

        $customerContact = $this->_customerContactRepository->find($id);

        if ($customerContact) {
            if ($customerId) {
                $customer = $this->_customerRepository->find($customerId);
                if ($customer) {

                    $customerContact->setCustomerId($customerId);
                }
            }

            if ($name !== null) {
                $customerContact->setName($name);
            }

            if ($title !== null) {
                $customerContact->setTitle($title);
            }

            if ($email !== null) {
                $customerContact->setEmail($email);
            }

            if ($mobilePhone !== null) {
                $customerContact->setMobilePhone($mobilePhone);
            }

            $this->_em->persist($customerContact);
            $this->_em->flush();

            if ($projectCampaign) {
                    // Remove existing project campaign form customer contact
                $projectCampaignCustomerContact = $this->_projectToCamapignCC->findBy(array('customerContactId' => $id));

                if ($projectCampaignCustomerContact) {
                    foreach ($projectCampaignCustomerContact as $pccc) {
                        $this->_em->remove($pccc);
                    }
                }

                $this->_em->flush();

                    // Add new project campaign for customer contact
                foreach ($projectCampaign as $projectCampaignRow) {
                    if (isset($projectCampaignRow['project_id'], $projectCampaignRow['campaign_id']) && $projectCampaignRow['project_id'] && $projectCampaignRow['campaign_id']) {
                        $existingProjectCampaign = $this->_projectToCampaignRepository->findOneBy(array('projectId' => $projectCampaignRow['project_id'], 'campaignId' => $projectCampaignRow['campaign_id']));

                        if (!$existingProjectCampaign) {
                            $existingProjectCampaign = new RediProjectToCampaign();
                            $existingProjectCampaign->setProjectId($projectCampaignRow['project_id']);
                            $existingProjectCampaign->setCampaignId($projectCampaignRow['campaign_id']);

                            $this->_em->persist($existingProjectCampaign);
                            $this->_em->flush();
                        }

                        $existingProjectCampaignCustomerContact = $this->_projectToCamapignCC->findOneBy(array('customerContactId' => $id, 'projectToCampaignId' => $existingProjectCampaign->getId()));

                        if (!$existingProjectCampaignCustomerContact) {
                            $customerContactToProjectCampaign = new RediProjectToCampaignCc();
                            $customerContactToProjectCampaign->setCustomerContactId($id);
                            $customerContactToProjectCampaign->setProjectCampaignId($existingProjectCampaign->getId());
                            $this->_em->persist($customerContactToProjectCampaign);
                        }
                    }
                }

                $this->_em->flush();
            }

            $data = array_merge($this->getSingle($id), array(
                'customer_contact_id' => $id
            ));

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => $data,
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Customer contact not found'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function patch($id, $data)
    {
        $customerId = $this->_commonRepo->filterPostData($data, 'customer_id', 'int', null);
        $name = $this->_commonRepo->filterPostData($data, 'name', 'string', null);
        $title = $this->_commonRepo->filterPostData($data, 'title', 'string', null);
        $email = $this->_commonRepo->filterPostData($data, 'email', 'string', null);
        $mobilePhone = $this->_commonRepo->filterPostData($data, 'mobile_phone', 'string', null);
        $projectCampaign = (array)json_decode(trim(isset($data['project_campaign']) ? $data['project_campaign'] : ''), true);

        $customerContact = $this->_customerContactRepository->find($id);

        if ($customerContact) {
            if ($customerId) {
                $customer = $this->_customerRepository->find($customerId);
                if ($customer) {

                    $customerContact->setCustomerId($customerId);
                }
            }

            if ($name !== null) {
                $customerContact->setName($name);
            }

            if ($title !== null) {
                $customerContact->setTitle($title);
            }

            if ($email !== null) {
                $customerContact->setEmail($email);
            }

            if ($mobilePhone !== null) {
                $customerContact->setMobilePhone($mobilePhone);
            }

            $this->_em->persist($customerContact);
            $this->_em->flush();

            if ($projectCampaign) {
                    // Add new project campaign for customer contact
                foreach ($projectCampaign as $projectCampaignRow) {
                    if (isset($projectCampaignRow['project_id'], $projectCampaignRow['campaign_id']) && $projectCampaignRow['project_id'] && $projectCampaignRow['campaign_id']) {
                        $existingProjectCampaign = $this->_projectToCampaignRepository->findOneBy(array('projectId' => $projectCampaignRow['project_id'], 'campaignId' => $projectCampaignRow['campaign_id']));

                        if (!$existingProjectCampaign) {
                            $existingProjectCampaign = new RediProjectToCampaign();
                            $existingProjectCampaign->setProjectId($projectCampaignRow['project_id']);
                            $existingProjectCampaign->setCampaignId($projectCampaignRow['campaign_id']);

                            $this->_em->persist($existingProjectCampaign);
                            $this->_em->flush();
                        }

                        $existingProjectCampaignCustomerContact = $this->_projectToCamapignCC->findOneBy(array('customerContactId' => $id, 'projectCampaignId' => $existingProjectCampaign->getId()));

                        if (!$existingProjectCampaignCustomerContact) {
                            $customerContactToProjectCampaign = new RediProjectToCampaignCc();
                            $customerContactToProjectCampaign->setCustomerContactId($id);
                            $customerContactToProjectCampaign->setProjectCampaignId($existingProjectCampaign->getId());
                            $this->_em->persist($customerContactToProjectCampaign);
                        }
                    }
                }

                $this->_em->flush();
            }

            $data = array_merge($this->getSingle($id), array(
                'customer_contact_id' => $id
            ));

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => $data,
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Customer contact not found'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    private function getSingle($id) {
        $data = $this->_customerRepo->getCustomerContactById($id);

        return $data;
    }

}
