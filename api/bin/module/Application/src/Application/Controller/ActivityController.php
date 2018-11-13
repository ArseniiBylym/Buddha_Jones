<?php
namespace Application\Controller;

use Application\Entity\RediActivity;
use Application\Entity\RediActivityToUserType;
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
        $filter['user_type_id'] = (array)json_decode(trim($this->getRequest()->getQuery('user_type_id', '')), true);
        $filter['customer_id'] = (int)trim($this->getRequest()->getQuery('customer_id', 0));
        $filter['project_campaign_required'] = trim($this->getRequest()->getQuery('project_campaign_required', null));
        $filter['project_campaign_spot_version_required'] = trim($this->getRequest()->getQuery('project_campaign_spot_version_required', null));
        $filter['allowed_in_future'] = trim($this->getRequest()->getQuery('allowed_in_future', null));

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
            'object_count' => count($data),
            'data' => $data
        );

        return new JsonModel($response);
    }

    public function create($data)
    {
        $typeId = (array)json_decode(trim(isset($data['type_id']) ? $data['type_id'] : ''), true);
        $userTypeId = (array)json_decode(trim(isset($data['user_type_id']) ? $data['user_type_id'] : ''), true);
        $name = trim(isset($data['name']) ? $data['name'] : '');
        $status = (int)trim(isset($data['status']) ? $data['status'] : 1);
        $billable = (int)trim(isset($data['billable']) ? $data['billable'] : 0);
        $descriptionRequired = (int)isset($data['description_required']) ? trim($data['description_required']) : 0;
        $projectCampaignRequired = (int)isset($data['project_campaign_required']) ? trim($data['project_campaign_required']) : 0;
        $projectCampaignSpotVersionRequired = (int)isset($data['project_campaign_spot_version_required']) ? trim($data['project_campaign_spot_version_required']) : 0;
        $filesIncluded = (int)isset($data['files_included']) ? trim($data['files_included']) : 0;
        $allowedInFuture = (int)isset($data['allowed_in_future']) ? trim($data['allowed_in_future']) : 0;

        if ($name && count($typeId) && (!in_array(2, $typeId) || $descriptionRequired!==null)) {
            $checkActivity = $this->_activityRepository->findOneBy(array('name' => $name));

            if (!$checkActivity) {
                $activity = new RediActivity();
                $activity->setName($name);
                $activity->setTypeId($type[0]);
                $activity->setStatus($status);
                $activity->setBillable($billable);
                $activity->setDescriptionRequired($descriptionRequired);
                $activity->setProjectCampaignRequired($projectCampaignRequired);
                $activity->setProjectCampaignSpotVersionRequired($projectCampaignSpotVersionRequired);
                $activity->setFilesIncluded($filesIncluded);
                $activity->setAllowedInFuture($allowedInFuture);

                $this->_em->persist($activity);
                $this->_em->flush();

                $activityId = $activity->getId();

                foreach($userTypeId as $userType) {
                    $activityUserType = new RediActivityToUserType();
                    $activityUserType->setActivityId($activityId);
                    $activityUserType->setUserTypeId($userType);

                    $this->_em->persist($activityUserType);
                }

                $this->_em->flush();

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $this->_activityRepo->getActivityByActivityId($activityId),
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
        $userTypeId = (array)json_decode(trim(isset($data['user_type_id']) ? $data['user_type_id'] : ''), true);
        $name = isset($data['name']) ? trim($data['name']) : null;
        $status = isset($data['status']) ? (int)trim($data['status']) : null;
        $descriptionRequired = (isset($data['description_required'])) ? (int)trim($data['description_required']) : null;
        $billable = isset($data['billable']) ? (int)trim($data['billable']) : null;
        $projectCampaignRequired = isset($data['project_campaign_required']) ? (int)trim($data['project_campaign_required']) : null;
        $projectCampaignSpotVersionRequired = isset($data['project_campaign_spot_version_required']) ? (int)trim($data['project_campaign_spot_version_required']) : null;
        $filesIncluded = isset($data['files_included']) ? (int)trim($data['files_included']) : null;
        $allowedInFuture = isset($data['allowed_in_future']) ? trim($data['allowed_in_future']) : null;

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

                if($projectCampaignRequired !== null) {
                    $activity->setProjectCampaignRequired($projectCampaignRequired);
                }

                if($projectCampaignSpotVersionRequired !== null) {
                    $activity->setProjectCampaignSpotVersionRequired($projectCampaignSpotVersionRequired);
                }

                if($filesIncluded !== null) {
                    $activity->setFilesIncluded($filesIncluded);
                }

                if(count($typeId)) {
                    $activity->setTypeId($typeId[0]);
                }

                if ($descriptionRequired !== null) {
                    $descriptionRequired = $descriptionRequired? 1 : 0;
                    $activity->setDescriptionRequired($descriptionRequired);
                }

                if($allowedInFuture !== null) {
                    $activity->setAllowedInFuture($allowedInFuture);
                }

                $this->_em->persist($activity);
                $this->_em->flush();

                if(count($userTypeId)) {
                    $existingUserType = $this->_activityToUserTypeRepository->findBy(array('activityId' => $activity->getId()));

                    foreach ($existingUserType as $userType) {
                        $this->_em->remove($userType);
                    }

                    $this->_em->flush();

                    foreach ($userTypeId as $userType) {
                        $activityUserType = new RediActivityToUserType();
                        $activityUserType->setActivityId($activity->getId());
                        $activityUserType->setUserTypeId($userType);

                        $this->_em->persist($activityUserType);
                    }

                    $this->_em->flush();
                }

                $response = array(
                    'status' => 1,
                    'message' => 'Activity updated successfully.',
                    'data' => $this->_activityRepo->getActivityByActivityId($id)
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

    private function getSingle($id) {
        $filter['customer_id'] = (int)trim($this->getRequest()->getQuery('customer_id', 0));
        $filter['id'] = (int)trim($this->getRequest()->getQuery('id', 0));

        if($filter['customer_id']) {
            $data = $this->_activityRepo->searchWithPrice($filter);
        } else {
            $data = $this->_activityRepo->search($filter);
        }

        return $data;
    }
}
