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
use Application\Entity\RediRatecardType;

class RatecardTypeController extends CustomAbstractActionController
{
    public function getList()
    {
        $studioId = (int)$this->getRequest()->getQuery('studio_id', 0);

        if ($studioId) {
            $data = $this->_customerRepo->getRatecardType($studioId);

            $response = array(
                'status' => 1,
                'message' => 'Request successful',
                'data' => $data,
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provider required parameter (studioId)'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function create($data)
    {
        $studioId = $this->_commonRepo->filterPostData($data, 'studio_id', 'int');
        $ratecardName = $this->_commonRepo->filterPostData($data, 'ratecard_name', 'string');
        $ratecardNote = $this->_commonRepo->filterPostData($data, 'ratecard_note', 'string');

        if ($studioId && $ratecardName) {
            $studio = $this->_studioRepository->find($studioId);

            if (!$studio) {
                $response = array(
                    'status' => 0,
                    'message' => 'Studio does not exist'
                );
            } else {
                $ratecardType = new RediRatecardType();
                $ratecardType->setStudioId($studioId);
                $ratecardType->setRatecardName($ratecardName);
                $ratecardType->setRatecardNote($ratecardNote);

                $this->_em->persist($ratecardType);
                $this->_em->flush();

                $data = $this->_customerRepo->getRatecardType($studioId);

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $data,
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data (studio_id, ratecard_name)'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        $studioId = $this->_commonRepo->filterPostData($data, 'studio_id', 'int');
        $ratecardName = $this->_commonRepo->filterPostData($data, 'ratecard_name', 'string');
        $ratecardNote = $this->_commonRepo->filterPostData($data, 'ratecard_note', 'string');

        try {
            $ratecardType = $this->_ratecardTypeRepository->find($id);

            if (!$ratecardType) {
                throw new \Exception('Entry does not exist');
            }

            if ($studioId) {
                $studio = $this->_studioRepository->find($studioId);

                if (!$studio) {
                    throw new \Exception('Studio does not exist');
                }

                $ratecardType->setStudioId($studioId);
            }

            if ($ratecardName) {
                $ratecardType->setRatecardName($ratecardName);
            }

            if ($ratecardNote) {
                $ratecardType->setRatecardNote($ratecardNote);
            }

            $this->_em->persist($ratecardType);
            $this->_em->flush();

            $data = $this->_customerRepo->getRatecardType($ratecardType->getStudioId());

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => $data,
            );
        } catch (\Exception $e) {
            $this->getResponse()->setStatusCode(400);

            $response = array(
                'status' => 0,
                'message' => $e->getMessage(),
            );
        }

        return new JsonModel($response);
    }

    public function delete($id)
    {
        $ratecardType = $this->_ratecardTypeRepository->find($id);
        $studioId = 0;

        if ($ratecardType) {
            $studioId = $ratecardType->getStudioId();
            $this->_em->remove($ratecardType);
            $this->_em->flush();
        }

        $data = $this->_customerRepo->getRatecardType($studioId);

        $response = array(
            'status' => 1,
            'message' => 'Request successful.',
            'data' => $data,
        );

        return new JsonModel($response);
    }

}
