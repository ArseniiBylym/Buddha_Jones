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

class SpotBillingController extends CustomAbstractActionController
{
    public function getList()
    {
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $filter = array();

        $data = $this->_spotRepo->getSpotBillingList($filter, $offset, $length);
        $totalCount = $this->_spotRepo->getSpotBillingProjectCount($filter);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data,
        );

        return new JsonModel($response);
    }

    public function get($id)
    {
        $data = $this->_commentRepo->getById($id, $this->_siteUrl . 'thumb/profile_image/');

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        $confirm = (int)trim(isset($data['confirm']) ? $data['confirm'] : 0);

        if ($confirm) {
            $notification = $this->_notificationRepository->find($id);
            $checkUserType = $this->_notificationUserRepository->findOneBy(array('notificationId' => $id, 'userTypeId' => $this->_user_type_id));

            if ($notification && $checkUserType) {
                $now = new \DateTime('now');

                $notification->setconfirm($confirm);
                $notification->setUpdatedBy($this->_user_id);
                $notification->setUpdatedAt($now);

                $this->_em->persist($notification);
                $this->_em->flush();

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Notification not found.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'You can not unconfirm a notification.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

}
