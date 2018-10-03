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
use Application\Entity\RediFinishingHouse;

class FinishingHouseController extends CustomAbstractActionController
{
  public function getList()
  {
    // check permission
    $canViewCreativeSpot = $this->_usersRepo->extractPermission($this->_user_permission, 22, 'view_or_edit');
    $data = ($canViewCreativeSpot || $this->_user_type_id == 100)
      ? $this->_spotRepo->getAllFinishingHouse() : array();

    $response = array(
      'status' => 1,
      'message' => 'Request successful',
      'total_count' => count($data),
      'object_count' => count($data),
      'data' => $data
    );


    return new JsonModel($response);
  }

  public function create($data)
  {
    if ($this->_user_type_id == 100) {
      $name = trim(isset($data['name']) ? $data['name'] : '');

      if ($name) {
        $checkingName = $this->_finishingHouseRepository->findOneBy(array('name' => $name));

        if (!$checkingName) {
          $finishingHouse = new RediFinishingHouse();
          $finishingHouse->setName($name);
          $this->_em->persist($finishingHouse);
          $this->_em->flush();

          $responseData = $this->_spotRepo->getAllFinishingHouse();

          $response = array(
            'status' => 1,
            'message' => 'Request successful.',
            'data' => $responseData,
          );
        } else {
          $response = array(
            'status' => 0,
            'message' => 'Name already exists.'
          );
        }
      } else {
        $response = array(
          'status' => 0,
          'message' => 'Please provide required data(name).'
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
    if ($this->_user_type_id == 100) {
      $name = trim(isset($data['name']) ? $data['name'] : '');

      $checkExisting = $this->_finishingHouseRepository->find($id);

      if ($checkExisting) {
        if ($name) {
          $checkingName = $this->_finishingHouseRepository->findOneBy(array('name' => $name));

          if (!$checkingName) {
            $checkExisting->setName($name);
            $this->_em->persist($checkExisting);
            $this->_em->flush();

            $responseData = $this->_spotRepo->getAllFinishingHouse();

            $response = array(
              'status' => 1,
              'message' => 'Request successful.',
              'data' => $responseData,
            );
          } else {
            $response = array(
              'status' => 0,
              'message' => 'Name already exists.'
            );
          }
        } else {
          $response = array(
            'status' => 0,
            'message' => 'Please provide required data(name).'
          );
        }
      } else {
        $response = array(
          'status' => 0,
          'message' => 'Entry not found.'
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

  public function delete($id)
  {
    if ($this->_user_type_id == 100) {
      $checkExisting = $this->_finishingHouseRepository->find($id);

      if ($checkExisting) {
        $this->_em->remove($checkExisting);
        $this->_em->flush();
      }

      $responseData = $this->_spotRepo->getAllFinishingHouse();

      $response = array(
        'status' => 1,
        'message' => 'Request successful.',
        'data' => $responseData,
      );
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
