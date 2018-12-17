<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;

class SearchController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));

        $data = $this->_spotRepo->fullSearch($filter, $offset, $length);
        $totalCount = $this->_spotRepo->fullSearchCount($filter);

        foreach ($data as &$row) {
            // set project name
            $projectName = $this->_projectRepo->getProjectName($row['projectId'], $this->_user_type_id);
            $row = array_merge($row, $projectName);
        }

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data
        );


        return new JsonModel($response);
    }
}