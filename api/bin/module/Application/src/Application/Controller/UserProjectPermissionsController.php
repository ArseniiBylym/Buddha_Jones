<?php

namespace Application\Controller;

use Application\Entity\RediUserTypeProjectPermission;
use Zend\View\Model\JsonModel;

use Application\Entity\RediUser;
use Application\Entity\RediNavigationPermission;

class UserProjectPermissionsController extends CustomAbstractActionController
{
    public function getList()
    {
        $permission = $this->_usersRepo->getUserTypeProjectPermission($this->_user_type_id);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $permission
        );

        return new JsonModel($response);
    }
}
