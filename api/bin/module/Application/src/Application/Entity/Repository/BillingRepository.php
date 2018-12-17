<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;
use Zend\XmlRpc\Value\DateTime;

class BillingRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediBilling";
    private $_entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->_entityManager = $entityManager;
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);
    }

    public function search($offset = 0, $length = 10, $filter = array())
    {
        $filter['offset'] = $offset;
        $filter['length'] = $length;

        $selectColumns = "b.id,
                      b.spotId, s.spotName,
                      b.projectId, p.projectName,
                      b.customerId, cu.cardname AS customerName,
                      b.campaignId, c.campaignName,
                      b.statusId, bis.billStatus,
                      b.createdAt";

        $groupBy = ' GROUP BY b.id ';

        if (isset($filter['sort']) && strtolower($filter['sort']) == 'priority') {
            $orderBy = " ORDER BY b.statusId ASC ";
        } else {
            $orderBy = " ORDER BY b.createdAt ASC ";
        }

        $data = $this->getResultByFilter($selectColumns, $filter, $groupBy, $orderBy, true, false);

        return $data;
    }


    public function searchCount($filter = array())
    {
        $selectColumns = " COUNT( DISTINCT  b.id) AS total_count ";

        $result = $this->getResultByFilter($selectColumns, $filter, null, null, false, true);

        return (isset($result['total_count']) ? (int)$result['total_count'] : 0);
    }

    public function getById($billId)
    {
        $filter = array(
            'bill_id' => $billId,
            'length' => 1,
        );

        $selectColumns = "b.id,
                      b.spotId, s.spotName,
                      b.projectId, p.projectName,
                      b.customerId, cu.cardname AS customerName,
                      b.campaignId, c.campaignName,
                      b.statusId, bis.billStatus,
                      b.createdAt";

        $groupBy = ' GROUP BY b.id ';


        $data = $this->getResultByFilter($selectColumns, $filter, $groupBy, null, true, true, true);

        return $data;
    }

    public function getResultByFilter($selectColumns, $filter = array(), $groupBy = null, $orderBy = null, $processExtraColumn = false, $returnOne = false, $returnEstimateActivity = false)
    {
        $dql = "SELECT
                  " . $selectColumns . "
                FROM \Application\Entity\RediBilling b
                LEFT JOIN \Application\Entity\RediSpot s
                  WITH b.spotId=s.id
                LEFT JOIN \Application\Entity\RediBillingStatus bis
                  WITH b.statusId=bis.id
                LEFT JOIN \Application\Entity\RediProject p
                  WITH p.id=b.projectId
                LEFT JOIN \Application\Entity\RediCampaign c
                  WITH c.id=b.campaignId
                LEFT JOIN \Application\Entity\RediCustomer cu
                  WITH cu.id=b.customerId
                LEFT JOIN \Application\Entity\RediBillingApproval ba
                  WITH ba.billId=b.id ";

        $dqlFilter = [];

        if (isset($filter['bill_id']) && $filter['bill_id']) {
            $dqlFilter[] = " b.id=:bill_id ";
        }

        if (isset($filter['spot_id']) && $filter['spot_id']) {
            $dqlFilter[] = " b.spotId=:spot_id ";
        }

        if (isset($filter['project_id']) && $filter['project_id']) {
            $dqlFilter[] = " b.projectId=:project_id ";
        }

        if (isset($filter['campaign_id']) && $filter['campaign_id']) {
            $dqlFilter[] = " b.campaignId=:campaign_id ";
        }

        if (isset($filter['status_id']) && $filter['status_id']) {
            $dqlFilter[] = " b.statusId=:status_id ";
        }

        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $dqlFilter[] = " b.customerId=:customer_id ";
        }

        if (isset($filter['approver_id']) && $filter['approver_id']) {
            $dqlFilter[] = " ba.userId=:approver_id ";
        }

        if (isset($filter['approver_status']) && $filter['approver_status'] !== null) {
            $dqlFilter[] = " ba.approved=:approver_status ";
        }

        if (isset($filter['search']) && $filter['search']) {
            $dqlFilter[] = " (s.spotName LIKE :search OR p.projectName  LIKE :search OR  c.campaignName LIKE :search ) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }


        if ($groupBy) {
            $dql .= " " . $groupBy . " ";
        }

        if ($orderBy) {
            $dql .= " " . $orderBy . " ";
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['offset'])) {
            $query->setFirstResult($filter['offset']);
        }

        if (isset($filter['length'])) {
            $query->setMaxResults($filter['length']);
        }


        if (isset($filter['bill_id']) && $filter['bill_id']) {
            $query->setParameter('bill_id', $filter['bill_id']);
        }

        if (isset($filter['spot_id']) && $filter['spot_id']) {
            $query->setParameter('spot_id', $filter['spot_id']);
        }

        if (isset($filter['project_id']) && $filter['project_id']) {
            $query->setParameter('project_id', $filter['project_id']);
        }

        if (isset($filter['campaign_id']) && $filter['campaign_id']) {
            $query->setParameter('campaign_id', $filter['campaign_id']);
        }

        if (isset($filter['status_id']) && $filter['status_id']) {
            $query->setParameter('status_id', $filter['status_id']);
        }

        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $query->setParameter('customer_id', $filter['customer_id']);
        }

        if (isset($filter['approver_id']) && $filter['approver_id']) {
            $query->setParameter('approver_id', $filter['approver_id']);
        }

        if (isset($filter['approver_status']) && $filter['approver_status'] !== null) {
            $query->setParameter('approver_status', $filter['approver_status']);
        }

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        $data = $query->getArrayResult();

        if ($processExtraColumn) {
            foreach ($data as &$row) {
                $row['id'] = (int)$row['id'];
//                $row['createdAt'] = $row['createdAt']->format('Y-m-d H:i:s');
                $row['total'] = $this->getBillingTotal($row['id']);
//                $row['approver'] = $this->getManagerByProjectAndCampaign($row['projectId'], $row['campaignId'], $row['id'], false);
                $row['approver'] = $this->getUserByProjectAndCampaign($row['projectId'], $row['campaignId'], $row['id'], false);

                if ($returnEstimateActivity) {
                    $row['estimate'] = $this->getBillingEstimateByBillId($row['id']);
                    $row['activity'] = $this->getBillingActivityByBillId($row['id']);
                }
            }
        }

        if ($returnOne) {
            $data = (isset($data[0])) ? $data[0] : null;
        }

        return $data;
    }

    public function getAllStatus()
    {
        $dql = "SELECT
                  b
                FROM \Application\Entity\RediBillingStatus b ";

        $query = $this->getEntityManager()->createQuery($dql);

        $data = $query->getArrayResult();

        return $data;
    }

    public function getAllApproverId($billId)
    {
        $dql = "SELECT
                  b.userId
                FROM \Application\Entity\RediBillingApproval b
                WHERE b.billId=:bill_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('bill_id', $billId);
        $data = $query->getArrayResult();

        $response = array();

        foreach ($data as $row) {
            $response[] = $row['userId'];
        }

        return $response;
    }

    public function getAllApproverByBillId($billId)
    {
        $dql = "SELECT
                  b.userId AS approverId, b.approved
                FROM \Application\Entity\RediBillingApproval b
                WHERE b.billId=:bill_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('bill_id', $billId);
        $data = $query->getArrayResult();

        return $data;
    }

    public function getBillingEstimateByBillId($billId)
    {
        $dql = "SELECT
                  e.id, e.spotId, e.versionId, e.multiplier, e.notes, e.typeId, e.statusId, e.totalAmount
                FROM \Application\Entity\RediBillingEstimate bie
                INNER JOIN \Application\Entity\RediEstimate e
                  WITh bie.estimateId=e.id
                WHERE bie.billId=:bill_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('bill_id', $billId);
        $data = $query->getArrayResult();

        return $data;
    }

    public function getBillingActivityByBillId($billId)
    {
        $dql = "SELECT
                  a.id, a.name, a.billable, a.status, ba.price, ba.hour
                FROM \Application\Entity\RediBillingActivity ba
                INNER JOIN \Application\Entity\RediActivity a
                  WITh ba.activityId=a.id
                WHERE ba.billId=:bill_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('bill_id', $billId);
        $data = $query->getArrayResult();

        $activityRepo = new ActivityRepository($this->_entityManager);

        foreach ($data as &$row) {
            $row['type'] = $activityRepo->getActivityTypeByActivityId($row['id']);
        }

        return $data;
    }

