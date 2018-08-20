<?php

namespace Application\Controller;

use Application\Entity\RediProject;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectManager;
use Application\Entity\RediProjectProducer;
use Application\Entity\RediProjectToCampaign;
use Application\Entity\RediProjectUser;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class ProjectCampaignOfUserController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['project_id'] = (int)$this->getRequest()->getQuery('project_id', 0);
        $filter['campaign_id'] = (int)$this->getRequest()->getQuery('campaign_id', 0);
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $filter['user_id'] = $this->_user_id;

        $data = $this->_projectCampaignRepo->search($filter, $offset, $length);
        $totalCount = $this->_projectCampaignRepo->searchCount($filter);

        foreach($data as &$row) {
            // set project name
            $projectName = $this->_projectRepo->getProjectName($row['projectId'], $this->_user_type_id, true);
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
