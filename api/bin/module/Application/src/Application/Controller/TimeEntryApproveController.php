<?php

namespace Application\Controller;

use Application\Entity\RediTimeEntry;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class TimeEntryApproveController extends CustomAbstractActionController
{
    public function getList()
    {
        $allTimeEntryPermission = $this->_usersRepo->getUserTimeEntryAccess($this->_user_type_id);
        $canApproveTimeEntryOfUser = $this->_usersRepo->getUserToApproveTimeEntry($this->_user_type_id);

        $filter['start_date'] = trim($this->getRequest()->getQuery('start_date', null));
        $filter['end_date'] = trim($this->getRequest()->getQuery('end_date', null));
        $filter['project_id'] = trim($this->getRequest()->getQuery('project_id', null));
        $filter['activity_id'] = (int)trim($this->getRequest()->getQuery('activity_id', 0));
        $filter['user_id'] = (int)trim($this->getRequest()->getQuery('user_id', 0));
        $filter['status'] = 2; // filter time entries which are sent for review

        if($allTimeEntryPermission && count($canApproveTimeEntryOfUser)) {
            $filter['user_type_id'] = $canApproveTimeEntryOfUser;
        } else {
            $filter['user_type_id'] = array(0);
        }

        if ($filter['start_date']) {
            $filter['start_date'] = new \DateTime($filter['start_date']);
            $filter['start_date'] = $filter['start_date']->format('Y-m-d');
        }

        if ($filter['end_date']) {
            $filter['end_date'] = new \DateTime($filter['end_date']);
            $filter['end_date'] = $filter['end_date']->format('Y-m-d');
        }

        $timeEntryData = $this->_timeEntryRepo->search(0, -1, $filter);

        $data = array();

        foreach ($timeEntryData as $row) {
            $rowDate = $row['startDate']->format('Y-m-d');

            if(!isset($data[$rowDate])) {
                $data[$rowDate] = array(
                    'date' => $rowDate,
                    'users' => array(),
                );
            }

            if(!isset($data[$rowDate]['users'][$row['userId']])) {
                $data[$rowDate]['users'][$row['userId']] = array(
                    'userId' => $row['userId'],
                    'userName' => $row['username'],
                    'userInitials' => $row['initials'],
                    'nickName' => $row['nickName'],
                    'userFullName' => trim($row['firstName']  . ' ' . $row['lastName']),
                    'userMinHours' => $row['minHour'],
                    'entries' => array(),
                );
            }

            $userId = $row['userId'];
            unset($row['userId']);
            unset($row['username']);
            unset($row['initials']);
            unset($row['firstName']);
            unset($row['lastName']);
            unset($row['minHour']);

            $data[$rowDate]['users'][$userId]['entries'][] = $row;
        }

        $data = array_values(array_map(function($arrRow) {
            $arrRow['users'] = array_values($arrRow['users']);
            return $arrRow;
        }, $data));

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data,
        );


        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function create($data)
    {
        $allTimeEntryPermission = $this->_usersRepo->getUserTimeEntryAccess($this->_user_type_id);
        $canApproveTimeEntryOfUser = $this->_usersRepo->getUserToApproveTimeEntry($this->_user_type_id);

        // get time entries user can approve
        $filter['status'] = 2; // filter time entries which are sent for review

        if($allTimeEntryPermission && count($canApproveTimeEntryOfUser)) {
            $filter['user_type_id'] = $canApproveTimeEntryOfUser;
        } else {
            $filter['user_type_id'] = array(0);
        }

        $timeEntryData = array_column($this->_timeEntryRepo->search(0, -1, $filter), 'id');

        if(count($timeEntryData)) {
            $ids = (array)json_decode(isset($data['ids']) ? $data['ids'] : null, true);
            $status = 3; //(!empty($data['status'])) ? (int)$data['status'] : null;

            if (count($ids) && $status && in_array($status, array(4, 6))) {
                $ids = array_intersect($timeEntryData, $ids);

                foreach($ids as $id) {
                    $timeEntry = $this->_timeEntryRepository->find($id);
                    $timeEntry->setStatus($status);
                    $this->_em->persist($timeEntry);
                }

                $this->_em->flush();

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful'
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data(ids and status(approve=4, reopen=6).'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }
}
