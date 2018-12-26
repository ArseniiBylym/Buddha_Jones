<?php

namespace Application\Controller;

use Application\Entity\RediProjectHistory;
use Application\Entity\RediSpot;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class SpotSentListController extends CustomAbstractActionController
{
    public function getList() {
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $filter['studio_id'] = (int)$this->getRequest()->getQuery('studio_id', 0);
        // $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        // $length = (int)trim($this->getRequest()->getQuery('length', 10));

            $data = $this->_spotRepo->getSpotSentListTree();

            //     $spot['producers'] = $this->_usersRepo->getCreativeUsersFromProjectCampaignByRole(
            //         $spot['projectCampaignId'],
            //         array(1, 2, 3)
            //     );
            // }

            $response = array(
                'status' => 1,
                'message' => 'Request Successful',
                // 'length' => $length,
                // 'offset' => $offset,
                // 'total_count' => $totalCount,
                // 'object_count' => count($data),
                'data' => $data,
            );

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }
}
