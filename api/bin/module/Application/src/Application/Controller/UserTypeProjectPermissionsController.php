<?php

namespace Application\Controller;

use Application\Entity\RediUserTypeProjectPermission;
use Zend\View\Model\JsonModel;

use Application\Entity\RediUser;
use Application\Entity\RediNavigationPermission;

class UserTypeProjectPermissionsController extends CustomAbstractActionController
{
    public function getList()
    {
        $canEditProjectPermission = $this->_usersRepo->extractPermission($this->_user_permission, 100, 'view');

        $userTypeId = (int)$this->getRequest()->getQuery('user_type_id', 0);

        if($canEditProjectPermission) {
            if($userTypeId) {
                $permission = $this->_usersRepo->getUserTypeProjectPermission($userTypeId);

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful',
                    'data' => array(
                        'permissions' => $permission
                    )
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required parameter (user_type_id)',
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function create($data)
    {
        $canEditProjectPermission = $this->_usersRepo->extractPermission($this->_user_permission, 100, 'edit');

        if($canEditProjectPermission) {
            $projectPermissionId = (int)trim(isset($data['project_permission_id']) ? $data['project_permission_id'] : 0);
            $userTypeId = (int)trim(isset($data['user_type_id']) ? $data['user_type_id'] : 0);
            $canView = (int)trim(isset($data['can_view']) ? $data['can_view'] : 0);
            $canEdit = (int)trim(isset($data['can_edit']) ? $data['can_edit'] : 0);

            if ($projectPermissionId && $userTypeId) {
                $existingPermission = $this->_userTypeProjectPermissionRepository->findOneBy(array('userTypeId' => $userTypeId, 'projectPermissionId' => $projectPermissionId));

                if($existingPermission) {
                    $this->_em->remove($existingPermission);
                    $this->_em->flush();
                }

                $permission = new RediUserTypeProjectPermission();
                $permission->setUserTypeId($userTypeId);
                $permission->setProjectPermissionId($projectPermissionId);
                $permission->setCanView($canView);
                $permission->setCanEdit($canEdit);

                $this->_em->persist($permission);
                $this->_em->flush();

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data(project_permission_id, user_type_id, can_view, can_edit).'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }
}
