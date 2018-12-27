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
        $filter['current_user_id'] = $this->_user_id;

        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));

        $data = $this->_spotRepo->getSpotSentListTree($filter);

        $response = array(
            'status' => 1,
            'message' => 'Request Successful',
            'data' => $data,
        );

        return new JsonModel($response);
    }
}
