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

class CampaignRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediCampaign";

    public function __construct(EntityManager $entityManager) {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);
    }

    public function search($projectId, $search = '', $offset = 0, $length = 10)
    {
        $dql = "SELECT DISTINCT a 
                FROM \Application\Entity\RediCampaign a 
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc 
                  WITH a.id=ptc.campaignId";

        $dqlFilter = [];

        if ($projectId) {
            $dqlFilter[] = "ptc.projectId= " . (int)$projectId;
        }

        if ($search) {
            $dqlFilter[] = "(a.campaignName LIKE '%" . $search . "%' )";
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY a.campaignName ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);
        $data = $query->getArrayResult();

        foreach($data as &$row) {
            $row['id'] = (int)$row['id'];
            $row['project'] = $this->getCampaignProject($row['id']);
        }

        return $data;
    }

    public function getCampaignProject($campaignId)
    {
        $dql = "SELECT ptc.id AS projectCampaignEntryId, p.id, p.projectName,
                ptc.firstPointOfContactId
                FROM \Application\Entity\RediProjectToCampaign ptc 
                INNER JOIN \Application\Entity\RediProject p
                  WITH p.id=ptc.projectId 
                WHERE ptc.campaignId=:campaign_id 
                ORDER BY p.id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('campaign_id', $campaignId);
        $data = $query->getArrayResult();

        foreach($data as &$row) {
            $row['user'] = $this->getCampaignProjectUser($row['projectCampaignEntryId']);
            $row['firstPointOfContact'] = $this->getCustomerContactById($row['firstPointOfContactId']);


            unset($row['projectCampaignEntryId']);
        }

        return $data;
    }

    public function getCampaignProjectUser($projectCampaignEntryId)
    {
        $dql = "SELECT pcm.userId
                FROM \Application\Entity\RediProjectToCampaignUser pcm 
                WHERE pcm.projectCampaignId=:project_campaign_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('project_campaign_id', $projectCampaignEntryId);
        $data =  $query->getArrayResult();

        $result = array();

        foreach($data as $manager) {
            $result[] = $manager['userId'];
        }

        return $result;
    }

    public function getCampaignProjectProducer($projectCampaignEntryId)
    {
        $dql = "SELECT pcm.producerId
                FROM \Application\Entity\RediProjectCampaignProducer pcm 
                WHERE pcm.projectCampaignId=:project_campaign_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('project_campaign_id', $projectCampaignEntryId);
        $data =  $query->getArrayResult();

        $result = array();

        foreach($data as $manager) {
            $result[] = $manager['producerId'];
        }

        return $result;
    }

    public function searchCount($projectId, $search = '')
    {
        $dql = "SELECT  COUNT(DISTINCT a.id) AS total_count 
                FROM \Application\Entity\RediCampaign a 
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc 
                  WITH a.id=ptc.campaignId";

        $dqlFilter = [];

        if ($projectId) {
            $dqlFilter[] = "ptc.projectId= " . (int)$projectId;
        }

        if ($search) {
            $dqlFilter[] = "(a.campaignName LIKE '%" . $search . "%' )";
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);
        $result =  $query->getArrayResult();

        return (isset($result[0]['total_count'])?(int)$result[0]['total_count']:0);
    }

    public function getCampaignProjectPeople($tableSuffix, $projectCampaignId, $offset=0, $length=10, $type=null, $userImagesBaseUrl=null)
    {
        if($type && count($type)) {
            $typeCondition = ' AND u.type_id IN (' . implode(',', $type) . ') ';
        } else {
            $typeCondition = '';
        }

        $tableName = 'redi_project_to_campaign_' . $tableSuffix;

        $additionalColumn = "";
        $additionalColumnJoin = "";

        if($tableSuffix=='user') {
            $additionalColumn = "ur.id AS roleId,
                                ur.role_name AS role,";
            $additionalColumnJoin = "LEFT JOIN 
                                    redi_user_role ur ON ur.id=ptcu.role_id";
        } else if($tableSuffix=='billing') {
            $additionalColumn = "ptcu.role AS billingRole,";
        }

        $dql = "SELECT DISTINCT
                    ptc.id AS projectCampaignId,
                    ptc.project_id AS projectId,
                    ptc.campaign_id AS campaignId,
                    ptcu.user_id AS userId,
                    u.username,
                    u.email,
                    u.first_name AS firstName,
                    u.last_name AS lastName,
                    u.image,
                    u.type_id AS typeId,
                    ut.type_name AS type,
                    " . $additionalColumn . "
                    u.image
                FROM
                    redi_project_to_campaign ptc
                        INNER JOIN
                    " . $tableName . " ptcu ON ptc.id = ptcu.project_campaign_id
                        INNER JOIN
                    redi_user u ON u.id = ptcu.user_id
                        LEFT JOIN
                    redi_user_type ut ON u.type_id = ut.id
                    " . $additionalColumnJoin . "
                WHERE
                    ptc.id = :project_to_campaign_id
                        " . $typeCondition . "
                        ORDER BY typeId, username ";

        // if offset and length both are null that means no condition required for limit
        // it is asking for all the results
        if($offset !== null && $length !== null) {
            $dql .= " LIMIT " . $offset . "," . $length;
        }

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('project_to_campaign_id', $projectCampaignId);
//        $query->bindParam('type_in', $typeIn);
        $query->execute();

        $data = $query->fetchAll();

        foreach($data as &$row) {
            $row['image'] = $row['image']?$userImagesBaseUrl . $row['image']:null;
            $row['fullName'] = trim($row['firstName'] . ' ' . $row['lastName']);
            $row['userId'] = (int)$row['userId'];
            $row['typeId'] = (int)$row['typeId'];
            $row['projectId'] = (int)$row['projectId'];
            $row['campaignId'] = (int)$row['campaignId'];

            if(isset($row['roleId'])) {
                $row['roleId'] = (int)$row['roleId'];
            }
        }

        return $data;
    }

    public function getCampaignProjectPeopleCount($tableSuffix, $projectCampaignId, $type=null)
    {
        if($type && count($type)) {
            $typeCondition = ' AND u.type_id IN (' . implode(',', $type) . ') ';
        } else {
            $typeCondition = '';
        }

        $tableName = 'redi_project_to_campaign_' . $tableSuffix;

        $dql = "SELECT 
                        COUNT(DISTINCT ptcu.user_id) AS total_count
                    FROM
                    redi_project_to_campaign ptc
                        INNER JOIN
                    " . $tableName . " ptcu ON ptc.id = ptcu.project_campaign_id
                        INNER JOIN
                    redi_user u ON u.id = ptcu.user_id
                WHERE
                    ptc.id = :project_to_campaign_id
                        " . $typeCondition ;

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('project_to_campaign_id', $projectCampaignId);
        $query->execute();

        $data = $query->fetchAll();

        return (isset($data[0]['total_count'])?(int)$data[0]['total_count']:0);
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
}
