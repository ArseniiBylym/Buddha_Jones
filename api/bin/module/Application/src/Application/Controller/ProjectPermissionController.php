<?php

namespace Application\Controller;

use Application\Entity\RediUserTypeProjectPermission;
use Zend\View\Model\JsonModel;

use Application\Entity\RediUser;
use Application\Entity\RediNavigationPermission;

class ProjectPermissionController extends CustomAbstractActionController
{
    public function getList()
    {
        $permission = $this->_usersRepo->searchProjectPermission();

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => array(
                'permissions' => $permission
            )
        );

        return new JsonModel($response);
    }
}
