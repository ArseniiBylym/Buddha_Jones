<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;

class SpotSentFileController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['spot_id'] = (int) trim($this->getRequest()->getQuery('spot_id', ''));
        $filter['offset'] = (int) trim($this->getRequest()->getQuery('offset', 0));
        $filter['length'] = (int) trim($this->getRequest()->getQuery('length', 10));

        $data = $this->_spotRepo->searchSpotSendFiles($filter);
        $totalCount = $this->_spotRepo->searchSpotSendFiles(array_merge($filter, array('get_count' => true)));

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data,
        );

        return new JsonModel($response);
    }
}
