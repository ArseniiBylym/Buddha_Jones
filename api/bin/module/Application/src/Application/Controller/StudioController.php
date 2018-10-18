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
        $data = $this->_studioRepository->findAll();

        $response = array();

        foreach($data as $row) {
            $response[] = array(
                'id' => $row->getId(),
                'cardcode' => $row->getCardcode(),
                'studioName' => trim($row->getStudioName()),
            );
        }

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $response
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
