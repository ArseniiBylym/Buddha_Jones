<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;

// before called Table now Repository Table Data Gateway
// In Bug Entity add  @Entity(repositoryClass="BugRepository")
// To be able to use this query logic through
// $this->getEntityManager()->getRepository('Bug') we have to adjust the metadata slightly.
// http://stackoverflow.com/questions/10481916/the-method-name-must-start-with-either-findby-or-findoneby-uncaught-exception

class ActivityRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediActivity";
    private $_config;

    public function __construct(EntityManager $entityManager)
    {
        $this->_config = new \Zend\Config\Config(include getcwd() . '/config/autoload/global.php');

        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);
    }

    public function search($filter)
    {
        $dql = "SELECT a.id, a.name, a.descriptionRequired, a.billable,
                    a.projectCampaignRequired, a.projectCampaignSpotVersionRequired,
                    a.filesIncluded, a.status, a.allowedInFuture
                FROM \Application\Entity\RediActivity a
                LEFT JOIN \Application\Entity\RediActivityToUserType atut
                  WITH atut.activityId=a.id
                LEFT JOIN \Application\Entity\RediActivityType at
                  WITH at.id=a.typeId ";

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {
            $dqlFilter[] = " (a.name LIKE :search) ";
        }

        if (isset($filter['type_id']) && count($filter['type_id'])) {
            $dqlFilter[] = " (a.typeId IN (" . implode(',', $filter['type_id']) . ")) ";
        }

        if (isset($filter['user_type_id']) && $filter['user_type_id']) {
            $dqlFilter[] = " (atut.userTypeId IN (" . implode(',', $filter['user_type_id']) . ") OR atut.userTypeId IS NULL) ";
        }

        if (isset($filter['project_campaign_required']) && $filter['project_campaign_required'] != null) {
            $dqlFilter[] = " (a.projectCampaignRequired = :project_campaign_required) ";
        }

        if (isset($filter['project_campaign_spot_version_required']) && $filter['project_campaign_spot_version_required'] != null) {
            $dqlFilter[] = " (a.projectCampaignSpotVersionRequired = :project_campaign_spot_version_required) ";
        }

        if (!empty($filter['allowed_in_future'])) {
            $dqlFilter[] = " (a.allowedInFuture = :allowed_in_future) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " GROUP BY a.id
                ORDER BY a.name ASC, at.activityType ASC ";

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['project_campaign_required']) && $filter['project_campaign_required'] != null) {
            $query->setParameter('project_campaign_required', $filter['project_campaign_required']);
        }

        if (isset($filter['project_campaign_spot_version_required']) && $filter['project_campaign_spot_version_required'] != null) {
            $query->setParameter('project_campaign_spot_version_required', $filter['project_campaign_spot_version_required']);
        }

        if (!empty($filter['allowed_in_future'])) {
            $query->setParameter('allowed_in_future', $filter['allowed_in_future']);
        }

        $data = $query->getArrayResult();

        foreach($data as &$row) {
            $row['type'] = $this->getActivityTypeByActivityId($row['id']);
            $row['userType'] = $this->getUserTypeByActivityId($row['id']);
        }

        return $data;
    }

    public function searchWithPrice($filter)
    {
        $dql = "SELECT a.id, a.name, a.descriptionRequired, a.billable,
                    a.projectCampaignRequired, a.projectCampaignSpotVersionRequired,
                    a.filesIncluded, a.status, a.allowedInFuture, cp.price
                FROM \Application\Entity\RediActivity a
                LEFT JOIN \Application\Entity\RediActivityType at
                  WITH at.id=a.typeId
                LEFT JOIN \Application\Entity\RediActivityToUserType atut
                  WITH atut.activityId=a.id
                LEFT JOIN \Application\Entity\RediCustomerPrice cp
                  WITH cp.activityId=a.id AND cp.customerId=:customer_id ";

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {
            $dqlFilter[] = " (a.name LIKE :search) ";
        }

        if (isset($filter['type_id']) && count($filter['type_id'])) {
            $dqlFilter[] = " (a.typeId IN (" . implode(',', $filter['type_id']) . ")) ";
        }

        if (isset($filter['user_type_id']) && $filter['user_type_id']) {
            $dqlFilter[] = " (atut.userTypeId IN (" . implode(',', $filter['type_id']) . ") OR atut.userTypeId IS NULL) ";
        }

        if (isset($filter['project_campaign_required']) && $filter['project_campaign_required'] != null) {
            $dqlFilter[] = " (a.projectCampaignRequired = :project_campaign_required) ";
        }

        if (isset($filter['project_campaign_spot_version_required']) && $filter['project_campaign_spot_version_required'] != null) {
            $dqlFilter[] = " (a.projectCampaignSpotVersionRequired = :project_campaign_spot_version_required) ";
        }

        if (!empty($filter['allowed_in_future'])) {
            $dqlFilter[] = " (a.allowedInFuture = :allowed_in_future) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " GROUP BY a.id
                 ORDER BY a.name ASC, at.activityType ASC ";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('customer_id', $filter['customer_id']);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['project_campaign_required']) && $filter['project_campaign_required'] != null) {
            $query->setParameter('project_campaign_required', $filter['project_campaign_required']);
        }

        if (isset($filter['project_campaign_spot_version_required']) && $filter['project_campaign_spot_version_required'] != null) {
            $query->setParameter('project_campaign_spot_version_required', $filter['project_campaign_spot_version_required']);
        }

        if (!empty($filter['allowed_in_future'])) {
            $query->setParameter('allowed_in_future', $filter['allowed_in_future']);
        }

        $data = $query->getArrayResult();

        foreach($data as &$row) {
            $row['type'] = $this->getActivityTypeByActivityId($row['id']);
            $row['userType'] = $this->getUserTypeByActivityId($row['id']);
        }

        return $data;
    }

    public function searchCount($filter)
    {
        $dql = "SELECT COUNT(DISTINCT a.id) AS total_count
                FROM \Application\Entity\RediActivity a
                LEFT JOIN \Application\Entity\RediActivityToUserType atut
                  WITH atut.activityId=a.id";

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {
            $dqlFilter[] = " (a.name LIKE :search) ";
        }

        if (isset($filter['type_id']) && count($filter['type_id'])) {
            $dqlFilter[] = " (a.typeId IN (" . implode(',', $filter['type_id']) . ")) ";
        }

        if (isset($filter['user_type_id']) && $filter['user_type_id']) {
            $dqlFilter[] = " (atut.userTypeId IN (" . implode(',', $filter['user_type_id']) . ") OR atut.userTypeId IS NULL) ";
        }

        if (isset($filter['project_campaign_required']) && $filter['project_campaign_required'] != null) {
            $dqlFilter[] = " (a.projectCampaignRequired = :project_campaign_required) ";
        }

        if (isset($filter['project_campaign_spot_version_required']) && $filter['project_campaign_spot_version_required'] != null) {
            $dqlFilter[] = " (a.projectCampaignSpotVersionRequired = :project_campaign_spot_version_required) ";
        }

        if (!empty($filter['allowed_in_future'])) {
            $dqlFilter[] = " (a.allowedInFuture = :allowed_in_future) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['project_campaign_required']) && $filter['project_campaign_required'] != null) {
            $query->setParameter('project_campaign_required', $filter['project_campaign_required']);
        }

        if (isset($filter['project_campaign_spot_version_required']) && $filter['project_campaign_spot_version_required'] != null) {
            $query->setParameter('project_campaign_spot_version_required', $filter['project_campaign_spot_version_required']);
        }

        if (!empty($filter['allowed_in_future'])) {
            $query->setParameter('allowed_in_future', $filter['allowed_in_future']);
        }

        $result = $query->getArrayResult();

        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }

    public function getActivityByActivityId($activityId)
    {
        $dql = "SELECT a.id, a.name, a.descriptionRequired, a.billable,
                a.projectCampaignRequired, a.projectCampaignSpotVersionRequired,
                a.filesIncluded, a.status, a.allowedInFuture
            FROM \Application\Entity\RediActivity a
            LEFT JOIN \Application\Entity\RediActivityToUserType atut
            WITH atut.activityId=a.id
            LEFT JOIN \Application\Entity\RediActivityType at
            WITH at.id=a.typeId ";
        $dql .= " WHERE a.id = :activity_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('activity_id', $activityId);
        $query->setMaxResults(1);
        $data = $query->getArrayResult();

        if(isset($data[0])) {
            $response = $data[0];
            $response['type'] = $this->getActivityTypeByActivityId($activityId);
            $response['userType'] = $this->getUserTypeByActivityId($activityId);
        } else {
            $response = null;
        }

        return $response;
    }

    public function getById($activityId)
    {
        $dql = "SELECT a
            FROM \Application\Entity\RediActivity a
            WHERE a.id = :activity_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('activity_id', $activityId);
        $query->setMaxResults(1);
        $data = $query->getArrayResult();

        return (!empty($data[0]) ? $data[0] : null);
    }

    public function getAllActivityType()
    {
        $dql = "SELECT a
                FROM \Application\Entity\RediActivityType a
                ORDER BY a.id ASC";

        $query = $this->getEntityManager()->createQuery($dql);

        return $query->getArrayResult();
    }

    public function getActivityTypeByActivityId($activityId) {
        $dql = "SELECT at
                FROM \Application\Entity\RediActivity a
                INNER JOIN \Application\Entity\RediActivityType at
                  WITH at.id=a.typeId
                WHERE a.id=:activity_id
                GROUP BY at.id
                ORDER BY at.activityType ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('activity_id', $activityId);

        return $query->getArrayResult();
    }

    public function getUserTypeByActivityId($activityId) {
        $dql = "SELECT ut
                FROM \Application\Entity\RediActivityToUserType atut
                INNER JOIN \Application\Entity\RediUserType ut
                  WITH ut.id=atut.userTypeId
                WHERE atut.activityId=:activity_id
                GROUP BY ut.id
                ORDER BY ut.id ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('activity_id', $activityId);

        return $query->getArrayResult();
    }

    public function populateStudioRatecardByActivity($activityId) {
        $dql = "INSERT INTO 
                redi_studio_ratecard
                (ratecard_id, activity_id, trt_id, revision_inc, note, type, rate)
                (SELECT ratecard_id, :activity_id, null, null, null, 'H', null FROM redi_ratecard_type)";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('activity_id', $activityId);
        $query->execute();
    }

    public function populateStudioRatecardByRatecard($ratecardId) {
        $typeId = 1;

        $dql = "INSERT INTO 
                redi_studio_ratecard
                (ratecard_id, activity_id, trt_id, revision_inc, note, type, rate)
                (SELECT :ratecard_id, id, null, null, null, 'H', null FROM redi_activity WHERE type_id = :type_id)";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('ratecard_id', $ratecardId);
        $query->bindParam('type_id', $typeId);
        $query->execute();
    }

    public function cleanStudioRatecard() {
        $dql = "DELETE FROM 
                redi_studio_ratecard
                WHERE activity_id NOT IN (SELECT id FROM redi_activity)
                OR ratecard_id NOT IN (SELECT ratecard_id FROM redi_ratecard_type)";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->execute();
    }

    public function getRatecardType($studioId)
    {
        $fileUrl = $this->_config['site_url'] . $this->_config['file_path_suffix']['ratecard'];

        $dql = "SELECT 
                    rct
                FROM \Application\Entity\RediRatecardType rct
                WHERE rct.studioId = :studio_id
                ORDER BY rct.ratecardName";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('studio_id', $studioId);
        $data = $query->getArrayResult();

        $data = array_map(function ($rc) use ($fileUrl) {
            $rc['ratecardId'] = (int)$rc['ratecardId'];
            $rc['studioId'] = (int)$rc['studioId'];
            $rc['file'] = (!empty($rc['file'])) ? $fileUrl . $rc['file'] : null;

            return $rc;
        }, $data);

        return $data;
    }

    public function searchStudioRatecardType($ratecardId)
    {
        $dql = "SELECT 
                  src.id,
                  src.ratecardId,
                  a.id AS activityId,
                  a.name AS activityName,
                  a.typeId AS activityTypeId,
                  aty.activityType,
                  trt.id AS trtId,
                  trt.runtime AS runtime,
                  src.revisionInc,
                  src.note,
                  src.type,
                  src.rate
                FROM \Application\Entity\RediStudioRatecard src
                LEFT JOIN \Application\Entity\RediActivity a
                    WITH a.id=src.activityId 
                INNER JOIN \Application\Entity\RediActivityType aty
                  WITH aty.id=a.typeId
                LEFT JOIN \Application\Entity\RediTrt trt
                  WITH trt.id = src.trtId
                WHERE 
                    src.ratecardId = :ratecard_id
                    AND a.status = 1
                ORDER BY a.typeId ASC, a.name ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('ratecard_id', $ratecardId);
        $data = $query->getArrayResult();

        $data = array_map(function ($cPrice) use ($ratecardId) {
            $cPrice['rate'] = ($cPrice['rate'] !== null) ? (int)$cPrice['rate'] : null;

            return $cPrice;
        }, $data);

        return $data;
    }
}
