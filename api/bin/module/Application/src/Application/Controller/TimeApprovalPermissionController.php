<?php

namespace Application\Controller;

use Application\Entity\RediTimeEntry;
use Application\Entity\RediTimeEntryFile;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;
use Application\Entity\RediUserTypeTimeEntryPermission;
use Application\Entity\RediUserTypeTimeApprovalPermission;

class TimeApprovalPermissionController extends CustomAbstractActionController
{
    public function getList()
    {
        if($this->_user_type_id == 100) {
            $data = $this->_timeEntryRepo->getTimeApprovalPermissionList();

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
        $permissionData = (array)json_decode(trim(isset($data['permissions']) ? $data['permissions'] : ''), true);

        if ($this->_user_type_id == 100 && $permissionData) {
            $approverUserTypeIds = array_column($permissionData, 'approverUserTypeId');

            if($approverUserTypeIds) {
              $this->_timeEntryRepo->deleteApproverTimeApprovalPermission($approverUserTypeIds);

              foreach($permissionData as $permissionRow) {
                  if(!empty($permissionRow['approverUserTypeId']) && !empty($permissionRow['submittingUserTypeId'])) {
                      foreach($permissionRow['submittingUserTypeId'] as $submittingId) {
                          $permission = new RediUserTypeTimeApprovalPermission();
                          $permission->setApproverUserTypeId($permissionRow['approverUserTypeId']);
                          $permission->setSubmittingUserTypeId($submittingId);
                          $this->_em->persist($permission);
                      }
                  }
              }

              $this->_em->flush();
            }
            $data = $this->_timeEntryRepo->getTimeApprovalPermissionList();

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
