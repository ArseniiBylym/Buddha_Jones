<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class TimeEntryStatusController extends CustomAbstractActionController
{
    public function getList()
    {
        $data = $this->_timeEntryStatusRepository->findAll();

        $response = array_map(function($row) {
            return array(
                'id' => $row->getId(),
                'status' => $row->getName(),
            );
        }, $data);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $response
        );


        return new JsonModel($response);
    }




}
