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

    public function update($approverUserTypeId, $data)
    {
        $approverUserTypeId = (int)(isset($approverUserTypeId) ? $approverUserTypeId : 0);
        $submittingUserTypeIds = (array)json_decode(trim(isset($data['submitting_user_type_id']) ? $data['submitting_user_type_id'] : ''), true);

        if ($this->_user_type_id == 100 && $approverUserTypeId) {
            $this->_timeEntryRepo->deleteApproverTimeApprovalPermission($approverUserTypeId);

            if ($submittingUserTypeIds) {
                $submittingUserTypeIds = array_unique($submittingUserTypeIds);

                foreach ($submittingUserTypeIds as $submittingUserTypeId) {
                    if (!(int)$submittingUserTypeId) {
                        return;
                    }

                    $permission = new RediUserTypeTimeApprovalPermission();
                    $permission->setApproverUserTypeId($approverUserTypeId);
                    $permission->setSubmittingUserTypeId($submittingUserTypeId);
                    $this->_em->persist($permission);
                }
            }

            $this->_em->flush();

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
