<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;
use Zend\Memory\Value;

class TimeEntryRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediTimeEntry";
    private $_entityManager;

    public function __construct(EntityManager $entityManager) {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);

        $this->_entityManager = $entityManager;
    }

    public function search($offset = 0, $length = 10, $filter=array())
    {
        $projectDatePool = (empty($filter['get_single'])) ? $this->getPool($filter) : array();

        $filter['id'] = (array)(!empty($filter['id'])?$filter['id']:array());
        $filter['id'] = array_merge($filter['id'], $projectDatePool);

        if(!empty($filter['activity_id'])) {
            $activityDateFilter = $this->getFilterForActivity($filter);

            $filter['id'] = array_merge($filter['id'], $activityDateFilter);
        }

        $dql = "SELECT
                  a.id,
                  a.userId,
                  ut.id AS userTypeId, ut.typeName AS userTypeName,
                  u.username,
                  u.initials,
                  u.firstName,
                  u.lastName,
                  u.nickName,
                  u.minHour,
                  a.projectCampaignId,
                  ptc.projectId,
                  ptc.campaignId, c.campaignName,
                  a.spotId, s.spotName,
                  s.trtId, trt.runtime,
                  a.versionId, v.versionName,
                  a.activityId,
                  ac.name AS activityValue,
                  a.activityDescription,
                  atp.id AS activityTypeId,
                  atp.activityType,
                  cu.id AS customerId, cu.cardname AS customerName,
                  a.startDate, a.duration,
                  a.approvedBy, a.approvedAt,
                  a.notes, a.status, st.status as statusName
                FROM \Application\Entity\RediTimeEntry a
                LEFT JOIN \Application\Entity\RediSpot s
                  WITH a.spotId=s.id
                LEFT JOIN \Application\Entity\RediTrt trt
                  WITH trt.id = s.trtId
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                  WITH ptc.id=a.projectCampaignId
                LEFT JOIN \Application\Entity\RediProject p
                  WITH p.id=ptc.projectId
                LEFT JOIN \Application\Entity\RediCampaign c
                  WITH c.id=ptc.campaignId
                LEFT JOIN \Application\Entity\RediVersion v
                  WITH v.id=a.versionId
                LEFT JOIN \Application\Entity\RediStatus st
                  WITH a.status=st.id
                LEFT JOIN \Application\Entity\RediUser u
                    WITH u.id=a.userId
                LEFT JOIN \Application\Entity\RediUserType ut
                    WITH ut.id=u.typeId
                LEFT JOIN \Application\Entity\RediUserTypeTimeApprovalPermission tap
                    WITH u.typeId=tap.submittingUserTypeId
                LEFT JOIN \Application\Entity\RediActivity ac
                  WITH ac.id=a.activityId
                LEFT JOIN \Application\Entity\RediActivityType  atp
                    WITH ac.typeId=atp.id
                LEFT JOIN \Application\Entity\RediCustomer cu
                    WITH cu.id=ptc.customerId ";

        $dqlFilter = [];

        if (isset($filter['id']) && $filter['id']) {
            $dqlFilter[] = " a.id IN (" . implode(',', $filter['id']) . ") ";
        }

        if (isset($filter['user_id']) && $filter['user_id']) {
            $dqlFilter[] = " a.userId=:user_id ";
        }

        if (!empty($filter['exclude_user_time_entry'])) {
            $dqlFilter[] = " a.userId!=:current_user_id ";
        }

        if (isset($filter['user_type_id']) && count($filter['user_type_id'])) {
            $dqlFilter[] = " tap.submittingUserTypeId IN (" . implode(',', $filter['user_type_id']) . ") ";
        }

        if (isset($filter['status']) && $filter['status']) {
            $dqlFilter[] = " a.status=:status ";
        }

        if (isset($filter['start_date']) && $filter['start_date']) {
            $dqlFilter[] = " a.startDate>=:start_date ";

            $startDate = new \DateTime($filter['start_date']);
            $startDate = $startDate->format('Y-m-d 00:00:00');
        }

        if (isset($filter['end_date']) && $filter['end_date']) {
            $dqlFilter[] = " a.startDate<=:end_date ";

            $endDate = new \DateTime($filter['end_date']);
            $endDate = $endDate->format('Y-m-d 23:59:59');
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " .  implode(" AND ", $dqlFilter);
        }

        $dql .= " GROUP BY a.id
                ORDER BY a.startDate ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);

        if($length > 0) {
            $query->setMaxResults($length);
        }

        if (isset($filter['user_id']) && $filter['user_id']) {
            $query->setParameter('user_id', $filter['user_id']);
        }

        if (!empty($filter['exclude_user_time_entry'])) {
            $query->setParameter('current_user_id', $filter['current_user_id']);
        }

        if (isset($filter['status']) && $filter['status']) {
            $query->setParameter('status', $filter['status']);
        }

        if (isset($filter['start_date']) && $filter['start_date']) {
            $query->setParameter('start_date', $startDate);
        }

        if (isset($filter['end_date']) && $filter['end_date']) {
            $query->setParameter('end_date', $endDate);
        }

        $result = $query->getArrayResult();

        foreach($result as &$row) {
            $row['id'] = (int)$row['id'];
            $row['files'] = $this->getTimeEntryFiles($row['id']);

            if(empty($filter['project_id'])) {
                unset($row['customerId']);
                unset($row['customerName']);
            }
        }

        return $result;
    }

    public function searchCount($filter=array())
    {
        $projectDatePool = $this->getPool($filter);

        $filter['id'] = (array)(!empty($filter['id'])?$filter['id']:array());
        $filter['id'] = array_merge($filter['id'], $projectDatePool);

        if(!empty($filter['activity_id'])) {
            $activityDateFilter = $this->getFilterForActivity($filter);

            $filter['id'] = array_merge($filter['id'], $activityDateFilter);
        }

        $dql = "SELECT
                  COUNT(DISTINCT a.id) AS total_count
                FROM \Application\Entity\RediTimeEntry a
                LEFT JOIN \Application\Entity\RediUser u
                    WITH u.id=a.userId
                LEFT JOIN \Application\Entity\RediUserTypeTimeApprovalPermission tap
                    WITH u.typeId=tap.submittingUserTypeId
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                  WITH ptc.id=a.projectCampaignId";

        $dqlFilter = [];

        if (isset($filter['id']) && $filter['id']) {
            $dqlFilter[] = " a.id IN (" . implode(',', $filter['id']) . ") ";
        }

        if (isset($filter['user_id']) && $filter['user_id']) {
            $dqlFilter[] = " a.userId=:user_id ";
        }

        if (!empty($filter['exclude_user_time_entry'])) {
            $dqlFilter[] = " a.userId!=:current_user_id ";
        }

        if (isset($filter['user_type_id']) && count($filter['user_type_id'])) {
            $dqlFilter[] = " tap.submittingUserTypeId IN (" . implode(',', $filter['user_type_id']) . ") ";
        }

        if (isset($filter['status']) && $filter['status']) {
            $dqlFilter[] = " a.status=:status ";
        }

        if (isset($filter['start_date']) && $filter['start_date']) {
            $dqlFilter[] = " a.startDate>=:start_date ";

            $startDate = new \DateTime($filter['start_date']);
            $startDate = $startDate->format('Y-m-d 00:00:00');
        }

        if (isset($filter['end_date']) && $filter['end_date']) {
            $dqlFilter[] = " a.startDate<=:end_date ";

            $endDate = new \DateTime($filter['end_date']);
            $endDate = $endDate->format('Y-m-d 23:59:59');
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " .  implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['user_id']) && $filter['user_id']) {
            $query->setParameter('user_id', $filter['user_id']);
        }

        if (!empty($filter['exclude_user_time_entry'])) {
            $query->setParameter('current_user_id', $filter['current_user_id']);
        }

        if (isset($filter['status']) && $filter['status']) {
            $query->setParameter('status', $filter['status']);
        }

        if (isset($filter['start_date']) && $filter['start_date']) {
            $query->setParameter('start_date', $startDate);
        }

        if (isset($filter['end_date']) && $filter['end_date']) {
            $query->setParameter('end_date', $endDate);
        }

        $result = $query->getArrayResult();

        return (isset($result[0]['total_count'])?(int)$result[0]['total_count']:0);
    }

    public function getPool($filter=array())
    {
        $dql = "SELECT
                    id
                FROM redi_time_entry
                WHERE DATE(start_date) IN (SELECT
                  DISTINCT DATE(a.start_date) AS start_date
                FROM redi_time_entry a
                INNER JOIN redi_project_to_campaign ptc
                    ON ptc.id=a.project_campaign_id ";

        $dqlFilter = [];

        if (isset($filter['project_id']) && $filter['project_id'] !== null) {
            if($filter['project_id']) {
                $dqlFilter[] = " ptc.project_id=:project_id ";
            } else if($filter['project_id'] == 0) {
                $dqlFilter[] = " ptc.project_id IS NULL ";
            }
        }

        if (isset($filter['start_date']) && $filter['start_date']) {
            $dqlFilter[] = " a.startDate>=:start_date ";

            $startDate = new \DateTime($filter['start_date']);
            $startDate = $startDate->format('Y-m-d 00:00:00');
        }

        if (isset($filter['end_date']) && $filter['end_date']) {
            $dqlFilter[] = " a.startDate<=:end_date ";

            $endDate = new \DateTime($filter['end_date']);
            $endDate = $endDate->format('Y-m-d 23:59:59');
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " .  implode(" AND ", $dqlFilter);
        }

        $dql .= ")";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);

        if (isset($filter['project_id']) && $filter['project_id']) {
            $query->bindParam('project_id', $filter['project_id']);
        }

        if (isset($filter['start_date']) && $filter['start_date']) {
            $query->bindParam('start_date', $startDate);
        }

        if (isset($filter['end_date']) && $filter['end_date']) {
            $query->bindParam('end_date', $endDate);
        }

        $query->execute();
        $result = $query->fetchAll();

        return array_column($result, 'id');
    }

    public function searchUserTimeEntry($startDate, $endDate, $userId, $projectId = null)
    {
        $projectDatePool = $this->getPool(array('project_id' => $projectId));
        $filterCondition = array();
        $conditionString = "";

        if($projectId) {
            $projectDatePool[] = 0;
            $filterCondition[] = " p.id IN (" . implode(',', $projectDatePool) . ") ";
        }

        if(count($filterCondition)) {
            $conditionString = " AND " . implode(" AND ", $filterCondition);
        }

        $startDate = new \DateTime($startDate);
        $endDate = new \DateTime($endDate);

        $startDate = $startDate->format('Y-m-d 00:00:00');
        $endDate = $endDate->format('Y-m-d 23:59:59');

        $dql = "SELECT
                    a.id,
                    a.userId,
                    u.typeId AS userTypeId,
                    ut.typeName AS userTypeName,
                    a.projectCampaignId,
                    ptc.projectId,
                    ptc.campaignId,
                    c.campaignName,
                    cu.id AS customerId,
                    cu.cardname AS customerName,
                    a.spotId,
                    s.spotName,
                    s.trtId,
                    trt.runtime,
                    a.versionId,
                    v.versionName,
                    a.activityId,
                    ac.name AS activityValue,
                    a.activityDescription,
                    a.startDate,
                    a.duration,
                    a.notes,
                    a.status,
                    st.status as statusName
                FROM \Application\Entity\RediTimeEntry a
                LEFT JOIN \Application\Entity\RediSpot s
                  WITH a.spotId=s.id
                LEFT JOIN \Application\Entity\RediTrt trt
                  WITH trt.id = s.trtId
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                  WITH ptc.id=a.projectCampaignId
                LEFT JOIN \Application\Entity\RediProject p
                  WITH p.id=ptc.projectId
                LEFT JOIN \Application\Entity\RediCampaign c
                  WITH c.id=ptc.campaignId
                LEFT JOIN \Application\Entity\RediVersion v
                  WITH v.id=a.versionId
                LEFT JOIN \Application\Entity\RediStatus st
                  WITH a.status=st.id
                LEFT JOIN \Application\Entity\RediActivity ac
                  WITH ac.id=a.activityId
                LEFT JOIN \Application\Entity\RediActivityType  atp
                    WITH ac.typeId=atp.id
                LEFT JOIN \Application\Entity\RediCustomer cu
                    WITH cu.id=ptc.customerId
                LEFT JOIN \Application\Entity\RediUser u
                    WITH u.id=a.userId
                LEFT JOIN \Application\Entity\RediUserType ut
                    WITH ut.id=u.typeId
                WHERE
                  a.userId=:user_id
                AND a.startDate>=:start_date
                AND a.startDate<=:end_date
                " . $conditionString . "
                ORDER BY a.startDate ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_id', $userId);
        $query->setParameter('start_date', $startDate);
        $query->setParameter('end_date', $endDate);
        $result = $query->getArrayResult();


        foreach($result as &$row) {
            $row['id'] = (int)$row['id'];
            $row['files'] = $this->getTimeEntryFiles($row['id']);

            if(!$projectId) {
                unset($row['customerId']);
                unset($row['customerName']);
            }
        }

        return $result;
    }

    public function getById($id)
    {
        $dql = "SELECT
                a.id, a.userId,
                a.projectCampaignId,
                  ptc.projectId,
                  ptc.campaignId, c.campaignName,
                  a.spotId, s.spotName,
                  s.trtId, trt.runtime,
                  a.versionId, v.versionName,
                  a.activityId,
                  ac.name AS activityValue,
                  a.activityDescription,
                  atp.id AS activityTypeId,
                  atp.activityType,
                  a.startDate, a.duration,
                  a.notes, a.status, st.status as statusName
                FROM \Application\Entity\RediTimeEntry a
                LEFT JOIN \Application\Entity\RediSpot s
                  WITH a.spotId=s.id
                LEFT JOIN \Application\Entity\RediTrt trt
                  WITH trt.id = s.trtId
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                  WITH ptc.id=a.projectCampaignId
                LEFT JOIN \Application\Entity\RediProject p
                  WITH p.id=ptc.projectId
                LEFT JOIN \Application\Entity\RediCampaign c
                  WITH c.id=ptc.campaignId
                LEFT JOIN \Application\Entity\RediVersion v
                  WITH v.id=a.versionId
                LEFT JOIN \Application\Entity\RediActivity ac
                  WITH ac.id=a.activityId
                LEFT JOIN \Application\Entity\RediStatus st
                  WITH a.status=st.id
                LEFT JOIN \Application\Entity\RediActivityType  atp
                    WITH ac.typeId=atp.id
                WHERE a.id=:id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('id', $id);
        $query->setMaxResults(1);
        $result =  $query->getArrayResult();

        $response =  (isset($result[0])?$result[0]:null);

        return $response;
    }

    public function getUserTimeEntryOfADate($userId, $date)
    {
        $date = new \DateTime($date);

        $dql = "SELECT
                  a
                FROM \Application\Entity\RediTimeEntry a
                WHERE
                  a.userId=:user_id
                  AND a.startDate>=:date_start
                  AND a.startDate<=:date_end ";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_id', $userId);
//        $query->setParameter('date', $date);
        $query->setParameter('date_start', $date->format('Y-m-d 00:00:00'));
        $query->setParameter('date_end',   $date->format('Y-m-d 23:59:59'));
        $result =  $query->getArrayResult();

        return $result;
    }

    public function getTimeEntryFiles($timeEntryId)
    {
        $dql = "SELECT
                  a.fileName, a.description, a.duration
                FROM \Application\Entity\RediTimeEntryFile a
                WHERE
                  a.timeEntryId=:time_entry_id
                ORDER BY a.id ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('time_entry_id', $timeEntryId);
        $result =  $query->getArrayResult();

        return $result;
    }

    public function getFilterForActivity($filter)
    {
        $dql = "SELECT id
                FROM redi_time_entry a
                WHERE DATE(start_date) IN (SELECT
                  DATE(a.start_date)
                FROM redi_time_entry a
                WHERE
                  a.activity_id=:activity_id)
                AND ";

        $dqlFilter = [];

        if (isset($filter['id']) && $filter['id']) {
            $dqlFilter[] = " a.id=:id ";
        }

        if (isset($filter['user_id']) && $filter['user_id']) {
            $dqlFilter[] = " a.user_id=:user_id ";
        }

        if (isset($filter['status']) && $filter['status']) {
            $dqlFilter[] = " a.status=:status ";
        }

        if(count($dqlFilter)) {
            $dql .=  implode(" AND ", $dqlFilter);
        }


        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('activity_id', $filter['activity_id']);

        if (isset($filter['id']) && $filter['id']) {
            $query->bindParam('id', $filter['id']);
        }

        if (isset($filter['user_id']) && $filter['user_id']) {
            $query->bindParam('user_id', $filter['user_id']);
        }

        if (isset($filter['status']) && $filter['status']) {
            $query->bindParam('status', $filter['status']);
        }

        $query->execute();

        $result = $query->fetchAll();

        return array_column($result, 'id');
    }

    public function getTimeEntryPermissionList()
    {
        $dql = "SELECT
                  ut
                FROM \Application\Entity\RediUserTypeTimeEntryPermission a
                INNER JOIN \Application\Entity\RediUserType ut
                    WITH ut.id = a.userTypeId
                ORDER BY ut.typeName ";

        $query = $this->getEntityManager()->createQuery($dql);
        $result =  $query->getArrayResult();

        return $result;
    }

    public function getTimeApprovalPermissionList()
    {
        $dql = "SELECT
                  a.approverUserTypeId,
                  ut1.typeName AS approverUserTypeName,
                  a.submittingUserTypeId,
                  ut2.typeName AS submittingUserTypeName
                FROM \Application\Entity\RediUserTypeTimeApprovalPermission a
                INNER JOIN \Application\Entity\RediUserType ut1
                    WITH ut1.id = a.approverUserTypeId
                INNER JOIN \Application\Entity\RediUserType ut2
                    WITH ut2.id = a.submittingUserTypeId ";

        $query = $this->getEntityManager()->createQuery($dql);
        $result =  $query->getArrayResult();

        $data = array();

        foreach($result as $row) {
            if(empty($data[$row['approverUserTypeId']])) {
                $data[$row['approverUserTypeId']] = array(
                    'approverUserTypeId' => $row['approverUserTypeId'],
                    'approverUserTypeName' => $row['approverUserTypeName'],
                    'submittingUserType' => array(),
                );
            }

            $data[$row['approverUserTypeId']]['submittingUserType'][] = array(
                'submittingUserTypeId' => $row['submittingUserTypeId'],
                'submittingUserTypeName' => $row['submittingUserTypeName']
            );
        }

        return array_values($data);
    }

    public function deleteApproverTimeApprovalPermission($approverIds)
    {
        $dql = "DELETE
                FROM \Application\Entity\RediUserTypeTimeApprovalPermission a
                WHERE a.approverUserTypeId IN (:approver_user_type_id)
                ";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('approver_user_type_id', $approverIds);
        $query->execute();
    }

    public function deleteSubmitterTimeApprovalPermission($submitterId) {
        $dql = "
            DELETE
            FROM \Application\Entity\RediUserTypeTimeApprovalPermission a
            WHERE a.submittingUserTypeId = :submitter_user_type_id
        ";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('submitter_user_type_id', $submitterId);
        $query->execute();
    }

    public function truncateTimeEntryPermissionTable()
    {
        $dql = "TRUNCATE redi_user_type_time_entry_permission";
        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->execute();
    }

    /**
     * Get list of project (with campaign data and other related data)
     *
     * @param array $filter
     * @param integer $offset
     * @param integer $length
     * @return void
     */
    public function getTimeReviewProjectList($filter = array(), $offset = 0, $length = 10)
    {
        $pool = $this->getTimeReviewProjectPool($filter = array(), $offset = 0, $length = 10);

        // var_dump($pool); exit;
        $dql = sprintf(
                "SELECT 
                    te.project_campaign_id AS projectCampaignId,
                    ptc.project_id AS projectId,
                    p.project_name AS projectName,
                    ptc.campaign_id AS campaignId,
                    c.campaign_name AS campaignName,
                    p.studio_id AS studioId,
                    s.studio_name AS studioName,
                    a.type_id AS activityTypeId,
                    CONCAT(SUM(SUBSTRING_INDEX(te.duration, '.', 1)) + FLOOR(SUM(SUBSTRING_INDEX(te.duration, '.', - 1)) / 60),
                        '.',
                        SUM(SUBSTRING_INDEX(te.duration, '.', - 1)) %% 60) AS totalDuration
                FROM
                    redi_time_entry te
                        inner join
                    redi_activity a ON a.id = te.activity_id
                        INNER join
                    redi_project_to_campaign ptc ON ptc.id = te.project_campaign_id
                        INNER join
                    redi_project p ON p.id = ptc.project_id
                        left join
                    redi_studio s ON s.id = p.studio_id
                        left join
                    redi_campaign c ON c.id = ptc.campaign_id
                WHERE
                    a.type_id IN (1 , 2)
                        and te.status IN (1, 2, 3)
                        AND p.id IN (%s)
                GROUP BY p.id , ptc.campaign_id , a.type_id ",
            implode(',', $pool)
        );

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->execute();
        $result = $query->fetchAll();

        $data = array();

        foreach ($result as $row) {
            if (empty($data[$row['projectId']])) {
                $data[$row['projectId']] = array(
                    "projectId" => (int)$row['projectId'],
                    "projectName" => $row['projectName'],
                    "studioId" => (int)$row['studioId'],
                    "studioName" => $row['studioName'],
                    "totalDuration" => "0.00",
                );
            }

            $data[$row['projectId']]['campaign'][] = array(
                "campaignId" => (int)$row['campaignId'],
                "campaignName" => $row['campaignName'],
                "projectCampaignId" => (int)$row['projectCampaignId'],
                "activityTypeId" => $row['activityTypeId'],
                "totalDuration" => $row['totalDuration'],
            );

            $data[$row['projectId']]['totalDuration'] = $this->convertDurationAndSum($data[$row['projectId']]['totalDuration'], $row['totalDuration']);
        }

        return array_values($data);
    }

    public function getTimeReviewProjectPool($filter = array(), $offset = 0, $length = 10)
    {
        $dql = "SELECT 
                    p.id
                FROM
                    \Application\Entity\RediTimeEntry te
                INNER JOIN \Application\Entity\RediActivity a 
                    WITH a.id = te.activityId
                INNER JOIN \Application\Entity\RediProjectToCampaign ptc 
                    WITH ptc.id = te.projectCampaignId
                INNER JOIN \Application\Entity\RediProject p
                    WITH p.id = ptc.projectId
                WHERE
                    a.typeId IN (1 , 2)
                    AND te.status IN (1, 2, 3)
                GROUP BY p.id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);
        $query->execute();

        $data = $query->getArrayResult();

        return array_column($data, 'id');
    }

    /**
     * Get count of project for spot billing
     *
     * @return int Number of projects for spot billing
     */
    public function getTimeReviewProjectCount($filter = array())
    {
        $dql = "SELECT 
                    COUNT(DISTINCT p.id) AS total_count
                FROM
                    \Application\Entity\RediTimeEntry te
                INNER JOIN \Application\Entity\RediActivity a 
                    WITH a.id = te.activityId
                INNER JOIN \Application\Entity\RediProjectToCampaign ptc 
                    WITH ptc.id = te.projectCampaignId
                INNER JOIN \Application\Entity\RediProject p
                    WITH p.id = ptc.projectId
                WHERE
                    a.typeId IN (1 , 2)
                    AND te.status IN (1, 2, 3)";

        $query = $this->getEntityManager()->createQuery($dql);
        $result = $query->getArrayResult();

        return (int)(!empty($result[0]['total_count']) ? $result[0]['total_count'] : 0);
    }

    public function getTimeReviewDataByProject($projectId)
    {
        $commonRepo = new CommonRepository($this->_entityManager);

        $dql = "SELECT
                    te.id AS timeEntryId,
                    te.project_campaign_id AS projectCampaignId,
                    ptc.project_id AS projectId,
                    p.project_name AS projectName,
                    ptc.campaign_id AS campaignId,
                    c.campaign_name AS campaignName,
                    p.studio_id AS studioId,
                    s.studio_name AS studioName,
                    sp.id AS spotId,
                    sp.spot_name AS spotName,
                    v.id AS versionId,
                    v.version_name AS versionName,
                    a.type_id AS activityTypeId,
                    te.start_date AS startDate,
                    te.duration,
                    st.id AS statusId,
                    st.name AS statusName,
                    u.id AS userId,
                    u.first_name AS firstName,
                    u.last_name AS lastName
                FROM
                    redi_time_entry te
                        inner join
                    redi_activity a ON a.id = te.activity_id
                        inner join
                    redi_project_to_campaign ptc ON ptc.id = te.project_campaign_id
                        inner join
                    redi_project p ON p.id = ptc.project_id
                        left join
                    redi_studio s ON s.id = p.studio_id
                        inner join
                    redi_campaign c ON c.id = ptc.campaign_id
                        left join
                    redi_spot sp ON sp.id = te.spot_id
                        left join
                    redi_version v ON v.id = te.version_id
                        left join
                    redi_time_entry_status st ON st.id = te.status
                        LEFT JOIN
                    redi_user u ON u.id = te.user_id
                WHERE
                    a.type_id IN (1 , 2)
                        and te.status IN (1, 2, 3)
                        AND p.id = :project_id ";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('project_id', $projectId);
        $query->execute();
        $result = $query->fetchAll();

        $data = array();

        foreach ($result as $row) {
            if (empty($data[$row['campaignId']])) {
                $data[$row['campaignId']] = array(
                    "campaignId" => (int)$row['campaignId'],
                    "campaignName" => $row['campaignName'],
                    "projectCampaignId" => (int)$row['projectCampaignId'],
                    "totalDuration" => "0.00",
                );
            }

            $data[$row['campaignId']]['timeEntry'][] = array(
                "timeEntryId" => (int)$row['timeEntryId'],
                "activityTypeId" => (int)$row['activityTypeId'],
                "spotId" => (int)$row['spotId'],
                "spotName" => $row['spotName'],
                "versionId" => (int)$row['versionId'],
                "versionName" => $row['versionName'],
                "startDate" => $commonRepo->formatDateForInsert($row['startDate']),
                "duration" => $row['duration'],
                "statusId" => $row['statusId'],
                "statusName" => $row['statusName'],
                "userId" => (int)$row['userId'],
                "userName" => trim($row['firstName'] . ' ' . $row['lastName']),
            );

            $data[$row['campaignId']]['totalDuration'] = $this->convertDurationAndSum($data[$row['campaignId']]['totalDuration'], $row['duration']);
        }

        return array_values($data);
    }

    public function convertDurationToFloat($duration) {
        $split = explode('.', $duration);
        $value = 0.0;

        if (!empty($split[0])) {
            $value += (int)$split[0];
        }

        if (!empty($split[1])) {
            $value += (float)(((int)str_pad($split[1], 2, '0') * 100) / (60 * 100));
        }

        return $value;
    }

    public function convertFloatToDuration($floatVal) {
        $split = explode('.', $floatVal);
        $value = 0.0;

        if (!empty($split[0])) {
            $value += (int)$split[0];
        }

        if (!empty($split[1])) {
            $value += (float)(((int)str_pad($split[1], 2, '0') * 60) / (100 * 100));
        }

        return (string) number_format($value, 2);
    }

    public function convertDurationAndSum($value1, $value2) {
        $value1 = $this->convertDurationToFloat($value1);
        $value2 = $this->convertDurationToFloat($value2);

        $sum = $value1 + $value2;

        return $this->convertFloatToDuration($sum);
    }

    public function updateCalculatedTimeField($userId, $date) {
        $dql = "CALL `redi_calculate_user_time_enty`(:user_id, :date)";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('user_id', $userId);
        $query->bindParam('date', $date);
        $query->execute();
    }
}
