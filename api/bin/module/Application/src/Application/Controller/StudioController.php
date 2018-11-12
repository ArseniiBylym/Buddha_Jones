<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class StudioController extends CustomAbstractActionController
{
    public function getList()
    {
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $filter['first_letter'] = trim($this->getRequest()->getQuery('first_letter', ''));

        $data = $this->_customerRepo->searchStudio($filter, $offset, $length);
        $totalCount = $this->_customerRepo->searchStudioCount($filter);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data
        );


        return new JsonModel($response);
    }

    public function get($id)
    {
        $response = array();

        if ($id == 'first-letters') {
            $response = $this->getStudioFirstLetter();
        } else if ($id) {
            $data = $this->_studioRepository->find($id);

            if ($data) {
                $response = array(
                    'id' => $data->getId(),
                    'cardcode' => $data->getCardcode(),
                    'studioName' => trim($data->getStudioName()),
                );
            }
        }

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $response
        );

        return new JsonModel($response);
    }

    private function getStudioFirstLetter()
    {
        $allProjectAccess = $this->_usersRepo->extractPermission($this->_user_permission, 200, 'view_or_edit');
        $projectNameViewAccess = $this->_usersRepo->extractPermission($this->_user_permission, 2, 'view_or_edit');
        $projectCodeNameViewAccess = $this->_usersRepo->extractPermission($this->_user_permission, 31, 'view_or_edit');

        $filter['all_project_access'] = $allProjectAccess;
        $filter['project_name_view_access'] = $projectNameViewAccess;
        $filter['project_code_name_view_access'] = $projectCodeNameViewAccess;
        $filter['project_to_campaign_user_id'] = $this->_user_id;

        $ids = $this->_projectRepo->getDistinctStudioId($filter);

        // var_dump($ids); exit;
        $data = $this->_customerRepo->getDistinctStudioFirstLetter($ids);

        return $data;
    }
}
