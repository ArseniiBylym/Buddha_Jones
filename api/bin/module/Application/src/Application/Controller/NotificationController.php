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

class NotificationController extends CustomAbstractActionController
{
    public function getList()
    {
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $filter['confirm'] = (int)trim($this->getRequest()->getQuery('confirm', 0));
        $filter['get_details'] = (int)trim($this->getRequest()->getQuery('get_details', 0));
        $filter['user_id'] = $this->_user_id;

        $searchResult = $this->_notificationRepo->search($filter, $offset, $length);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $searchResult['count'],
            'object_count' => count($searchResult['data']),
            'data' => $searchResult['data'],
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

    public function create($data)
    {
        $parentId = (int)trim(isset($data['parent_id']) ? $data['parent_id'] : '');
        $typeId = (int)trim(isset($data['type_id']) ? $data['type_id'] : '');
        $userId = (int)trim(isset($data['user_id']) ? $data['user_id'] : '');
        $commentString = trim(isset($data['comment']) ? $data['comment'] : '');

        if(!$userId) {
            $userId = $this->_user_id;
        }

        if ($parentId && $typeId && $commentString) {
            $createdAt = new \DateTime('now');

            $comment = new RediComment();
            $comment->setComment($commentString);
            $comment->setParentId($parentId);
            $comment->setTypeId($typeId);
            $comment->setCreatedAt($createdAt);
            $comment->setUserId($userId);
            $comment->setCommentRead(0);

            $this->_em->persist($comment);
            $this->_em->flush();

            $commentId = $comment->getId();

            $data = $this->_commentRepo->getById($commentId, $this->_siteUrl . 'thumb/profile_image/');
            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => $data
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data) {
        $parentId = (int)trim(isset($data['parent_id']) ? $data['parent_id'] : '');
        $typeId = (int)trim(isset($data['type_id']) ? $data['type_id'] : '');
        $userId = (int)trim(isset($data['user_id']) ? $data['user_id'] : '');
        $commentString = trim(isset($data['comment']) ? $data['comment'] : '');

        if(!$userId) {
            $userId = $this->_user_id;
        }

        if ($commentString) {
            $now = new \DateTime('now');

            $comment = $this->_commentRepository->find($id);

            if($comment) {
                if($comment->getUserId()==$userId) {
                    $createdAt = $comment->getCreatedAt();

                    $diff = $now->diff($createdAt);

                    if(!$diff->days && !$diff->y && !$diff->m && !$diff->d && !$diff->h && $diff->i<=5) {
                        $comment->setComment($commentString);

                        if ($parentId) {
                            $comment->setParentId($parentId);
                        }

                        if ($typeId) {
                            $comment->setTypeId($typeId);
                        }

                        $comment->setCreatedAt($now);
                        $comment->setUserId($userId);

                        $this->_em->persist($comment);
                        $this->_em->flush();

                        $commentId = $comment->getId();

                        $data = $this->_commentRepo->getById($commentId, $this->_siteUrl . 'thumb/profile_image/');
                        $response = array(
                            'status' => 1,
                            'message' => 'Request successful.',
                            'data' => $data
                        );
                    }else {
                        $response = array(
                            'status' => 0,
                            'message' => 'Can not update comment. Comment update only allowed in 5 min of creation.'
                        );
                    }
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Comment does not belong to the user.'
                    );
                }
            }else {
                $response = array(
                    'status' => 0,
                    'message' => 'Comment not found.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

}
