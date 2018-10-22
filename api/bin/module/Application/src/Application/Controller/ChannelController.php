<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class ChannelController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['campaign_id'] = (int)trim($this->getRequest()->getQuery('campaign_id', 0));

        $data = $this->_campaignRepo->searchChannel($filter);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => count($data),
            'object_count' => count($data),
            'data' => $data
        );


        return new JsonModel($response);
    }

}
