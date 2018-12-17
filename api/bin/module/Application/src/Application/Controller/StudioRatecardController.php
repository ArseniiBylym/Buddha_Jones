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
use Zend\Mvc\MvcEvent;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;
use Application\Entity\RediStudioRatecard;

class StudioRatecardController extends CustomAbstractActionController
{
    public function getList()
    {
        try {
            if (!$this->_usersRepo->getStudioRateCardAccess($this->_user_type_id)) {
                throw new \Exception('Permission deined');
            }

            $studioId = (int)$this->getRequest()->getQuery('studio_id', 0);
            $ratecardId = $this->getRequest()->getQuery('ratecard_id', 0);
            $selectedRatecardId = null;
            $studioRatecard = array();

            if (!$studioId && !$ratecardId) {
                throw new \Exception('Please provider required parameter (studio_id or ratecard_id)');
            }

            if ($ratecardId) {
                $ratecardType = $this->_ratecardTypeRepository->find($ratecardId);

                if ($ratecardType) {
                    $studio = $this->_studioRepository->find($ratecardType->getStudioId());

                    if ($studio) {
                        $studioId = $ratecardType->getStudioId();
                        $selectedRatecardId = (int)$ratecardId;
                    }
                }
            }

            $ratecardType = $this->_activityRepo->getRatecardType($studioId);

            if (!$ratecardId) {
                $selectedRatecardId = (!empty($ratecardType[0]['ratecard_id'])) ? (int)$ratecardType[0]['ratecard_id'] : 0;
            }

            if ($selectedRatecardId) {
                $studioRatecard = $this->_activityRepo->searchStudioRatecardType($selectedRatecardId);
            }

            $studio = $this->_studioRepository->find($studioId);
            $studioInfo = array();

            if ($studio) {
                $studioInfo = array(
                    'id' => $studio->getId(),
                    'cardcode' => $studio->getCardcode(),
                    'studioName' => trim($studio->getStudioName()),
                );
            }

            $response = array(
                'status' => 1,
                'message' => 'Request successful',
                'data' => array(
                    'ratecardType' => $ratecardType,
                    'studio' => $studioInfo,
                    'selectedRatecardId' => $selectedRatecardId,
                    'studioRateCard' => $studioRatecard,
                ),
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

            $ratecardId = $this->_commonRepo->filterPostData($data, 'ratecard_id', 'int');
            $activityId = $this->_commonRepo->filterPostData($data, 'activity_id', 'int');
            $trtId = $this->_commonRepo->filterPostData($data, 'trt_id', 'int');
            $revisionInc = $this->_commonRepo->filterPostData($data, 'revision_inc', 'int');
            $note = $this->_commonRepo->filterPostData($data, 'note', 'string');
            $type = $this->_commonRepo->filterPostData($data, 'type', 'string');
            $rate = $this->_commonRepo->filterPostData($data, 'rate', 'int');

            if ($ratecardId && $activityId) {
                $ratecard = new RediStudioRatecard();
                $ratecard->setRatecardId($ratecardId);
                $ratecard->setActivityId($activityId);
                $ratecard->setTrtId($trtId);
                $ratecard->setRevisionInc($revisionInc);
                $ratecard->setNote($note);
                $ratecard->setType($type);
                $ratecard->setRate($rate);

                $this->_em->persist($ratecard);
                $this->_em->flush();

                $data = $this->_activityRepo->searchStudioRatecardType($ratecardId);

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $data,
                );
            } else {
                throw new \Exception('Please provide required data (ratecard_id, activity_id, rate)');
            }

        } catch (\Exception $e) {
            $this->getResponse()->setStatusCode(400);

            $response = array(
                'status' => 0,
                'message' => $e->getMessage(),
            );
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        try {
            if (!$this->_usersRepo->getStudioRateCardAccess($this->_user_type_id)) {
                throw new \Exception('Permission deined');
            }

            $ratecardId = $this->_commonRepo->filterPostData($data, 'ratecard_id', 'int');
            $activityId = $this->_commonRepo->filterPostData($data, 'activity_id', 'int');
            $trtId = $this->_commonRepo->filterPostData($data, 'trt_id', 'int');
            $revisionInc = $this->_commonRepo->filterPostData($data, 'revision_inc', 'int');
            $note = $this->_commonRepo->filterPostData($data, 'note', 'string');
            $type = $this->_commonRepo->filterPostData($data, 'type', 'string');
            $rate = $this->_commonRepo->filterPostData($data, 'rate', 'int');

            $ratecard = $this->_studioRatecardRepository->find($id);

            if ($ratecard) {
                if ($ratecardId) {
                    $ratecard->setRatecardId($ratecardId);
                }

                if ($activityId) {
                    $ratecard->setActivityId($activityId);
                }

                if ($trtId) {
                    $ratecard->setTrtId($trtId);
                }

                if ($revisionInc) {
                    $ratecard->setRevisionInc($revisionInc);
                }

                if ($note) {
                    $ratecard->setNote($note);
                }

                if ($type) {
                    $ratecard->setType($type);
                }

                if ($rate) {
                    $ratecard->setRate($rate);
                }

                $this->_em->persist($ratecard);
                $this->_em->flush();

                $data = $this->_activityRepo->searchStudioRatecardType($ratecard->getRatecardId());

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $data,
                );
            } else {
                throw new \Exception('Unable to update as ratecard does not exist');
            }
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

            $ratecard = $this->_studioRatecardRepository->find($id);
            $ratecardId = 0;

            if ($ratecard) {
                $ratecardId = $ratecard->getRatecardId();
                $this->_em->remove($ratecard);
                $this->_em->flush();
            }

            $data = $this->_activityRepo->searchStudioRatecardType($ratecardId);

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
