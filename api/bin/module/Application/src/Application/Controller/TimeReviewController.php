<?php

namespace Application\Controller;

use Application\Entity\RediComment;
use Application\Entity\RediEstimate;
use Application\Entity\RediEstimateToWorker;
use Application\Entity\RediTimeEntry;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class TimeReviewController extends CustomAbstractActionController
{
    public function getList()
    {
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $filter = array();

        $data = $this->_timeEntryRepo->getTimeReviewProjectList($filter, $offset, $length);
        $totalCount = $this->_timeEntryRepo->getTimeReviewProjectCount($filter);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data,
        );

        return new JsonModel($response);
    }

    public function get($projectId)
    {
        $data = $this->_timeEntryRepo->getTimeReviewDataByProject($projectId);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );

        return new JsonModel($response);
    }
}
