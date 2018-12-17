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
        try {
            if (!$this->_usersRepo->getStudioRateCardAccess($this->_user_type_id)) {
                throw new \Exception('Permission deined');
            }

            $studioId = (int)$this->getRequest()->getQuery('studio_id', 0);

            if (!$studioId) {
                throw new \Exception('Please provider required parameter (studioId)');
            }

            $data = $this->_activityRepo->getRatecardType($studioId);

            $response = array(
                'status' => 1,
                'message' => 'Request successful',
                'data' => $data,
            );

        } catch (\Exception $e) {
            $response = array(
                'status' => 0,
                'message' => $e->getMessage(),
            );

            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function create($data)
    {
        try {
            if (!$this->_usersRepo->getStudioRateCardAccess($this->_user_type_id)) {
                throw new \Exception('Permission deined');
            }

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

                // insert rows in studioRateCard for existing activity 
                    $this->_activityRepo->populateStudioRatecardByRatecard($ratecardType->getRatecardId());

                    $data = $this->_activityRepo->getRatecardType($studioId);

                    $response = array(
                        'status' => 1,
                        'message' => 'Request successful.',
                        'data' => $data,
                    );
                }
            } else {
                throw new \Exception('Please provide required data (studio_id, ratecard_name)');
            }
        } catch (\Exception $e) {
            $response = array(
                'status' => 0,
                'message' => $e->getMessage(),
            );

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

            $data = $this->_activityRepo->getRatecardType($ratecardType->getStudioId());

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
        try {
            if (!$this->_usersRepo->getStudioRateCardAccess($this->_user_type_id)) {
                throw new \Exception('Permission deined');
            }
            $ratecardType = $this->_ratecardTypeRepository->find($id);
            $studioId = 0;

            if ($ratecardType) {
                $studioId = $ratecardType->getStudioId();
                $this->_em->remove($ratecardType);
                $this->_em->flush();

            }

            $this->_activityRepo->cleanStudioRatecard();


            $data = $this->_activityRepo->getRatecardType($studioId);

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

}
