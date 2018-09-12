<?php

namespace Application\Controller;

use Application\Entity\RediTimeEntry;
use Application\Entity\RediTimeEntryFile;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class TimeEntryController extends CustomAbstractActionController
{
    public function getList()
    {
        $allTimeEntryPermission = $this->_usersRepo->getUserTimeEntryAccess($this->_user_type_id);
        $canApproveTimeEntryOfUser = $this->_usersRepo->getUserToApproveTimeEntry($this->_user_type_id);

        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));
        $filter['user_id'] = (int)trim($this->getRequest()->getQuery('user_id', 0));
        $filter['start_date'] = trim($this->getRequest()->getQuery('start_date', null));
        $filter['end_date'] = trim($this->getRequest()->getQuery('end_date', null));
        $filter['status'] = (int)trim($this->getRequest()->getQuery('status', 0));
        $filter['project_id'] = trim($this->getRequest()->getQuery('project_id', null));
        $filter['exclude_user_time_entry'] = (bool)($this->getRequest()->getQuery('exclude_user_time_entry', 0));
        $filter['current_user_id'] = $this->_user_id;

        if ($filter['project_id'] === "" || $filter['project_id'] === 'null') {
            $filter['project_id'] = null;
        }

        if (!$allTimeEntryPermission) {
            if (count($canApproveTimeEntryOfUser)) {
                $filter['user_type_id'] = $canApproveTimeEntryOfUser;
            } else {
                $filter['user_id'] = $this->_user_id;
            }
        }

        if ($filter['start_date']) {
            $filter['start_date'] = new \DateTime($filter['start_date']);
            $filter['start_date'] = $filter['start_date']->format('Y-m-d');
        }

        if ($filter['end_date']) {
            $filter['end_date'] = new \DateTime($filter['end_date']);
            $filter['end_date'] = $filter['end_date']->format('Y-m-d');
        }

        $data = $this->_timeEntryRepo->search($offset, $length, $filter);
        $totalCount = $this->_timeEntryRepo->searchCount($filter);

        foreach ($data as &$row) {
            // set project name
            $projectName = $this->_projectRepo->getProjectName($row['projectId'], $this->_user_type_id, true);
            $row = array_merge($row, $projectName);
        }

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data
        );


        return new JsonModel($response);
    }

    public function get($id)
    {
        $data = $this->getSingleData($id);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data,
        );

        return new JsonModel($response);
    }

    public function create($data)
    {
        $workerId = (int)trim(isset($data['worker_id']) ? $data['worker_id'] : $this->_user_id);
        $projectCampaignId = (int)trim(isset($data['project_campaign_id']) ? $data['project_campaign_id'] : 0);
        $spotId = (int)trim(isset($data['spot_id']) ? $data['spot_id'] : 0);
        $versionId = (int)trim(isset($data['version_id']) ? $data['version_id'] : 0);
        $startDateTime = trim(isset($data['start_date_time']) ? $data['start_date_time'] : '');
        $duration = trim(isset($data['duration']) ? $data['duration'] : '');
        $activityId = trim(isset($data['activity_id']) ? $data['activity_id'] : '');
        $activityDescription = isset($data['activity_description']) ? trim($data['activity_description']) : null;
        $notes = isset($data['notes']) ? trim($data['notes']) : null;
        $nonBillable = (int)(isset($data['non_billable']) && strtolower(trim($data['non_billable'])) == 'true') ? 1 : 0;
        $files = (array)json_decode(trim(isset($data['files']) ? $data['files'] : ''), true);

        if ($workerId && $startDateTime && $duration) {
            $startDateTime = new \DateTime($startDateTime);

            $timeEntry = new RediTimeEntry();
            $timeEntry->setUserId($workerId);

            if ($projectCampaignId) {
                $timeEntry->setProjectCampaignId($projectCampaignId);
            }

            if ($spotId) {
                $timeEntry->setSpotId($spotId);
            }

            if ($versionId) {
                $timeEntry->setVersionId($versionId);
            }

            $timeEntry->setStartDate($startDateTime);
            $timeEntry->setDuration($duration);
            $timeEntry->setActivityId($activityId);

            $timeEntry->setActivityDescription($activityDescription);
            $timeEntry->setNotes($notes);
            $timeEntry->setNonBillable($nonBillable);

            $timeEntry->setCreatedBy($this->_user_id);
            $timeEntry->setCreatedAt(new \DateTime('now'));
            $timeEntry->setStatus(1);

            $this->_em->persist($timeEntry);
            $this->_em->flush();

            $timeEntryId = $timeEntry->getId();


            // if file details are sent enter that in redi_time_entry_file table
            if (count($files)) {
                foreach ($files as $file) {
                    if (!empty($file['filename'])) {
                        // if duration is not provided then default duration is 1
                        $duration = (!empty($file['duration']) && (float)$file['duration']) ? (float)$file['duration'] : 1;

                        $timeEntryFile = new RediTimeEntryFile();
                        $timeEntryFile->setTimeEntryId($timeEntryId);
                        $timeEntryFile->setFileName($file['filename']);
                        $timeEntryFile->setDuration($duration);

                        if (!empty($file['description'])) {
                            $timeEntryFile->setDescription($file['description']);
                        }

                        $this->_em->persist($timeEntryFile);
                    }
                }

                $this->_em->flush();
            }

            $data = $this->getSingleData($timeEntryId);

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => $data,
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

    public function update($id, $data)
    {
        $allTimeEntryPermission = $this->_usersRepo->getUserTimeEntryAccess($this->_user_type_id);
        $canApproveTimeEntryOfUser = $this->_usersRepo->getUserToApproveTimeEntry($this->_user_type_id);

        $projectCampaignId = isset($data['project_campaign_id']) ? (int)$data['project_campaign_id'] : null;
        $spotId = isset($data['spot_id']) ? (int)$data['spot_id'] : null;
        $versionId = isset($data['version_id']) ? (int)$data['version_id'] : null;
        $startDateTime = isset($data['start_date_time']) ? trim($data['start_date_time']) : null;
        $duration = isset($data['duration']) ? (float)$data['duration'] : null;
        $activityId = isset($data['activity_id']) ? (int)$data['activity_id'] : null;
        $status = isset($data['status']) ? (int)$data['status'] : null;

        $activityDescription = isset($data['activity_description']) ? trim($data['activity_description']) : null;
        $notes = isset($data['notes']) ? trim($data['notes']) : null;
        $nonBillable = (isset($data['non_billable'])) ? ((strtolower(trim($data['non_billable'])) == 'true') ? 1 : 0) : null;
        $files = (array)json_decode(trim(isset($data['files']) ? $data['files'] : ''), true);

        if ($id) {
            $timeEntry = $this->_timeEntryRepository->find($id);

            if ($timeEntry) {
                $timeEntryUserType = $this->_userRepository->find($timeEntry->getUserId());

                if ($allTimeEntryPermission || ($timeEntryUserType && in_array($timeEntryUserType->getTypeId(), $canApproveTimeEntryOfUser)) ||
                    $timeEntry->getUserId() == $this->_user_id ||
                    $timeEntry->getCreatedBy() == $this->_user_id) {

                        if ($projectCampaignId !== null) {
                            $timeEntry->setProjectCampaignId($projectCampaignId);
                        }

                        if ($spotId !== null) {
                            $timeEntry->setSpotId($spotId);
                        }

                        if ($versionId !== null) {
                            $timeEntry->setVersionId($versionId);
                        }

                        if ($startDateTime !== null) {
                            $startDateTime = new \DateTime($startDateTime);
                            $timeEntry->setStartDate($startDateTime);
                        }

                        if ($duration !== null) {
                            $timeEntry->setDuration($duration);
                        }

                        if ($activityId !== null) {
                            $timeEntry->setActivityId($activityId);
                        }

                        if ($activityDescription !== null) {
                            $timeEntry->setActivityDescription($activityDescription);
                        }

                        if ($notes !== null) {
                            $timeEntry->setNotes($notes);
                        }

                        if ($nonBillable !== null) {
                            $timeEntry->setNonBillable($nonBillable);
                        }

                        if (($allTimeEntryPermission || ($timeEntryUserType && in_array($timeEntryUserType->getTypeId(), $canApproveTimeEntryOfUser))) &&
                            $status == 4) {
                            $timeEntry->setStatus($status);
                            $timeEntry->setApprovedBy($this->_user_id);
                            $timeEntry->setApprovedAt(new \DateTime('now'));
                        }

                        $this->_em->persist($timeEntry);
                        $this->_em->flush();

                        $timeEntryId = $timeEntry->getId();

                        // if file informations are sent then
                        // remove previous entry
                        // and add new entry
                        if (count($files)) {
                            // delete existing
                            $existingTimeEntryFiles = $this->_timeEntryFileRepository->findBy(array('timeEntryId' => $timeEntryId));

                            foreach ($existingTimeEntryFiles as $existingTimeEntryFile) {
                                $this->_em->remove($existingTimeEntryFile);
                            }

                            $this->_em->flush();

                            //add new ones
                            foreach ($files as $file) {
                                if (!empty($file['filename'])) {
                                    $timeEntryFile = new RediTimeEntryFile();
                                    $timeEntryFile->setTimeEntryId($timeEntryId);
                                    $timeEntryFile->setFileName($file['filename']);

                                    if (!empty($file['description'])) {
                                        $timeEntryFile->setDescription($file['description']);
                                    }

                                    if (!empty($file['duration'])) {
                                        $timeEntryFile->setDuration($file['duration']);
                                    }

                                    $this->_em->persist($timeEntryFile);
                                }
                            }

                            $this->_em->flush();
                        }

                        $data = $this->getSingleData($id);

                        $response = array(
                            'status' => 1,
                            'message' => 'Request successful.',
                            'data' => $data
                        );

                    } else {
                        $response = array(
                            'status' => 0,
                            'message' => 'Access denied.'
                        );
                    }
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Time entry does not exist.'
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

        public function delete($id)
        {
            $allTimeEntryPermission = $this->_usersRepo->getUserTimeEntryAccess($this->_user_type_id);
            $canApproveTimeEntryOfUser = $this->_usersRepo->getUserToApproveTimeEntry($this->_user_type_id);

            if ($id) {
                $timeEntry = $this->_timeEntryRepository->find($id);

                if ($timeEntry) {
                    $timeEntryUserType = $this->_userRepository->find($timeEntry->getUserId());

                    if ($allTimeEntryPermission
                        || $timeEntry->getUserId() == $this->_user_id
                        || $timeEntry->getCreatedBy() == $this->_user_id
                        || ($timeEntryUserType && in_array($timeEntryUserType->getTypeId(), $canApproveTimeEntryOfUser))) {

                        if (in_array($timeEntry->getStatus(), array(1, 3))) {
                            $this->_em->remove($timeEntry);

                        // delete existing
                            $existingTimeEntryFiles = $this->_timeEntryFileRepository->findBy(array('timeEntryId' => $id));

                            foreach ($existingTimeEntryFiles as $existingTimeEntryFile) {
                                $this->_em->remove($existingTimeEntryFile);
                            }

                            $this->_em->flush();

                            $response = array(
                                'status' => 1,
                                'message' => 'Request successful.',
                            );
                        } else {
                            $response = array(
                                'status' => 0,
                                'message' => 'Time entry can not be deleted now. Status not in draft or pending'
                            );
                        }
                    } else {
                        $response = array(
                            'status' => 0,
                            'message' => 'Time entry can not be deleted. Permission denied.'
                        );
                    }
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Time entry does not exist.'
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

        private function getSingleData($id)
        {
            $allTimeEntryPermission = $this->_usersRepo->getUserTimeEntryAccess($this->_user_type_id);
            $canApproveTimeEntryOfUser = $this->_usersRepo->getUserToApproveTimeEntry($this->_user_type_id);

            $filter = array(
                'id' => $id,
                'get_details' => true,
                'get_single' => true,
            );

            if (!$allTimeEntryPermission) {
                if (count($canApproveTimeEntryOfUser)) {
                    $filter['user_type_id'] = $canApproveTimeEntryOfUser;
                } else {
                    $filter['user_id'] = $this->_user_id;
                }
            }

            $data = $this->_timeEntryRepo->search(0, 1, $filter);
            $data = count($data) ? $data[0] : array();

            if ($data) {
            // set project name
                $projectName = $this->_projectRepo->getProjectName($data['projectId'], $this->_user_type_id, true);
                $data = array_merge($data, $projectName);
            }

            return $data;
        }
    }
