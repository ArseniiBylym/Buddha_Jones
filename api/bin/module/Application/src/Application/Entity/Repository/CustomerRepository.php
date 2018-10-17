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

    public function __construct(EntityManager $entityManager)
    {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);
    }

    public function search($offset = 0, $length = 10, $filter=array())
    {
        $dql = "SELECT  
                  cu
                FROM \Application\Entity\RediCustomer cu ";

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {
            $dqlFilter[] = " (cu.cardcode LIKE :search OR cu.cardname LIKE :search ) ";
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $dqlFilter[] = " cu.studioId = :studio_id ";
        }

        if (isset($filter['first_letter']) && $filter['first_letter']) {
            if(strtolower($filter['first_letter']=='other')) {
                $dqlFilter[] = " (SUBSTRING(cu.customerName, 1,1)<'A' AND SUBSTRING(cu.customerName, 1,1)<'0') ";
            } elseif($filter['first_letter']=='0-9') {
                $dqlFilter[] = " (SUBSTRING(cu.customerName, 1,1)>0 OR SUBSTRING(cu.customerName, 1,1)='0') ";
            } else {
                $dqlFilter[] = " (UPPER(SUBSTRING(cu.customerName, 1, 1))=:first_letter) ";
            }
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " .  implode(" AND ", $dqlFilter);
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
            if($filter['first_letter']!='0-9' && strtolower($filter['first_letter']!='other')) {
                $query->setParameter('first_letter', $filter['first_letter']);
            }
        }

        $data = $query->getArrayResult();

        return $data;
    }

    public function searchCount($filter=array())
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
            if(strtolower($filter['first_letter']=='other')) {
                $dqlFilter[] = " (SUBSTRING(cu.customerName, 1,1)<'A' AND SUBSTRING(cu.customerName, 1,1)<'0') ";
            } elseif($filter['first_letter']=='0-9') {
                $dqlFilter[] = " (SUBSTRING(cu.customerName, 1,1)>0 OR SUBSTRING(cu.customerName, 1,1)='0') ";
            } else {
                $dqlFilter[] = " (UPPER(SUBSTRING(cu.customerName, 1, 1))=:first_letter) ";
            }
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " .  implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $query->setParameter('studio_id', $filter['studio_id']);
        }
        
        if (isset($filter['first_letter']) && $filter['first_letter']) {
            if($filter['first_letter']!='0-9' && strtolower($filter['first_letter']!='other')) {
                $query->setParameter('first_letter', $filter['first_letter']);
            }
        }
        $result =  $query->getArrayResult();

        return (isset($result[0]['total_count'])?(int)$result[0]['total_count']:0);
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

        if($response) {
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
                      WHEN UPPER(SUBSTRING(customer_name, 1, 1)) REGEXP '[0-9]' 
                      THEN '0-9' 
                      WHEN UPPER(SUBSTRING(customer_name, 1, 1)) NOT REGEXP '[0-9A-Za-z]' 
                      THEN 'Other' 
                      ELSE UPPER(SUBSTRING(customer_name, 1, 1)) 
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

        foreach($data as $row) {
            $response[] = $row['cfl'];
        }

        return $response;
    }

    public function searchCustomerContact($filter=array())
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

        if(count($dqlFilter)) {
            $dql .= " WHERE " .  implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY cc.name ASC";

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $query->setParameter('customer_id',  $filter['customer_id']);
        }

        $data = $query->getArrayResult();

        foreach($data as &$row) {
            $row['projectCampaign'] = $this->getProjectCampaignOfCustomerContact($row['id']);
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
                FROM \Application\Entity\RediCustomerContactToProjectCampaign cctpc 
                INNER JOIN \Application\Entity\RediProjectToCampaign ptc 
                  WITH cctpc.projectToCampaignId=ptc.id 
                INNER JOIN \Application\Entity\RediProject p 
                  WITH p.id=ptc.projectId 
                INNER JOIN \Application\Entity\RediCampaign c 
                  WITH c.id=ptc.campaignId
                WHERE 
                  cctpc.customerContactId=:customer_contact_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('customer_contact_id',  $customerContactId);

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

    /**
     * Get customer price for a specific customer
     *
     * It will return activity - Billable (id=1), Rate Card (id=4)
     *
     * @param int $customerId
     * @return array customer price
     */
    public function searchCustomerPrice($customerId)
    {
        $dql = "SELECT  
                  a.id AS activityId,
                  a.name AS activityName,
                  att.typeId AS activityTypeId,
                  aty.activityType,
                  cp.customerId, 
                  cp.price
                FROM \Application\Entity\RediActivity a
                LEFT JOIN \Application\Entity\RediCustomerPrice cp
                  WITH a.id=cp.activityId 
                LEFT JOIN \Application\Entity\RediActivityToType att 
                  WITH att.activityId=a.id
                INNER JOIN \Application\Entity\RediActivityType aty
                  WITH aty.id=att.typeId
                WHERE att.typeId IN (1,4)
                AND (cp.customerId=:customer_id OR cp.customerId IS NULL)
                GROUP BY a.id
                ORDER BY a.name ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('customer_id', $customerId);

        $data = $query->getArrayResult();

        $data = array_map(function($cPrice) use ($customerId) {
            $cPrice['customerId'] = $cPrice['customerId']?$cPrice['customerId']:$customerId;
            $cPrice['price'] = ($cPrice['price'] !== null)?(float)$cPrice['price'] : null;

            return $cPrice;
        }, $data);

        return $data;
    }

    public function getCustomerPriceById($customerId, $activityId)
    {
        $dql = "SELECT  
                  cp
                FROM \Application\Entity\RediCustomerPrice cp
                WHERE 
                    cp.customerId=:customer_id
                    AND cp.activityId=:activity_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('customer_id', $customerId);
        $query->setParameter('activity_id', $activityId);
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
}
