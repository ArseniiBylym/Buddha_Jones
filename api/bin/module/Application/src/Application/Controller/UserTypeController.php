<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;

use Application\Entity\RediUser;
use Application\Entity\RediNavigationPermission;

class UserTypeController extends CustomAbstractActionController
{
    public function getList()
    {
        $data = $this->_usersRepo->getAllUserType();

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );


        return new JsonModel($response);
    }

}
