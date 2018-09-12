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
            $userTypeId = (int)trim(isset($data['user_type_id']) ? $data['user_type_id'] : 0);
            $permissions = (array)json_decode(trim(isset($data['permissions']) ? $data['permissions'] : ''), true);

            if ($userTypeId && count($permissions)) {
                $existingPermission = $this->_userTypeProjectPermissionRepository->findBy(array('userTypeId' => $userTypeId));

                foreach ($existingPermission as $row) {
                    $this->_em->remove($row);
                }

                $this->_em->flush();

                foreach ($permissions as $permission) {
                    $projectPermissionId = (int)trim(isset($permission['project_permission_id']) ? $permission['project_permission_id'] : 0);
                    $canView = (int)trim(isset($permission['can_view']) ? $permission['can_view'] : 0);
                    $canEdit = (int)trim(isset($permission['can_edit']) ? $permission['can_edit'] : 0);

                    $canView = $canEdit ? 1 : $canView;

                    if ($projectPermissionId) {
                        $permission = new RediUserTypeProjectPermission();
                        $permission->setUserTypeId($userTypeId);
                        $permission->setProjectPermissionId($projectPermissionId);
                        $permission->setCanView($canView);
                        $permission->setCanEdit($canEdit);

                        $this->_em->persist($permission);
                    }
                }

                $this->_em->flush();

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
