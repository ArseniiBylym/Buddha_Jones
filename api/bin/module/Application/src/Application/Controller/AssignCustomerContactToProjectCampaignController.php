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

class AssignCustomerContactToProjectCampaignController extends CustomAbstractActionController
{
    public function create($data)
    {
        $projectCampaignId = (int)(isset($data['project_campaign_id']) ? trim($data['project_campaign_id']) : 0);
        $firstPointOfContact = (isset($data['customer_contact_id']) ? trim($data['customer_contact_id']) : 0);
        $firstPointOfContact = (strtolower($firstPointOfContact) != 'null') ? (int)$firstPointOfContact : null;

        if ($projectCampaignId && $firstPointOfContact) {
            $checkExisting = $this->_projectToCamapignCC->findOneBy(array('projectCampaignId' => $projectCampaignId, 'customerContactId' => $firstPointOfContact));

            if (!$checkExisting) {
                $existingProjectCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);

                if ($existingProjectCampaign) {
                    $customerContact = $this->_customerContactRepository->find((int)$firstPointOfContact);
                    $project = $this->_projectRepository->find($existingProjectCampaign->getProjectId());

                    if ($firstPointOfContact && (!$customerContact || ($customerContact && $customerContact->getCustomerId() != $existingProjectCampaign->getCustomerId()))) {
                        $response = array(
                            'status' => 0,
                            'message' => 'Contact does not belong to customer the project is assigned to.'
                        );
                    } else {
                        $existingProjectCampaign->setFirstPointOfContactId($firstPointOfContact);
                        $this->_em->persist($existingProjectCampaign);

                        $customerContactToPC = new RediProjectToCampaignCc();
                        $customerContactToPC->setProjectCampaignId($projectCampaignId);
                        $customerContactToPC->setCustomerContactId($firstPointOfContact);
                        $this->_em->persist($customerContactToPC);

                        $this->_em->flush();

                        $response = array(
                            'status' => 1,
                            'message' => 'Request successful.'
                        );
                    }
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Project campaign not found.'
                    );
                }
            } else {
                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(project_campaign_id, customer_contact_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function delete($contactId)
    {
        $projectCampaignId = $this->params()->fromRoute('param1', 0);

        if ($contactId && $projectCampaignId) {
            $existingProjectCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);

            if ($existingProjectCampaign) {
                $checkCustomerContactToProjectCampaign = $this->_projectToCamapignCC->findOneBy(array('customerContactId' => $contactId, 'projectCampaignId' => $existingProjectCampaign->getId()));

                if ($checkCustomerContactToProjectCampaign) {
                    $this->_em->remove($checkCustomerContactToProjectCampaign);
                    $this->_em->flush();
                }
            }

            $response = array(
                'status' => 1,
                'message' => 'Request successful.'
            );

        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(contact_id, project_id, campaign_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

}
