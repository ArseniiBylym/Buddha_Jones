<?php

namespace Application\Controller;

use Application\Entity\RediProjectHistory;
use Application\Entity\RediSpot;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class SpotSentOptionsController extends CustomAbstractActionController
{
    public function getList()
    {
        $data = $this->_spotSentOptionRepository->findAll();

        $response = array();

        foreach ($data as $row) {
            $response[$row->getKey()] = json_decode($row->getValue());
        }

        $response['finishing_house_option'] = $this->_spotRepo->getAllFinishingHouse();

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $response
        );

        return new JsonModel($response);
    }

    public function get($key)
    {
        $data = $this->_spotSentOptionRepository->find($key);

        $response = array();

        if ($key === 'finishing_house_option') {
            $response = array(
                "key" => 'finishing_house_option',
                "value" => $this->_spotRepo->getAllFinishingHouse()
            );

            $response = array(
                'status' => 1,
                'message' => 'Request successful',
                'data' => $response
            );
        } else if ($data) {
            $response = array(
                "key" => $data->getKey(),
                "value" => json_decode($data->getValue())
            );

            $response = array(
                'status' => 1,
                'message' => 'Request successful',
                'data' => $response
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Option not found.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }
}
