<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;

use Application\Entity\RediUps;
use Application\Entity\RediUpsLine;

class UserController extends CustomAbstractActionController
{
    public function getList() {
        $userAccess = $this->_usersRepo->getUserAccessPermission($this->_user_type_id);
        $user = $this->_usersRepo->getUser($this->_user_id, $userAccess);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $user
        );


        return new JsonModel($response);
    }



}
