<?php

namespace Application\Controller;

use Application\Entity\RediProject;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectManager;
use Application\Entity\RediProjectProducer;
use Application\Entity\RediProjectUser;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class FilterController extends CustomAbstractActionController
{
    public function getList() {
        $data = array(
            'project',
        );
        
        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data,
        );

        return new JsonModel($response);
    }
    public function get($filterName) {
        switch($filterName) {
            case 'project': $data = $this->getProjectFilter(); break;
            default: $data = array();
        }
            
        $response = array(
            'status' => 1,
            'message' => "Request successful",
            'data' => $data
        );

        return new JsonModel($response);
    }

    private function getProjectFilter()
    {
        $allProjectAccess = $this->_usersRepo->extractPermission($this->_user_permission, 200, 'view_or_edit');
        $projectNameViewAccess = $this->_usersRepo->extractPermission($this->_user_permission, 2, 'view_or_edit');
        $projectCodeNameViewAccess = $this->_usersRepo->extractPermission($this->_user_permission, 31, 'view_or_edit');

        $filter['all_project_access'] = $allProjectAccess;
        $filter['project_name_view_access'] = $projectNameViewAccess;
        $filter['project_code_name_view_access'] = $projectCodeNameViewAccess;

        $filter['image_path'] = $this->_siteUrl . 'thumb/profile_image/';
        $filter['project_to_campaign_user_id'] = $this->_user_id;

        $data = $this->_projectRepo->getFilters($filter);

        foreach($data as &$dataRow) {
            $projectName = $this->_projectRepo->getProjectName($dataRow['projectId'], $this->_user_type_id);
            $dataRow = array_merge($dataRow, $projectName);
        }

        return $data;
    }
}
