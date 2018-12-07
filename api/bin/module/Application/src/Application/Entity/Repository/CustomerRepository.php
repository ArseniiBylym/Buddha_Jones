<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;
use Zend\I18n\Validator\DateTime;

// before called Table now Repository Table Data Gateway
// In Bug Entity add  @Entity(repositoryClass="BugRepository")
// To be able to use this query logic through
// $this->getEntityManager()->getRepository('Bug') we have to adjust the metadata slightly.
// http://stackoverflow.com/questions/10481916/the-method-name-must-start-with-either-findby-or-findoneby-uncaught-exception

class CustomerRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediCustomer";
    private $_entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);

        $this->_entityManager = $entityManager;
    }

    public function search($offset = 0, $length = 10, $filter = array())
    {
        $dql = "SELECT  
                  cu.id,
                  cu.cardcode,
                  cu.cardname,
                  cu.cardname AS customerName
                FROM \Application\Entity\RediCustomer cu ";

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {
            $dqlFilter[] = " (cu.cardcode LIKE :search OR cu.cardname LIKE :search ) ";
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $dqlFilter[] = " cu.studioId = :studio_id ";
        }

        if (isset($filter['first_letter']) && $filter['first_letter']) {
            if (strtolower($filter['first_letter'] == 'other')) {
                $dqlFilter[] = " (SUBSTRING(cu.cardname, 1,1)<'A' AND SUBSTRING(cu.cardname, 1,1)<'0') ";
            } elseif ($filter['first_letter'] == '0-9') {
                $dqlFilter[] = " (SUBSTRING(cu.cardname, 1,1)>0 OR SUBSTRING(cu.cardname, 1,1)='0') ";
            } else {
                $dqlFilter[] = " (UPPER(SUBSTRING(cu.cardname, 1, 1))=:first_letter) ";
            }
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY cu.cardname ASC";


        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $query->setParameter('studio_id', $filter['studio_id']);
        }

        if (isset($filter['first_letter']) && $filter['first_letter']) {
            if ($filter['first_letter'] != '0-9' && strtolower($filter['first_letter'] != 'other')) {
                $query->setParameter('first_letter', $filter['first_letter']);
            }
        }

        $data = $query->getArrayResult();

        return $data;
    }

    public function searchCount($filter = array())
    {
        $dql = "SELECT 
                  COUNT(cu.id) AS total_count 
                FROM \Application\Entity\RediCustomer cu ";

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {
            $dqlFilter[] = " (cu.cardcode LIKE :search OR cu.cardname LIKE :search ) ";
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $dqlFilter[] = " cu.studioId = :studio_id ";
        }

        if (isset($filter['first_letter']) && $filter['first_letter']) {
            if (strtolower($filter['first_letter'] == 'other')) {
                $dqlFilter[] = " (SUBSTRING(cu.cardname, 1,1)<'A' AND SUBSTRING(cu.cardname, 1,1)<'0') ";
            } elseif ($filter['first_letter'] == '0-9') {
                $dqlFilter[] = " (SUBSTRING(cu.cardname, 1,1)>0 OR SUBSTRING(cu.cardname, 1,1)='0') ";
            } else {
                $dqlFilter[] = " (UPPER(SUBSTRING(cu.cardname, 1, 1))=:first_letter) ";
            }
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $query->setParameter('studio_id', $filter['studio_id']);
        }

        if (isset($filter['first_letter']) && $filter['first_letter']) {
            if ($filter['first_letter'] != '0-9' && strtolower($filter['first_letter'] != 'other')) {
                $query->setParameter('first_letter', $filter['first_letter']);
            }
        }
        $result = $query->getArrayResult();

        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }

    public function getById($id)
    {
        $dql = "SELECT 
                  cu
                FROM \Application\Entity\RediCustomer cu
                WHERE cu.id=:id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('id', $id);
        $query->setMaxResults(1);
        $result = $query->getArrayResult();

        $response = (isset($result[0]) ? $result[0] : null);

        if ($response) {
            $contactDql = "SELECT 
                  cc
                FROM \Application\Entity\RediCustomerContact cc
                WHERE cc.customerId=:id";

            $contactQuery = $this->getEntityManager()->createQuery($contactDql);
            $contactQuery->setParameter('id', $id);
            $response['contact'] = $contactQuery->getArrayResult();
        }

        return $response;
    }

    public function getDistinctCustomerFirstLetter()
    {
        $dql = "SELECT DISTINCT 
                  cfl 
                FROM
                  (SELECT 
                    CASE
                      WHEN UPPER(SUBSTRING(cardname, 1, 1)) REGEXP '[0-9]' 
                      THEN '0-9' 
                      WHEN UPPER(SUBSTRING(cardname, 1, 1)) NOT REGEXP '[0-9A-Za-z]' 
                      THEN 'Other' 
                      ELSE UPPER(SUBSTRING(cardname, 1, 1)) 
                    END AS cfl 
                  FROM
                    redi_customer) AS a 
                ORDER BY 
                  CASE
                      WHEN cfl='Other' 
                      THEN 'zzz' 
                      ELSE cfl 
                    END";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->execute();

        $data = $query->fetchAll();

        $response = array();

        foreach ($data as $row) {
            $response[] = $row['cfl'];
        }

        return $response;
    }

    public function getDistinctStudioFirstLetter($studioIds)
    {
        $studioIds = implode(',', $studioIds ? : array(0));

        $dql = "SELECT DISTINCT 
                  cfl 
                FROM
                  (SELECT 
                    CASE
                      WHEN UPPER(SUBSTRING(studio_name, 1, 1)) REGEXP '[0-9]' 
                      THEN '0-9' 
                      WHEN UPPER(SUBSTRING(studio_name, 1, 1)) NOT REGEXP '[0-9A-Za-z]' 
                      THEN 'Other' 
                      ELSE UPPER(SUBSTRING(studio_name, 1, 1)) 
                    END AS cfl 
                  FROM
                    redi_studio
                    WHERE id IN (" . $studioIds . ")) AS a 
                ORDER BY 
                  CASE
                      WHEN cfl='Other' 
                      THEN 'zzz' 
                      ELSE cfl 
                    END";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->execute();

        $data = $query->fetchAll();

        $response = array_column($data, 'cfl');

        return $response;
    }

    public function searchCustomerContact($filter = array())
    {
        $dql = "SELECT  
                  cc
                FROM \Application\Entity\RediCustomerContact cc ";

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {
            $dqlFilter[] = " (cc.name LIKE :search OR cc.email LIKE :search) ";
        }

        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $dqlFilter[] = " cc.customerId=:customer_id ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY cc.name ASC";

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $query->setParameter('customer_id', $filter['customer_id']);
        }

        $data = $query->getArrayResult();

        if (!empty($filter['get_details'])) {
            foreach ($data as &$row) {
                $row['projectCampaign'] = $this->getProjectCampaignOfCustomerContact($row['id']);
            }
        }

        return $data;
    }

    public function getProjectCampaignCustomerContact($projectId)
    {
        $dql = "SELECT  
                    cc.id,
                    cc.name,
                    cc.title
                FROM redi_customer_contact cc 
                INNER JOIN redi_project_to_campaign_cc ptcc
                    ON cc.id = ptcc.customer_contact_id
                WHERE ptc.id = :project_campaign_id
                GROUP BY cc.id 
                ORDER BY cc.name ASC";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('project_campaign_id', $projectId);
        $query->execute();
        $data = $query->fetchAll();

        foreach ($data as &$row) {
            $row['id'] = (int)$row['id'];
        }

        return $data;
    }

    public function getProjectCampaignOfCustomerContact($customerContactId)
    {
        $dql = "SELECT  
                  ptc.id AS projectCampaignId, 
                  ptc.projectId, p.projectName, ptc.campaignId, c.campaignName, ptc.firstPointOfContactId,
                  ptc.requestWritingTeam, ptc.writingTeamNotes,
                ptc.requestMusicTeam, ptc.musicTeamNotes
                FROM \Application\Entity\RediProjectToCampaignCc cctpc 
                INNER JOIN \Application\Entity\RediProjectToCampaign ptc 
                  WITH cctpc.projectCampaignId=ptc.id 
                INNER JOIN \Application\Entity\RediProject p 
                  WITH p.id=ptc.projectId 
                INNER JOIN \Application\Entity\RediCampaign c 
                  WITH c.id=ptc.campaignId
                WHERE 
                  cctpc.customerContactId=:customer_contact_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('customer_contact_id', $customerContactId);

        $data = $query->getArrayResult();

        return $data;
    }

    public function getCustomerContactById($id)
    {
        $dql = "SELECT 
                  cu
                FROM \Application\Entity\RediCustomerContact cu
                WHERE cu.id=:id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('id', $id);
        $query->setMaxResults(1);
        $result = $query->getArrayResult();

        $response = (isset($result[0]) ? $result[0] : null);

        return $response;
    }

    public function getCustomerContactsById($ids)
    {
        $dql = "SELECT 
                  cu
                FROM \Application\Entity\RediCustomerContact cu
                WHERE cu.id IN (:id)";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('id', $ids, \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
        $result = $query->getArrayResult();

        return $result;
    }

    public function getCampaignProjectCustomerContact($projectCampaignId)
    {
        $dql = "SELECT 
                  cu
                FROM \Application\Entity\RediProjectToCampaignCC ptccc
                INNER JOIN \Application\Entity\RediCustomerContact cu
                    WITH cu.id = ptccc.customerContactId
                WHERE ptccc.projectCampaignId=:project_campaign_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('project_campaign_id', $projectCampaignId);
        $result = $query->getArrayResult();

        return $result;
    }

    /**
     * Get customer price for a specific customer
     *
     * It will return activity - Billable (id=1), Rate Card (id=4)
     *
     * @param int $customerId
     * @return array customer price
     */
    public function searchCustomerPrice($customerId, $type = null)
    {
        $type = strtolower($type);

        $typeAData = array();
        $typeBData = array();

        if (empty($type) || $type === 'a') {
            $typeAData = $this->searchCustomerPriceByType($customerId, 'A');
        }

        if (empty($type) || $type === 'b') {
            $typeBData = $this->searchCustomerPriceByType($customerId, 'B');
        }

        return array_merge($typeAData, $typeBData);

    }

    public function searchCustomerPriceByType($customerId, $type)
    {
        $dql = "SELECT  
                  a.id AS activityId,
                  a.name AS activityName,
                  a.typeId AS activityTypeId,
                  aty.activityType,
                  cp.customerId, 
                  cp.price
                FROM \Application\Entity\RediActivity a
                LEFT JOIN \Application\Entity\RediCustomerPrice cp
                  WITH a.id=cp.activityId 
                INNER JOIN \Application\Entity\RediActivityType aty
                  WITH aty.id=a.typeId
                WHERE a.typeId IN (1,4)
                AND (cp.customerId=:customer_id OR cp.customerId IS NULL)
                AND (cp.type = :type OR cp.type IS NULL)
                GROUP BY a.id
                ORDER BY a.name ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('customer_id', $customerId);
        $query->setParameter('type', $type);

        $data = $query->getArrayResult();

        $data = array_map(function ($cPrice) use ($customerId, $type) {
            $cPrice['customerId'] = $cPrice['customerId'] ? $cPrice['customerId'] : $customerId;
            $cPrice['price'] = ($cPrice['price'] !== null) ? (float)$cPrice['price'] : null;
            $cPrice['type'] = $type;

            return $cPrice;
        }, $data);

        return $data;
    }

    public function getCustomerPriceById($customerId, $activityId, $type)
    {
        $dql = "SELECT  
                  cp
                FROM \Application\Entity\RediCustomerPrice cp
                WHERE 
                    cp.customerId=:customer_id
                    AND cp.activityId=:activity_id
                    AND cp.type = :type";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('customer_id', $customerId);
        $query->setParameter('activity_id', $activityId);
        $query->setParameter('type', $type);
        $query->setMaxResults(1);

        $data = $query->getArrayResult();

        return (!empty($data[0]) ? $data[0] : null);
    }

    public function getCustomerNewById($id)
    {
        $dql = "SELECT  
                  cn
                FROM \Application\Entity\RediCustomerNew cn
                WHERE 
                    cn.id=:id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('id', $id);
        $query->setMaxResults(1);

        $data = $query->getArrayResult();

        return (!empty($data[0]) ? $data[0] : null);
    }

    public function searchStudio($filter = array(), $offset = 0, $length = 10)
    {
        $dql = "SELECT  
                  st
                FROM \Application\Entity\RediStudio st ";

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {
            $dqlFilter[] = " (st.cardcode LIKE :search OR st.studioName LIKE :search ) ";
        }

        if (isset($filter['first_letter']) && $filter['first_letter']) {
            if (strtolower($filter['first_letter'] == 'other')) {
                $dqlFilter[] = " (SUBSTRING(st.studioName, 1,1)<'A' AND SUBSTRING(st.studioName, 1,1)<'0') ";
            } elseif ($filter['first_letter'] == '0-9') {
                $dqlFilter[] = " (SUBSTRING(st.studioName, 1,1)>0 OR SUBSTRING(st.studioName, 1,1)='0') ";
            } else {
                $dqlFilter[] = " (UPPER(SUBSTRING(st.studioName, 1, 1))=:first_letter) ";
            }
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY st.studioName ASC";


        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['first_letter']) && $filter['first_letter']) {
            if ($filter['first_letter'] != '0-9' && strtolower($filter['first_letter'] != 'other')) {
                $query->setParameter('first_letter', $filter['first_letter']);
            }
        }

        $data = $query->getArrayResult();

        return $data;
    }

    public function searchStudioCount($filter = array())
    {
        $dql = "SELECT  
                  COUNT(st.id) AS total_count 
                FROM \Application\Entity\RediStudio st ";

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {
            $dqlFilter[] = " (st.cardcode LIKE :search OR st.studioName LIKE :search ) ";
        }

        if (isset($filter['first_letter']) && $filter['first_letter']) {
            if (strtolower($filter['first_letter'] == 'other')) {
                $dqlFilter[] = " (SUBSTRING(st.studioName, 1,1)<'A' AND SUBSTRING(st.studioName, 1,1)<'0') ";
            } elseif ($filter['first_letter'] == '0-9') {
                $dqlFilter[] = " (SUBSTRING(st.studioName, 1,1)>0 OR SUBSTRING(st.studioName, 1,1)='0') ";
            } else {
                $dqlFilter[] = " (UPPER(SUBSTRING(st.studioName, 1, 1))=:first_letter) ";
            }
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['first_letter']) && $filter['first_letter']) {
            if ($filter['first_letter'] != '0-9' && strtolower($filter['first_letter'] != 'other')) {
                $query->setParameter('first_letter', $filter['first_letter']);
            }
        }

        $result = $query->getArrayResult();

        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }

    public function searchNewCustomer($filter = array(), $offset = 0, $length = 10)
    {
        $dql = "SELECT  
                  cn
                FROM \Application\Entity\RediCustomerNew cn ";

        $dqlFilter = [];

        if (isset($filter['completed']) && $filter['completed'] !== null) {
            $dqlFilter[] = " cn.completed = :completed ";
        }

        if (!empty($filter['created_by'])) {
            $dqlFilter[] = " cn.createdBy = :created_by ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY cn.id ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        if (isset($filter['completed']) && $filter['completed'] !== null) {
            $query->setParameter('completed', $filter['completed']);
        }

        if (!empty($filter['created_by'])) {
            $query->setParameter('created_by', $filter['created_by']);
        }

        $data = $query->getArrayResult();

        return $data;
    }

    public function searchNewCustomerCount($filter = array())
    {
        $dql = "SELECT 
                  COUNT(cn.id) AS total_count 
                FROM \Application\Entity\RediCustomerNew cn ";

        $dqlFilter = [];

        if (isset($filter['completed']) && $filter['completed'] !== null) {
            $dqlFilter[] = " cn.completed = :completed ";
        }

        if (!empty($filter['created_by'])) {
            $dqlFilter[] = " cn.createdBy = :created_by ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['completed']) && $filter['completed'] !== null) {
            $query->setParameter('completed', $filter['completed']);
        }

        if (!empty($filter['created_by'])) {
            $query->setParameter('created_by', $filter['created_by']);
        }

        $result = $query->getArrayResult();

        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }



















    public function getRatecardType($studioId)
    {
        $dql = "SELECT 
                    rct
                FROM \Application\Entity\RediRatecardType rct
                WHERE rct.studioId = :studio_id
                ORDER BY rct.ratecardName";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('studio_id', $studioId);
        $data = $query->getArrayResult();

        $data = array_map(function ($rc) {
            $rc['ratecardId'] = (int)$rc['ratecardId'];
            $rc['studioId'] = (int)$rc['studioId'];

            return $rc;
        }, $data);

        return $data;
    }

    public function searchStudioRatecardType($ratecardId)
    {
        $dql = "SELECT 
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
                FROM \Application\Entity\RediActivity a
                LEFT JOIN \Application\Entity\RediStudioRatecard src
                  WITH a.id=src.activityId 
                INNER JOIN \Application\Entity\RediActivityType aty
                  WITH aty.id=a.typeId
                LEFT JOIN \Application\Entity\RediTrt trt
                  WITH trt.id = src.trtId
                WHERE a.typeId IN (1,4)
                AND (src.ratecardId = :ratecard_id OR src.ratecardId IS NULL)
                GROUP BY a.id
                ORDER BY a.name ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('ratecard_id', $ratecardId);
        $data = $query->getArrayResult();

        $data = array_map(function ($cPrice) use ($ratecardId) {
            $cPrice['ratecardId'] = (int)($cPrice['ratecardId'] ? $cPrice['ratecardId'] : $ratecardId);
            $cPrice['rate'] = ($cPrice['rate'] !== null) ? (float)$cPrice['rate'] : null;

            return $cPrice;
        }, $data);

        return $data;
    }
}
