<?php

namespace Application\Controller;

use Application\Entity\RediCustomerContact;
use Application\Entity\RediCustomerPrice;
use Application\Entity\RediProject;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectManager;
use Application\Entity\RediProjectProducer;
use Application\Entity\RediProjectToCampaign;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class CustomerPriceController extends CustomAbstractActionController
{
    public function getList()
    {
        $customerId = (int)$this->getRequest()->getQuery('customer_id', 0);

        if($customerId) {
            $data = $this->_customerRepo->searchCustomerPrice($customerId);

            $response = array(
                'status' => 1,
                'message' => 'Request successful',
                'data' => $data
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provider required parameter (customer_id)'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function create($data)
    {
        $customerId = (int)(isset($data['customer_id']) ? trim($data['customer_id']) : 0);
        $activityId = (int)(isset($data['activity_id']) ? trim($data['activity_id']) : 0);
        $price = (float)(isset($data['price']) ? trim($data['price']) : 0);

        if ($customerId && $activityId && $price) {
            $customer = $this->_customerRepository->find($customerId);
            $activity = $this->_activityRepo->find($activityId);

            if (!$customer) {
                $response = array(
                    'status' => 0,
                    'message' => 'Customer does not exist'
                );
            } else if (!$activity) {
                $response = array(
                    'status' => 0,
                    'message' => 'Activity does not exist'
                );
            } else {
                $customerPrice = $this->_customerPriceRepository->findOneby(array('customerId' => $customerId, 'activityId' => $activityId));

                if(!$customerPrice) {
                    $customerPrice = new RediCustomerPrice();
                    $customerPrice->setCustomerId($customerId);
                    $customerPrice->setActivityId($activityId);
                }

                $customerPrice->setPrice($price);

                $this->_em->persist($customerPrice);
                $this->_em->flush();

                $data = $this->_customerRepo->getCustomerPriceById($customerId, $activityId);

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $data,
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data (customer_id, activity_id, price)'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }



}
