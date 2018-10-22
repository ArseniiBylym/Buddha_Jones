<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class StudioController extends CustomAbstractActionController
{
    public function getList()
    {
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $filter['first_letter'] = trim($this->getRequest()->getQuery('first_letter', ''));

        $data = $this->_customerRepo->searchStudio($filter, $offset, $length);
        $totalCount = $this->_customerRepo->searchStudioCount($filter);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data
        );


        return new JsonModel($response);
    }

    public function get($id) {
        $response = array();

        if($id=='first-letters') {
            $response = $this->_customerRepo->getDistinctStudioFirstLetter();
        } else if($id) {
            $data = $this->_studioRepository->find($id);

            if($data) {
                $response = array(
                    'id' => $data->getId(),
                    'cardcode' => $data->getCardcode(),
                    'studioName' => trim($data->getStudioName()),
                );
            }
        } 

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $response
        );

        return new JsonModel($response);
    }
}
