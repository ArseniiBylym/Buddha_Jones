<?php
namespace Application\Controller;

use Zend\View\Model\JsonModel;

use Application\Entity\RediSubModuleAccess;

class ModuleAccessController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['user_id'] = (int)trim($this->getRequest()->getQuery('user_id', ''));
        $filter['user_type_id'] = (int)trim($this->getRequest()->getQuery('user_type_id', ''));


        if (!empty($filter['user_id']) || !empty($filter['user_type_id'])) {
            $filter['return_full_data'] = true;

            $data = $this->_moduleRepo->getSubModuleAccess($filter);

            $response = array(
                'status' => 1,
                'message' => 'Request successful',
                'data' => $data
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Send required parameter (user_id or user_type_id)',
            );
        }

        return new JsonModel($response);
    }

    public function create($data)
    {
        $userTypeId = $this->_commonRepo->filterPostData($data, 'user_type_id', 'int', null);
        $subModuleIds = $this->_commonRepo->filterPostData($data, 'sub_module_id', 'json', array());

        if ($userTypeId) {
            $userType = $this->_userTypeRepository->find($userTypeId);

            if ($userType) {
                $this->_moduleRepo->removeAccessByUserTypeId($userTypeId);

                $subModuleIds = array_unique(array_map(function ($subModuleId) {
                    return (int)$subModuleId;
                }, $subModuleIds));

                foreach ($subModuleIds as $subModuleId) {
                    if ($subModuleId) {
                        $subModuleAccess = new RediSubModuleAccess();
                        $subModuleAccess->setSubModuleId($subModuleId);
                        $subModuleAccess->setUserTypeId($userTypeId);
                        $this->_em->persist($subModuleAccess);
                    }
                }

                $this->_em->flush();

                $filter = array(
                    'user_type_id' => $userTypeId,
                    'return_full_data' => true,
                );

                $data = $this->_moduleRepo->getSubModuleAccess($filter);

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $data,
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data(user_type_id).'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(user_type_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }
}
