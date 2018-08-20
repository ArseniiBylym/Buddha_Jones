<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;

class VersionStatusController extends CustomAbstractActionController
{
    public function getList()
    {
        $versionStatus = $this->_versionRepo->searchVersionStatus();
        $versionStatusCount = count($versionStatus);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'object_count' => $versionStatusCount,
            'data' => $versionStatus
        );


        return new JsonModel($response);
    }

}
