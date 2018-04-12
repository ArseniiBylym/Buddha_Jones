<?php
namespace Application\Controller;

use Application\Entity\RediGraphicsRequestAssign;
use Zend\View\Model\JsonModel;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class GraphicsRequestAssignController extends CustomAbstractActionController
{
    public function create($data)
    {
        if (in_array($this->_user_type_id, array(3, 8))) {
            // common param
            $graphicsRequestId = (int)trim(isset($data['graphics_request_id']) ? $data['graphics_request_id'] : '');
            $assignedToUserIds = (array)json_decode(trim(isset($data['assigned_to_user_id']) ? $data['assigned_to_user_id'] : ''), true);

            $assignedToUserId = [];

            foreach ($assignedToUserIds as $id) {
                $id = (int)$id;

                if ($id && !in_array($id, $assignedToUserId)) {
                    $assignedToUserId[] = $id;
                }
            }

            if ($graphicsRequestId && $assignedToUserId) {
                $createdAt = new \DateTime('now');

                foreach ($assignedToUserId as $userId) {
                    $graphicsRequestAssign = $this->_graphicsRequestAssignRepository->findOneBy(array('graphicsRequestId' => $graphicsRequestId, 'assignedToUserId' => $userId));

                    if (!$graphicsRequestAssign) {
                        $graphicsRequestAssign = new RediGraphicsRequestAssign();
                        $graphicsRequestAssign->setGraphicsRequestId($graphicsRequestId);
                        $graphicsRequestAssign->setAssignedToUserId($userId);
                        $graphicsRequestAssign->setAccepted(0);
                        $graphicsRequestAssign->setCreatedByUserId($this->_user_id);
                        $graphicsRequestAssign->setCreatedAt($createdAt);

                        $this->_em->persist($graphicsRequestAssign);
                    }
                }

                $this->_em->flush();

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

    public function delete($id)
    {
        if (in_array($this->_user_type_id, array(3, 8))) {
            $graphicsRequestAssign = $this->_graphicsRequestAssignRepository->find($id);

            if ($graphicsRequestAssign) {
                $this->_em->remove($graphicsRequestAssign);

                $this->_em->flush();

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.'
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Graphics assignment not found.'
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

        return new JsonModel($response);
    }


}

