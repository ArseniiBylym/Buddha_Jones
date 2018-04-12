<?php

namespace Application\Controller;

use Application\Entity\RediBilling;
use Application\Entity\RediBillingActivity;
use Application\Entity\RediBillingApproval;
use Application\Entity\RediBillingEstimate;
use Application\Entity\RediEstimate;
use Application\Entity\RediEstimateToWorker;
use Application\Entity\RediStaff;
use Application\Entity\RediTimeEntry;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class StaffController extends CustomAbstractActionController
{
    public function getList()
    {
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));

//        $filter['sort'] = trim($this->getRequest()->getQuery('sort', ''));
        $search = trim($this->getRequest()->getQuery('search', ''));

        $data = $this->_usersRepo->searchStaff($search, $offset, $length);
        $totalCount = $this->_usersRepo->searchStaffCount($search);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data
        );


        return new JsonModel($response);
    }

    public function get($staffId)
    {
        $data = $this->_usersRepo->getStaff($staffId);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );


        return new JsonModel($response);
    }

    function create($data)
    {
        $name = trim(isset($data['name']) ? $data['name'] : '');
        $rate = isset($data['rate']) ? (float)trim($data['rate']) : null;
        $minHour = isset($data['min_hour']) ? (int)trim($data['min_hour']) : 8;

        if ($name) {
            $staff = new RediStaff();
            $staff->setName($name);
            $staff->setRate($rate);
            $staff->setMinHour($minHour);

            $this->_em->persist($staff);
            $this->_em->flush();

            $staffId = $staff->getId();

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => array(
                    'staff_id' => $staffId
                )
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data (name).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        $name = trim(isset($data['name']) ? $data['name'] : '');
        $rate = isset($data['rate']) ? (float)trim($data['rate']) : null;
        $minHour = isset($data['min_hour']) ? (int)trim($data['min_hour']) : null;

        $staff = $this->_staffRepository->find($id);

        if ($staff) {
            if($name) {
                $staff->setName($name);
            }

            if($rate!==null) {
                $staff->setRate($rate);
            }

            if($minHour!==null) {
                $staff->setMinHour($minHour);
            }

            $this->_em->persist($staff);
            $this->_em->flush();

            $response = array(
                'status' => 1,
                'message' => 'Staff updated successfully.'
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Staff not found.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }
}
