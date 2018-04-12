<?php

namespace Application\Controller;

use Application\Entity\RediEstimate;
use Application\Entity\RediEstimateHistory;
use Application\Entity\RediEstimateTemporaryStaff;
use Application\Entity\RediEstimateToOutsideCost;
use Application\Entity\RediEstimateToStaff;
use Application\Entity\RediEstimateToWorker;
use Application\Entity\RediTimeEntry;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class GraphicsRequestStatusController extends CustomAbstractActionController
{
    public function getList()
    {
        $data = $this->_graphicsRequestStatusRepository->findAll();

        $response = array();

        foreach($data as $row) {
            $response[] = array(
                "id" => $row->getId(),
                "name" => $row->getName()
            );
        }

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $response
        );

        return new JsonModel($response);
    }
}
