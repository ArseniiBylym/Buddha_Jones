<?php

namespace Application\Controller;

use Application\Entity\RediEstimate;
use Application\Entity\RediEstimateHistory;
use Application\Entity\RediEstimateTemporaryStaff;
use Application\Entity\RediEstimateToOutsideCost;
use Application\Entity\RediEstimateToStaff;
use Application\Entity\RediEstimateToWorker;
use Application\Entity\RediGraphicsRequest;
use Application\Entity\RediGraphicsRequestDesign;
use Application\Entity\RediGraphicsRequestFile;
use Application\Entity\RediGraphicsRequestFinishing;
use Application\Entity\RediTimeEntry;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class GraphicsRequestAcceptController extends CustomAbstractActionController
{
    public function create($data)
    {
        if ($this->_user_type_id == 2) {
            $graphicsRequestIds = (array)json_decode(trim(isset($data['graphics_request_id']) ? $data['graphics_request_id'] : ''), true);
            $graphicsRequestId = [];

            foreach ($graphicsRequestIds as $id) {
                $id = (int)$id;

                if ($id && !in_array($id, $graphicsRequestId)) {
                    $graphicsRequestId[] = $id;
                }
            }

            if ($graphicsRequestId) {
                $updatedAt = new \DateTime('now');

                foreach ($graphicsRequestIds as $grId) {
                    $graphicsRequest = $this->_graphicsRequestRepository->find($graphicsRequestId);

                    // check if graphics request exists and status is 'approved'
                    if ($graphicsRequest && $graphicsRequest->getStatusId() == 3) {

                        $graphicsRequestAssign = $this->_graphicsRequestAssignRepository->findOneBy(array('graphicsRequestId' => $grId, 'assignedToUserId' => $this->_user_id));

                        if ($graphicsRequestAssign) {
                            $graphicsRequestAssign->setAccepted(1);
                            $graphicsRequestAssign->setUpdatedAt($updatedAt);

                            $this->_em->persist($graphicsRequestAssign);

                            // set graphics request status to accepted
                            $graphicsRequest->setStatusId(4);
                            $this->_em->persist($graphicsRequest);
                        }
                    }

                    $this->_em->flush();
                }

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.'
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Please provide required data.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }
}
