<?php
namespace Application\Controller;

use Application\Entity\RediActivity;
use Application\Entity\RediActivityToUserType;
use Application\Entity\RediActivityTypeToActivity;
use Zend\View\Model\JsonModel;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class ModuleController extends CustomAbstractActionController
{
    public function getList()
    {
        $data = $this->_moduleRepo->getModuleTree();

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );

        return new JsonModel($response);
    }
}
