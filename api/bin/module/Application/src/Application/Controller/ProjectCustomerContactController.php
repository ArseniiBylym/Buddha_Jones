<?php

namespace Application\Controller;

use Application\Entity\RediCustomerContact;
use Application\Entity\RediProjectToCampaignCc;
use Application\Entity\RediProject;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectManager;
use Application\Entity\RediProjectProducer;
use Application\Entity\RediProjectToCampaign;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class ProjectCustomerContactController extends CustomAbstractActionController
{
    public function get($projectId)
    {
        $data = $this->_customerRepo->getProjectCustomerContact($projectId);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );

        return new JsonModel($response);
    }

}
