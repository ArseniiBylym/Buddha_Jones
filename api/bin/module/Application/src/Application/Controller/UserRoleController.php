<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;

use Application\Entity\RediUser;
use Application\Entity\RediNavigationPermission;

class UserRoleController extends CustomAbstractActionController
{
    public function getList()
    {
        $userRole = $this->_userRoleRepository->findAll();

        $data = array();

        foreach($userRole as $row) {
            $data[] = array(
                'id' => $row->getId(),
                'role_name' => $row->getRoleName()
            );
        }

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );


        return new JsonModel($response);
    }

}
