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

    public function update($submittingUserTypeId, $data)
    {
        $submittingUserTypeId = (int)(isset($submittingUserTypeId) ? $submittingUserTypeId : 0);
        $approversUserTypeIds = (array)(isset($data['approversUserTypeIds']) ? $data['approversUserTypeIds'] : []);

        if ($this->_user_type_id == 100 && $submittingUserTypeId) {
            $this->_timeEntryRepo->deleteSubmitterTimeApprovalPermission($submittingUserTypeId);

            if ($approversUserTypeIds && count($approversUserTypeIds) > 0) {
                foreach ($approversUserTypeIds as $approverUserTypeId) {
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
