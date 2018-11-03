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
use Application\Entity\RediCustomer;
use Application\Entity\RediCustomerNew;

class CustomerNewController extends CustomAbstractActionController
{
  public function getList()
  {
    $filter['completed'] = $this->getRequest()->getQuery('completed', null);
    $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
    $length = (int)trim($this->getRequest()->getQuery('length', 10));

    $data = $this->_customerRepo->searchNewCustomer($filter, $offset, $length);
    $dataCount = $this->_customerRepo->searchNewCustomerCount($filter);

    $response = array(
      'status' => 1,
      'message' => 'Request successful',
      'total_count' => $dataCount,
      'object_count' => count($data),
      'data' => $data
    );

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

    if ($response['status'] == 0) {
      $this->getResponse()->setStatusCode(400);
    }

    return new JsonModel($response);
  }

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
    $completed = 0; //$this->_commonRepo->filterPostData($data, 'completed', 'boolean', 0);

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
        $customerNew->setCompleted($completed);

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

  public function update($id, $data)
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
    $completed = $this->_commonRepo->filterPostData($data, 'completed', 'boolean');

    $customerNew = $this->_customerNewRepository->find($id);

    if ($customerNew) {
      $now = new \DateTime('now');

      if ($studioId !== null) {
        $studio = $this->_studioRepository->find($studioId);

        if ($studio) {
          $customerNew->setStudioId($studioId);
          $customerNew->setStudioName($studio->getStudioName());
        }
      }

      if ($name !== null) {
        $customerNew->setName($name);
      }

      if ($street !== null) {
        $customerNew->setStreet($street);
      }

      if ($street !== null) {
        $customerNew->setCity($city);
      }

      if ($street !== null) {
        $customerNew->setState($state);
      }

      if ($street !== null) {
        $customerNew->setZip($zip);
      }

      if ($street !== null) {
        $customerNew->setEmail($email);
      }

      if ($street !== null) {
        $customerNew->setPhone($phone);
      }

      if ($street !== null) {
        $customerNew->setBillingContact($billingContact);
      }

      if ($street !== null) {
        $customerNew->setBillingEmail($billingEmail);
      }

      if ($street !== null) {
        $customerNew->setBillingPhone($billingPhone);
      }

      if ($completed !== null) {
        $customerNew->setCompleted($completed);
      }

      $customerNew->setUpdatedBy($this->_user_id);
      $customerNew->setUpdatedAt($now);

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
        'message' => 'Data not round.'
      );
    }

    if ($response['status'] == 0) {
      $this->getResponse()->setStatusCode(400);
    }

    return new JsonModel($response);
  }

  public function delete($id)
  {
    $customerNew = $this->_customerNewRepository->find($id);

    if ($customerNew) {
      $this->_em->remove($customerNew);
      $this->_em->flush();

      $response = array(
        'status' => 1,
        'message' => 'Data deleted'
      );
    } else {
      $response = array(
        'status' => 0,
        'message' => 'Data does not exist'
      );
    }

    if ($response['status'] == 0) {
      $this->getResponse()->setStatusCode(400);
    }

    return new JsonModel($response);
  }

  private function getSingle($id)
  {
    $result = $this->_customerRepo->getCustomerNewById($id);

    return $result;
  }
}