//    public function getManagerByProjectAndCampaign($projectId, $campaignId, $billId=null, $returnIdOnly=true)
//    {
//        $dql = "SELECT pcm.managerId, ba.approved
//                FROM \Application\Entity\RediProjectToCampaign ptc
//                INNER JOIN \Application\Entity\RediProjectCampaignManager pcm
//                  WITH ptc.id=pcm.projectCampaignId
//                LEFT JOIN \Application\Entity\RediBillingApproval ba
//                  WITH ba.billId=:bill_id AND ba.userId=pcm.managerId
//                WHERE
//                  ptc.projectId=:project_id
//                  AND ptc.campaignId=:campaign_id";
//
//        $query = $this->getEntityManager()->createQuery($dql);
//        $query->setParameter('project_id', $projectId);
//        $query->setParameter('campaign_id', $campaignId);
//        $query->setParameter('bill_id', $billId);
//        $data =  $query->getArrayResult();
//
//        $result = array();
//
//        if($returnIdOnly) {
//            foreach ($data as $manager) {
//                $result[] = $manager['managerId'];
//            }
//        } else {
//            foreach ($data as $manager) {
//                $result[] = array(
//                    'managerId' => $manager['managerId'],
//                    'approved' => (int)$manager['approved']
//                );
//            }
//        }
//
//        return $result;
//    }
//
//    public function getProducerByProjectAndCampaign($projectId, $campaignId, $billId=null, $returnIdOnly=true)
//    {
//        $dql = "SELECT pcm.producerId, ba.approved
//                FROM \Application\Entity\RediProjectToCampaign ptc
//                INNER JOIN \Application\Entity\RediProjectCampaignProducer pcm
//                  WITH ptc.id=pcm.projectCampaignId
//                LEFT JOIN \Application\Entity\RediBillingApproval ba
//                  WITH ba.billId=:bill_id AND ba.userId=pcm.producerId
//                WHERE
//                  ptc.projectId=:project_id
//                  AND ptc.campaignId=:campaign_id";
//
//        $query = $this->getEntityManager()->createQuery($dql);
//        $query->setParameter('project_id', $projectId);
//        $query->setParameter('campaign_id', $campaignId);
//        $query->setParameter('bill_id', $billId);
//        $data =  $query->getArrayResult();
//
//        $result = array();
//
//        if($returnIdOnly) {
//            foreach ($data as $manager) {
//                $result[] = $manager['producerId'];
//            }
//        } else {
//            foreach ($data as $manager) {
//                $result[] = array(
//                    'producerId' => $manager['producerId'],
//                    'approved' => (int)$manager['approved']
//                );
//            }
//        }
//
//        return $result;
//    }

    public function getUserByProjectAndCampaign($projectId, $campaignId, $billId = null, $returnIdOnly = true)
    {
        $dql = "SELECT ba.userId, ba.approved
                FROM \Application\Entity\RediProjectToCampaign ptc
                INNER JOIN \Application\Entity\RediProjectToCampaignUser pcm
                  WITH ptc.id=pcm.projectCampaignId
                INNER JOIN \Application\Entity\RediBillingApproval ba
                  WITH ba.billId=:bill_id AND ba.userId=pcm.userId
                WHERE
                  ptc.projectId=:project_id
                  AND ptc.campaignId=:campaign_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('project_id', $projectId);
        $query->setParameter('campaign_id', $campaignId);
        $query->setParameter('bill_id', $billId);
        $data = $query->getArrayResult();

        $result = array();

        if ($returnIdOnly) {
            foreach ($data as $user) {
                $result[] = $user['userId'];
            }
        } else {
            foreach ($data as $user) {
                $result[] = array(
                    'userId' => $user['userId'],
                    'approved' => (int)$user['approved']
                );
            }
        }

        return $result;
    }

    public function getBillingTotal($billId)
    {
        $total = $this->getBillEstimateTotal($billId) + $this->getBillActivityTotal($billId);

        return $total;
    }

    public function getBillEstimateTotal($billId)
    {
        $dql = "SELECT
                  SUM(e.totalAmount * e.multiplier) AS total
                FROM
                  \Application\Entity\RediBillingEstimate be
                  INNER JOIN \Application\Entity\RediEstimate e
                    WITH e.id = be.estimateId
                WHERE be.billId = :bill_id ";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('bill_id', $billId);
        $data = $query->getArrayResult();

        return (float)$data[0]['total'];
    }

    public function getBillActivityTotal($billId)
    {
        $billActivity = $this->getBillingActivityByBillId($billId);

        $total = 0;
        foreach ($billActivity as $activityPrice) {
            $hourSplit = explode('.', $activityPrice['hour']);
            $hour = (int)$hourSplit[0];
            $minute = (isset($hourSplit[1])) ? (int)$hourSplit[1] : 0;

            $total += $hour * $activityPrice['price'] + ($activityPrice['price'] * $minute / 60);
        }

        return $total;
    }

    public function getUnusedBillingId($userId, $spotId)
    {
        $dql = "SELECT
                  b.id
                FROM
                  \Application\Entity\RediBilling b
                WHERE
                    b.userId = :user_id
                    AND b.spotId = :spot_id
                    AND (b.status IS NULL OR b.status = 1)";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setMaxResults(1);
        $query->setParameter('user_id', $userId);
        $query->setParameter('spot_id', $spotId);
        $data = $query->getArrayResult();

        return (!empty($data[0]['id'])) ? (int)$data[0]['id'] : null;
    }

    public function updateBillIdOfTimeEntry($billId, $timeEntryIds = array(), $resetExisting = false)
    {
        // reset existing billid
        if ($resetExisting && $timeEntryIds) {
            $resetDql = "UPDATE
                            \Application\Entity\RediTimeEntry te
                        SET te.billId = NULL
                        WHERE te.billId = :bill_id";

            $resetQuery = $this->getEntityManager()->createQuery($resetDql);
            $resetQuery->setParameter('bill_id', $billId);
            $resetQuery->execute();
        }

        if ($timeEntryIds) {
            $dql = "UPDATE
                            \Application\Entity\RediTimeEntry te
                        SET te.billId = :bill_id
                        WHERE te.id IN (:time_entry_ids)";

            $query = $this->getEntityManager()->createQuery($dql);
            $query->setParameter('bill_id', $billId);
            $query->setParameter('time_entry_ids', $timeEntryIds, \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
            $query->execute();
        }
    }

    public function deleteExistingBillingLine($billId)
    {
        $resetDql = "DELETE
                    FROM \Application\Entity\RediBillingLine bl
                    WHERE bl.billId = :bill_id";

        $resetQuery = $this->getEntityManager()->createQuery($resetDql);
        $resetQuery->setParameter('bill_id', $billId);
        $resetQuery->execute();
    }

    public function getSingle($billId)
    {
        $dql = "SELECT
                        b
                    FROM \Application\Entity\RediBilling b
                    WHERE b.id = :id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setMaxResults(1);
        $query->setParameter('id', $billId);
        $result = $query->getArrayResult();

        $bill = (!empty($result[0])) ? $result[0] : null;

        if ($bill) {
            $lineDql = "SELECT
                        bl
                    FROM \Application\Entity\RediBillingLine bl
                    WHERE bl.billId = :bill_id";

            $lineQuery = $this->getEntityManager()->createQuery($lineDql);
            $lineQuery->setParameter('bill_id', $billId);
            $bill['billing_line'] = $lineQuery->getArrayResult();
        }

        return $bill;
    }

    public function getBillingListFromSpotBilling($filter = array(), $offset = 0, $length = 10)
    {
        $dql = "SELECT
                    ss.projectId,
                    p.projectName,
                    st.id AS studioId,
                    st.studioName,
                    ss.campaignId,
                    c.campaignName,
                    ss.projectCampaignId,
                    ptc.note AS projectCampaignName,
                    ss.spotId,
                    s.spotName,
                    MAX(COALESCE(ss.updatedAt, ss.createdAt)) AS updatedAt
                FROM \Application\Entity\RediSpotSent ss
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                    WITH ptc.id = ss.projectCampaignId
                LEFT JOIN \Application\Entity\RediProject p
                    WITH p.id = ss.projectId
                LEFT JOIN \Application\Entity\RediStudio st
                    WITH p.studioId = st.id
                LEFT JOIN \Application\Entity\RediCampaign c
                    WITH c.id = ss.campaignId
                LEFT JOIN \Application\Entity\RediSpot s
                    WITH s.id = ss.spotId
                WHERE
                    ss.billId IS NULL
                    AND ss.projectId IS NOT NULL
                    AND ss.campaignId IS NOT NULL ";

        $dqlFilter = [];

        if (!empty($filter['studio_id'])) {
            $dqlFilter[] = " p.studioId=:studio_id ";
        }

        if (!empty($filter['search'])) {
            $dqlFilter[] = " (s.spotName LIKE :search OR p.projectName  LIKE :search OR  c.campaignName LIKE :search ) ";
        }

        if (count($dqlFilter)) {
            $dql .= " AND " . implode(" AND ", $dqlFilter);
        }

        $dql .= " GROUP BY ss.projectId , ss.campaignId , ss.spotId
                ORDER BY updatedAt DESC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        if (!empty($filter['studio_id'])) {
            $query->setParameter('studio_id', $filter['studio_id']);
        }

        if (!empty($filter['search'])) {
            $query->setParameter('search', "%" . $filter['search'] . "%");
        }

        $result = $query->getArrayResult();

        $result = array_map(function($res) {
            if(!empty($res['updatedAt'])) {
                $res['updatedAt'] = new \DateTime($res['updatedAt']);
            }

            return $res;
        }, $result);

        return $result;
    }

    public function getBillingListFromSpotBillingCount($filter = array()) {
        $dql = "SELECT
                    COUNT(DISTINCT ss.project_id, ss.campaign_id, ss.spot_id) AS total_count
                FROM redi_spot_sent ss
                LEFT JOIN redi_project p
                    ON p.id = ss.project_id
                LEFT JOIN redi_campaign c
                    ON c.id = ss.campaign_id
                LEFT JOIN redi_spot s
                    ON s.id = ss.spot_id
                WHERE ss.bill_id IS NULL
                    AND ss.project_id IS NOT NULL
                    AND ss.campaign_id IS NOT NULL";

        $dqlFilter = [];

        if (!empty($filter['studio_id'])) {
            $dqlFilter[] = " p.studio_id = :studio_id ";
        }

        if (!empty($filter['search'])) {
            $dqlFilter[] = " (s.spot_name LIKE :search OR p.project_name  LIKE :search OR  c.campaign_name LIKE :search ) ";
        }

        if (count($dqlFilter)) {
            $dql .= " AND " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->getConnection()->prepare($dql);

        if (!empty($filter['studio_id'])) {
            $query->bindParam('studio_id', $filter['studio_id']);
        }

        if (!empty($filter['search'])) {
            $searchParam = "%" . $filter['search'] . "%";

            $query->bindParam('search', $searchParam);
        }

        $query->execute();
        $result = $query->fetchAll();

        return (!empty($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }

}
