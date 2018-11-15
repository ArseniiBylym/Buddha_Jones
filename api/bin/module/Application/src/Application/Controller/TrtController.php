<?php
namespace Application\Controller;

use Application\Entity\RediActivity;
use Application\Entity\RediActivityToType;
use Application\Entity\RediActivityToUserType;
use Application\Entity\RediActivityTypeToActivity;
use Zend\View\Model\JsonModel;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class TrtController extends CustomAbstractActionController
{
    public function getList()
    {
        $data = $this->_projectCampaignRepo->getAllTrt();
        $totalCount = count($data);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => $totalCount,
            'data' => $data
        );

        return new JsonModel($response);
    }
}
