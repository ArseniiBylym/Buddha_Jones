<?php

namespace Application\Controller;

use Application\Entity\RediProjectHistory;
use Application\Entity\RediSpot;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class SpotSentAllController extends CustomAbstractActionController
{
    public function getList()
    {
        $checkSubModuleAccess = $this->_moduleRepo->checkUserSubModule($this->_user_type_id, 8);
        $filter['start_date'] = trim($this->getRequest()->getQuery('start_date', ''));
        $filter['end_date'] = trim($this->getRequest()->getQuery('end_date', ''));
        $filter['project_id'] = (int)($this->getRequest()->getQuery('project_id', 0));
        $filter['campaign_id'] = (int)($this->getRequest()->getQuery('campaign_id', 0));
        $filter['project_campaign_id'] = (int)($this->getRequest()->getQuery('project_campaign_id', 0));
        $filter['spot_id'] = (int)($this->getRequest()->getQuery('spot_id', 0));
        $filter['version_id'] = (int)($this->getRequest()->getQuery('version_id', 0));
        $filter['offset'] = (int)trim($this->getRequest()->getQuery('offset', 0));
        $filter['length'] = (int)trim($this->getRequest()->getQuery('length', 10));
        $filter['return_flat_result'] = true;
        $filter['line_status_id'] = array(2, 3, 4);

        if ($checkSubModuleAccess) {
            $data = $this->_spotRepo->getSpotSentListTree($filter);

            $filter['get_count'] = true;
            $count = $this->_spotRepo->getSpotSentListTree($filter);

            $response = array(
                'status' => 1,
                'message' => 'Request Successful',
                'data' => $data,
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied.',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }


}