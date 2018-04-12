<?php
namespace Application\Controller;

use Application\Entity\RediActivity;
use Application\Entity\RediActivityToType;
use Application\Entity\RediActivityTypeToActivity;
use Zend\View\Model\JsonModel;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class ActivityController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $filter['type_id'] = (array)json_decode(trim($this->getRequest()->getQuery('type_id', '')), true);
        $filter['user_type_id'] = $this->getRequest()->getQuery('user_type_id', null);

        $filter['customer_id'] = (int)trim($this->getRequest()->getQuery('customer_id', 0));

        if($filter['customer_id']) {
            $data = $this->_activityRepo->searchWithPrice($filter);
        } else {
            $data = $this->_activityRepo->search($filter);
        }

        $totalCount = $this->_activityRepo->searchCount($filter);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'data' => $data
        );

        return new JsonModel($response);
    }

    public function create($data)
    {
        $typeId = (array)json_decode(trim(isset($data['type_id']) ? $data['type_id'] : ''), true);
        $userTypeId = (isset($data['user_type_id']) ? (int)trim($data['user_type_id']) : null);
        $name = trim(isset($data['name']) ? $data['name'] : '');
        $status = (int)trim(isset($data['status']) ? $data['status'] : 1);
        $billable = (int)trim(isset($data['billable']) ? $data['billable'] : 0);
        $descriptionRequired = ($typeId==2 && isset($data['description_required'])) ? (int)trim($data['description_required']) : null;

        if ($name && count($typeId) && (!in_array(2, $typeId) || $descriptionRequired!==null)) {
           $checkActivity = $this->_activityRepository->findOneBy(array('name' => $name));

            if (!$checkActivity) {
                $activity = new RediActivity();
                $activity->setName($name);
                $activity->setStatus($status);
                $activity->setBillable($billable);

                if($descriptionRequired!==null) {
                    $descriptionRequired = $descriptionRequired?1:0;
                    $activity->setDescriptionRequired($descriptionRequired);
                }

                if($userTypeId) {
                    $activity->setUserTypeId($userTypeId);
                }

                $this->_em->persist($activity);
                $this->_em->flush();

                $activityId = $activity->getId();

                foreach($typeId as $type) {
                    $activityType = new RediActivityToType();
                    $activityType->setActivityId($activityId);
                    $activityType->setTypeId($type);

                    $this->_em->persist($activityType);
                }

                $this->_em->flush();

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => array(
                        'activity_id' => $activityId
                    ),
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Activity name already exists.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(name, type_id, description_required (only for timesheet)).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        $typeId = (array)json_decode(trim(isset($data['type_id']) ? $data['type_id'] : ''), true);
        $userTypeId = (isset($data['user_type_id']) ? (int)trim($data['user_type_id']) : null);
        $name = isset($data['name']) ? trim($data['name']) : null;
        $status = isset($data['status']) ? (int)trim($data['status']) : null;
        $descriptionRequired = (isset($data['description_required'])) ? (int)trim($data['description_required']) : null;
        $billable = isset($data['billable']) ? (int)trim($data['billable']) : null;

        $activity = $this->_activityRepository->find($id);

        if($activity) {
            if ($typeId || $name) {
                if ($name) {
                    $checkActivity = $this->_activityRepository->findOneBy(array('name' => $name));

                    if(!$checkActivity) {
                        $activity->setName($name);
                    }
                }

                if($billable !== null) {
                    $activity->setBillable($billable);
                }

                if($status!==null) {
                    $activity->setStatus($status);
                }

                if($userTypeId) {
                    $activity->setUserTypeId($userTypeId);
                }

                if(count($typeId)) {
                    $existingActivityType = $typeId;
                } else {
                    $existingActivityTypeData = $this->_activityToTypeRepository->findBy(array('activityId' => $activity->getId()));

                    foreach($existingActivityTypeData as $row) {
                        $existingActivityType[] = $row->getTypeId();
                    }
                }

                if(in_array(2, $existingActivityType) && $descriptionRequired!==null) {
                    $descriptionRequired = $descriptionRequired?1:0;
                    $activity->setDescriptionRequired($descriptionRequired);
                } else if(!in_array(2, $existingActivityType)) {
                    $activity->setDescriptionRequired(null);
                }

                $this->_em->persist($activity);
                $this->_em->flush();

                if(count($typeId)) {
                    $existingActivityType = $this->_activityToTypeRepository->findBy(array('activityId' => $activity->getId()));

                    foreach ($existingActivityType as $type) {
                        $this->_em->remove($type);
                    }

                    $this->_em->flush();

                    foreach ($typeId as $type) {
                        $activityType = new RediActivityToType();
                        $activityType->setActivityId($activity->getId());
                        $activityType->setTypeId($type);

                        $this->_em->persist($activityType);
                    }

                    $this->_em->flush();
                }

                $response = array(
                    'status' => 1,
                    'message' => 'Activity updated successfully.'
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
                'message' => 'Activity not found.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

}
