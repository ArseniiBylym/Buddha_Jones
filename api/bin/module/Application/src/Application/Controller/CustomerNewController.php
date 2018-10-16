<?php

namespace Application\Controller;

use Application\Entity\RediCustomerContact;
use Application\Entity\RediCustomerContactToProjectCampaign;
use Application\Entity\RediProject;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectManager;
use Application\Entity\RediProjectProducer;
use Application\Entity\RediProjectToCampaign;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;
use Application\Entity\RediCustomer;
use Application\Entity\RediCustomerNew;

class CustomerNewController extends CustomAbstractActionController
{
  public function create($data)
  {
    $studioId = $this->_commonRepo->filterPostData($data, 'studio_id', 'int');
    $name = $this->_commonRepo->filterPostData($data, 'name', 'string');
    $street = $this->_commonRepo->filterPostData($data, 'street', 'string');
    $city = $this->_commonRepo->filterPostData($data, 'city', 'string');
    $state = $this->_commonRepo->filterPostData($data, 'state', 'string');
    $zip = $this->_commonRepo->filterPostData($data, 'zip', 'string');
    $email = $this->_commonRepo->filterPostData($data, 'email', 'string');
    $phone = $this->_commonRepo->filterPostData($data, 'phone', 'string');
    $billingContact = $this->_commonRepo->filterPostData($data, 'billing_contact', 'string');
    $billingEmail = $this->_commonRepo->filterPostData($data, 'billing_email', 'string');
    $billingPhone = $this->_commonRepo->filterPostData($data, 'billing_phone', 'string');

    if ($studioId && $name) {
      $studio = $this->_studioRepository->find($studioId);

      if ($studio) {
        $now = new \DateTime('now');

        $customerNew = new RediCustomerNew();
        $customerNew->setStudioId($studioId);
        $customerNew->setStudioName($studio->getStudioName());
        $customerNew->setName($name);
        $customerNew->setStreet($street);
        $customerNew->setCity($city);
        $customerNew->setState($state);
        $customerNew->setZip($zip);
        $customerNew->setEmail($email);
        $customerNew->setPhone($phone);
        $customerNew->setBillingContact($billingContact);
        $customerNew->setBillingEmail($billingEmail);
        $customerNew->setBillingPhone($billingPhone);
        $customerNew->setCreatedBy($this->_user_id);
        $customerNew->setCreatedAt($now);

        $this->_em->persist($customerNew);
        $this->_em->flush();

        $data = $this->getSingle($customerNew->getId());

        $response = array(
          'status' => 1,
          'message' => 'Request successful.',
          'data' => $data,
        );
      } else {
        $response = array(
          'status' => 0,
          'message' => 'Studio not found.'
        );
      }
    } else {
      $response = array(
        'status' => 0,
        'message' => 'Please provide required data(studio_id, name).'
      );
    }

    if ($response['status'] == 0) {
      $this->getResponse()->setStatusCode(400);
    }

    return new JsonModel($response);
  }

  private function getSingle($id) {
    $result = $this->_customerRepo->getCustomerNewById($id);

    return $result;
  }
}
