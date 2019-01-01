<?php

namespace Application\Controller;

use Application\Entity\RediProjectHistory;
use Application\Entity\RediSpot;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class SpotSentListController extends CustomAbstractActionController
{
    public function getList()
    {
        $subModuleId = (int)trim($this->getRequest()->getQuery('sub_module_id', 0));

        $filter['current_user_id'] = $this->_user_id;
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));

        $checkSubModuleAccess = $this->_moduleRepo->checkUserSubModule($this->_user_type_id, $subModuleId);

        if ($checkSubModuleAccess) {
            if ($subModuleId == 1) { // initiate
                $filter['line_status_id'] = array(1);
            } else if ($subModuleId == 2) { // post spot sent
                $filter['line_status_id'] = array(2);
            } else if ($subModuleId == 3) { // Spot sent for finish
                $filter['line_status_id'] = array(3);
            } else if ($subModuleId == 4) { // Spots for Graphics
                $filter['graphics_status'] = array(1, 3);
            } else if ($subModuleId == 5) { // Spots for EDL
                $filter['graphics_status'] = array(2);
            } else if ($subModuleId == 6) { // Spot for Billing
                $filter['line_status_id'] = array(4);
                $filter['graphics_status_id'] = array(4);
            }

            $data = $this->_spotRepo->getSpotSentListTree($filter);

            $response = array(
                'status' => 1,
                'message' => 'Request Successful',
                'data' => $data,
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied. (Check if required param are sent (sub_module_id))',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }
}