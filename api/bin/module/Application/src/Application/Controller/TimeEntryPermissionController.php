<?php

namespace Application\Controller;

use Application\Entity\RediTimeEntry;
use Application\Entity\RediTimeEntryFile;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;
use Application\Entity\RediUserTypeTimeEntryPermission;

class TimeEntryPermissionController extends CustomAbstractActionController
{
    public function getList()
    {
        if($this->_user_type_id == 100) {
            $data = $this->_timeEntryRepo->getTimeEntryPermissionList();

            $response = array(
              'status' => 1,
              'message' => 'Request successful',
              'total_count' => count($data),
              'object_count' => count($data),
              'data' => $data
            );
        }else {
          $response = array(
              'status' => 0,
              'message' => 'Access denied.'
          );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function create($data)
    {
        $userTypeIds = (array)json_decode(trim(isset($data['user_type_ids']) ? $data['user_type_ids'] : ''), true);

        if ($this->_user_type_id == 100) {
            $this->_timeEntryRepo->truncateTimeEntryPermissionTable();
            
            foreach($userTypeIds as $userTypeId) {
                if($userTypeId) {
                    $permission = new RediUserTypeTimeEntryPermission();
                    $permission->setUserTypeId($userTypeId);
                    $this->_em->persist($permission);
                }
            }

            $this->_em->flush();
            $data = $this->_timeEntryRepo->getTimeEntryPermissionList();

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => $data,
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Access denied.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }
}
