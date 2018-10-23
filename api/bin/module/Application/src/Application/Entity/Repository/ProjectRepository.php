<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;
use Zend\Form\Element\DateTime;

class ProjectRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediProject";
    private $_entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);

        $this->_entityManager = $entityManager;
    }

    public function search($filter = array(), $offset = 0, $length = 10, $returnSingleResult = false)
    {
        $dql = "SELECT
                  p.id, 
                  p.studioId, st.studioName,
                  p.notes,  p.projectRelease, p.type,
                  MAX(ph.createdAt) as lastUpdatedAt
                FROM \Application\Entity\RediProject p
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                    WITH p.id=ptc.projectId
                LEFT JOIN \Application\Entity\RediCampaign ca
                    WITH ca.id=ptc.campaignId
                LEFT JOIN \Application\Entity\RediProjectHistory ph
                  WITH p.id=ph.projectId
                LEFT JOIN \Application\Entity\RediCustomer c
                  WITH c.id=ptc.customerId
                LEFT JOIN \Application\Entity\RediStudio st
                  WITH st.id = p.studioId
                LEFT JOIN \Application\Entity\RediProjectToCampaignUser ptcu
                    WITH ptcu.projectCampaignId = ptc.id
                LEFT JOIN \Application\Entity\RediUser u
                    WITH u.id=ptcu.userId 
                LEFT JOIN \Application\Entity\RediCustomerContact cc 
                    WITH cc.id=ptc.firstPointOfContactId
                 ";

        // If user user does not have access to all time entry
        // (if user does not belong to those selected user type)
        // then join tables to get only the projects he is assigned to
        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $dql .= " LEFT JOIN \Application\Entity\RediProjectToCampaignBilling ptcb
                        WITH ptcb.projectCampaignId=ptc.id
                      LEFT JOIN \Application\Entity\RediProjectToCampaignDesigner ptcd
                        WITH ptcd.projectCampaignId=ptc.id
                      LEFT JOIN \Application\Entity\RediProjectToCampaignEditor ptce
                        WITH ptce.projectCampaignId=ptc.id ";
        }

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {

            /**
             * should be searchable by:
             * 1) creative team user name(and user belongs to role producer or lead producer),
             * 2) campaign name,
             * 3) studio/customer name,
             * 4) client(name of creative executive name, or customer contact), (first point of contact for now)
             */

            $projectNameView = array();

            if (!empty($filter['project_name_view_access']) && !empty($filter['project_code_name_view_access'])) {
                $projectNameView[] = ' p.projectName LIKE :search ';
            }

            if (!empty($filter['project_name_view_access']) || !empty($filter['project_code_name_view_access'])) {
                $projectNameView[] = ' p.projectCode LIKE :search ';
            }

            $projectNameView[] = ' ca.campaignName LIKE :search ';
            $projectNameView[] = ' ((u.firstName LIKE :search OR u.lastName LIKE :search) AND ptcu.roleId IN (1,2)) ';
            $projectNameView[] = ' c.cardname LIKE :search ';
            $projectNameView[] = ' cc.name LIKE :search ';

            $dqlFilter[] = " (" . implode(' OR ', $projectNameView) . ") ";
        }

        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $dqlFilter[] = " ptc.customerId=:customer_id ";
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $dqlFilter[] = " p.studioId=:studio_id ";
        }

        if (isset($filter['project_id']) && $filter['project_id']) {
            $dqlFilter[] = " p.id=:project_id ";
        }

        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $dqlFilter[] = " (ptcu.userId = :project_to_campaign_user_id
                              OR ptcb.userId = :project_to_campaign_user_id
                              OR ptcd.userId = :project_to_campaign_user_id
                              OR ptce.userId = :project_to_campaign_user_id
                              OR p.createdByUserId = :project_to_campaign_user_id
                              OR ca.createdByUserId = :project_to_campaign_user_id) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= ' GROUP BY p.id ';

        if (!empty($filter['sort']) && $filter['sort'] == 'last_update_date') {
            $dql .= " ORDER BY lastUpdatedAt DESC";
        } else {
            $dql .= " ORDER BY p.projectName ASC ";
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $query->setParameter('customer_id', $filter['customer_id']);
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $query->setParameter('studio_id', $filter['studio_id']);
        }

        if (isset($filter['project_id']) && $filter['project_id']) {
            $query->setParameter('project_id', $filter['project_id']);
        }

        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $query->setParameter('project_to_campaign_user_id', $filter['project_to_campaign_user_id']);
        }

        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        $result = $query->getArrayResult();


        foreach ($result as &$row) {
            $row['lastUpdateUser'] = $this->getLastUpdateUserByProjectId($row['id'], $filter['image_path']);
            $row['campaign'] = $this->getCampaignByProjectId($row['id']);
            $row['comment'] = $this->getCommentByProjectId($row['id']);
            $row['user'] = $this->getUserByProjectId($row['id'], $filter['image_path']);

            if ($row['lastUpdatedAt']) {
                $row['lastUpdatedAt'] = \DateTime::createFromFormat('Y-m-d H:i:s', $row['lastUpdatedAt']);
            }

            if ($returnSingleResult) {
                foreach ($row['campaign'] as &$campaign) {
                    $campaign['spot'] = $this->getSpotByProjectCampaignId($campaign['projectCampaignId']);
                }

                $row['history'] = $this->getHistoryByProjectId($row['id'], $filter['image_path']);
            }
        }

        return $result;
    }

    public function searchCount($filter = array())
    {
        $dql = "SELECT COUNT(DISTINCT p.id) AS total_count
                FROM \Application\Entity\RediProject p
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                    WITH p.id=ptc.projectId
                LEFT JOIN \Application\Entity\RediCampaign ca
                    WITH ca.id=ptc.campaignId
                LEFT JOIN \Application\Entity\RediCustomer c
                  WITH c.id=ptc.customerId
                LEFT JOIN \Application\Entity\RediProjectToCampaignUser ptcu
                    WITH ptcu.projectCampaignId = ptc.id
                LEFT JOIN \Application\Entity\RediUser u
                    WITH u.id=ptcu.userId 
                LEFT JOIN \Application\Entity\RediCustomerContact cc 
                    WITH cc.id=ptc.firstPointOfContactId ";

        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $dql .= " LEFT JOIN \Application\Entity\RediProjectToCampaignBilling ptcb
                        WITH ptcb.projectCampaignId=ptc.id
                      LEFT JOIN \Application\Entity\RediProjectToCampaignDesigner ptcd
                        WITH ptcd.projectCampaignId=ptc.id
                      LEFT JOIN \Application\Entity\RediProjectToCampaignEditor ptce
                        WITH ptce.projectCampaignId=ptc.id ";
        }

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {

            /**
             * should be searchable by:
             * 1) creative team user name(and user belongs to role producer or lead producer),
             * 2) campaign name,
             * 3) studio/customer name,
             * 4) client(name of creative executive name, or customer contact), (first point of contact for now)
             */

            $projectNameView = array();

            if (!empty($filter['project_name_view_access']) && !empty($filter['project_code_name_view_access'])) {
                $projectNameView[] = ' p.projectName LIKE :search ';
            }

            if (!empty($filter['project_name_view_access']) || !empty($filter['project_code_name_view_access'])) {
                $projectNameView[] = ' p.projectCode LIKE :search ';
            }

            $projectNameView[] = ' ca.campaignName LIKE :search ';
            $projectNameView[] = ' ((u.firstName LIKE :search OR u.lastName LIKE :search) AND ptcu.roleId IN (1,2)) ';
            $projectNameView[] = ' c.cardname LIKE :search ';
            $projectNameView[] = ' cc.name LIKE :search ';

            $dqlFilter[] = " (" . implode(' OR ', $projectNameView) . ") ";
        }


        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $dqlFilter[] = " ptc.customerId=:customer_id ";
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $dqlFilter[] = " p.studioId=:studio_id ";
        }

        if (isset($filter['project_id']) && $filter['project_id']) {
            $dqlFilter[] = " p.id=:project_id ";
        }

        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $dqlFilter[] = " (ptcu.userId = :project_to_campaign_user_id
                              OR ptcb.userId = :project_to_campaign_user_id
                              OR ptcd.userId = :project_to_campaign_user_id
                              OR ptce.userId = :project_to_campaign_user_id
                              OR p.createdByUserId = :project_to_campaign_user_id
                              OR ca.createdByUserId = :project_to_campaign_user_id)";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);
        if (isset($filter['search']) && $filter['search']) {
            $query->setParameter('search', '%' . $filter['search'] . '%');
        }

        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $query->setParameter('customer_id', $filter['customer_id']);
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $query->setParameter('studio_id', $filter['studio_id']);
        }

        if (isset($filter['project_id']) && $filter['project_id']) {
            $query->setParameter('project_id', $filter['project_id']);
        }

        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $query->setParameter('project_to_campaign_user_id', $filter['project_to_campaign_user_id']);
        }

        $result = $query->getArrayResult();

        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }

    public function searchDetailed($filter = array(), $offset = 0, $length = 10, $returnSingleResult = false)
    {
        $dql = "SELECT
                  p.id,
                  p.studio_id AS studioId,
                  st.studio_name AS studioName,
                  p.project_release AS projectRelease,
                  p.notes,
                  p.type,
                  MAX(ph.created_at) AS lastUpdatedAt,
                  (SELECT
                    user_id
                  FROM
                    redi_project_history ph2
                  WHERE ph2.project_id = p.id
                  ORDER BY created_at DESC
                  LIMIT 1) AS lastUpdateUserId,
                  (SELECT
                    CONCAT(
                      IFNULL(u.first_name, ''),
                      ' ',
                      IFNULL(u.last_name, '')
                    )
                  FROM
                    redi_project_history ph3
                    INNER JOIN redi_user u
                      ON ph3.user_id = u.id
                  WHERE ph3.project_id = p.id
                  ORDER BY created_at DESC
                  LIMIT 1) AS lastUpdateUserName,
                  COUNT(ph.id) AS historyCount
                FROM
                  redi_project p
                  LEFT JOIN redi_project_to_campaign ptc
                    ON ptc.project_id = p.id
                  LEFT JOIN redi_campaign ca
                    ON ca.id=ptc.campaign_id
                  LEFT JOIN redi_customer c
                    ON ptc.customer_id = c.id
                  LEFT JOIN redi_studio st
                    ON st.id = p.studio_id
                  LEFT JOIN redi_project_history ph
                    ON p.id = ph.project_id
                  LEFT JOIN redi_project_to_campaign_user ptcu
                    ON ptcu.project_campaign_id = ptc.id
                  LEFT JOIN redi_user u
                    ON u.id=ptcu.user_id 
                  LEFT JOIN redi_customer_contact cc 
                    ON cc.id=ptc.first_point_of_contact_id  ";

        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $dql .= " LEFT JOIN redi_project_to_campaign_billing ptcb
                        ON ptcb.project_campaign_id=ptc.id
                      LEFT JOIN redi_project_to_campaign_designer ptcd
                        ON ptcd.project_campaign_id=ptc.id
                      LEFT JOIN redi_project_to_campaign_editor ptce
                        ON ptce.project_campaign_id=ptc.id ";
        }

        $dqlFilter = [];

        if (isset($filter['search']) && $filter['search']) {

            /**
             * should be searchable by:
             * 1) creative team user name(and user belongs to role producer or lead producer),
             * 2) campaign name,
             * 3) studio/customer name,
             * 4) client(name of creative executive name, or customer contact), (first point of contact for now)
             */

            $projectNameView = array();

            if (!empty($filter['project_name_view_access']) && !empty($filter['project_code_name_view_access'])) {
                $projectNameView[] = ' p.project_name LIKE :search ';
            }

            if (!empty($filter['project_name_view_access']) || !empty($filter['project_code_name_view_access'])) {
                $projectNameView[] = ' p.project_code LIKE :search ';
            }

            $projectNameView[] = ' ca.campaign_name LIKE :search ';
            $projectNameView[] = ' ((u.first_name LIKE :search OR u.last_name LIKE :search) AND ptcu.role_id IN (1,2)) ';
            $projectNameView[] = ' c.cardname LIKE :search ';
            $projectNameView[] = ' cc.name LIKE :search ';

            $dqlFilter[] = " (" . implode(' OR ', $projectNameView) . ") ";
        }


        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $dqlFilter[] = " ptc.customer_id=:customer_id ";
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $dqlFilter[] = " p.studio_id=:studio_id ";
        }

        if (isset($filter['project_id']) && $filter['project_id']) {
            $dqlFilter[] = " p.id=:project_id ";
        }

        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $dqlFilter[] = " (ptcu.user_id = :project_to_campaign_user_id
                              OR ptcb.user_id = :project_to_campaign_user_id
                              OR ptcd.user_id = :project_to_campaign_user_id
                              OR ptce.user_id = :project_to_campaign_user_id
                              OR p.created_by_user_id = :project_to_campaign_user_id
                              OR ca.created_by_user_id = :project_to_campaign_user_id) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " GROUP BY p.id ";

        if ($filter['sort'] == 'last_update_date') {
            $dql .= " ORDER BY lastUpdatedAt DESC";
        } else {
            $dql .= " ORDER BY p.project_name ASC ";
        }

        $dql .= " LIMIT " . $offset . "," . $length;

        $query = $this->getEntityManager()->getConnection()->prepare($dql);

        if (isset($filter['search']) && $filter['search']) {
            $searchLike = '%' . $filter['search'] . '%';
            $query->bindParam('search', $searchLike);
        }

        if (isset($filter['customer_id']) && $filter['customer_id']) {
            $query->bindParam('customer_id', $filter['customer_id']);
        }

        if (isset($filter['studio_id']) && $filter['studio_id']) {
            $query->bindParam('studio_id', $filter['studio_id']);
        }

        if (isset($filter['project_id']) && $filter['project_id']) {
            $query->bindParam('project_id', $filter['project_id']);
        }

        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $query->bindParam('project_to_campaign_user_id', $filter['project_to_campaign_user_id']);
        }

        $query->execute();

        $data = $query->fetchAll();

        foreach ($data as &$row) {
            $row['id'] = (int)$row['id'];
            $row['lastUpdateUserId'] = ($row['lastUpdateUserId']) ? (int)$row['lastUpdateUserId'] : null;
            $row['historyCount'] = (int)$row['historyCount'];
            $row['lastUpdateUserName'] = trim($row['lastUpdateUserName']);

            if ($row['projectRelease']) {
                $row['projectRelease'] = \DateTime::createFromFormat('Y-m-d H:i:s', $row['projectRelease']);
            }

            if ($row['lastUpdatedAt']) {
                $row['lastUpdatedAt'] = \DateTime::createFromFormat('Y-m-d H:i:s', $row['lastUpdatedAt']);;
            }

            $row['campaign'] = $this->getCampaignByProjectId($row['id']);
            $row['lastUpdateUser'] = $this->getLastUpdateUserByProjectId($row['id'], $filter['image_path']);
            $row['comment'] = $this->getCommentByProjectId($row['id']);
            $row['user'] = $this->getUserByProjectId($row['id'], $filter['image_path']);

            if ($returnSingleResult) {
                foreach ($row['campaign'] as &$campaign) {
//                    $campaign['spot'] = $this->getSpotByProjectAndCampaign($row['id'], $campaign['campaignId']);
                    $campaign['spot'] = $this->getSpotByProjectCampaignId($campaign['projectCampaignId']);
                }

                $row['history'] = $this->getHistoryByProjectId($row['id'], $filter['image_path']);
            }
        }

        return $data;
    }

    public function getCampaignByProjectId($projectId)
    {
        $dql = "SELECT 
                ptc.id AS id, 
                ptc.id AS projectCampaignId, 
                c.id AS campaignId, c.campaignName, 
                ptc.firstPointOfContactId,
                ptc.requestWritingTeam, ptc.writingTeamNotes,
                ptc.requestMusicTeam, ptc.musicTeamNotes, ptc.note,
                ptc.budget, ptc.budgetNote, ptc.por, ptc.invoiceContact, ptc.materialReceiveDate,
                ptc.approvedByBilling,
                ptc.customerId, cu.cardname AS customerName,
                ptc.channelId, ch.channelName
                FROM \Application\Entity\RediProjectToCampaign ptc
                INNER JOIN \Application\Entity\RediCampaign c
                  WITH ptc.campaignId=c.id
                LEFT JOIN \Application\Entity\RediCustomer cu
                  WITH cu.id = ptc.customerId
                LEFT JOIN \Application\Entity\RediChannel ch
                  WITH ch.channelId = ptc.channelId
                WHERE ptc.projectId=:project_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('project_id', $projectId);
        $query->execute();
        $result = $query->getArrayResult();

        foreach ($result as &$row) {
            $row['projectCampaignId'] = (int)$row['projectCampaignId'];
            $row['campaignId'] = (int)$row['campaignId'];

            if ($row['budget']) {
                $row['budget'] = (float)$row['budget'];
            }
        }

        return $result;
    }

    public function deleteProjectUser($projectId)
    {
        $dql = "DELETE FROM redi_project_user WHERE project_id=:project_id";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('project_id', $projectId);
        $query->execute();
    }

    public function getCommentByProjectId($projectId)
    {
        $dql = "SELECT
                  COUNT(c.id) AS total_count,
                  MIN(c.comment_read) AS read_c
                FROM
                  redi_comment c
                WHERE c.parent_id = :project_id
                  AND c.type_id = 3
                GROUP BY c.id ";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('project_id', $projectId);
        $query->execute();

        $result = $query->fetchAll();

        if (isset($result[0])) {
            $response = array(
                'count' => (int)$result[0]['total_count'],
                'unread' => ($result[0]['read_c']) ? 0 : 1
            );
        } else {
            $response = array(
                'count' => 0,
                'unread' => 0
            );
        }

        return $response;
    }

    public function getLastUpdateUserByProjectId($projectId, $imagePath)
    {
        $dql = "SELECT
                    ph2.user_id, u.first_name, u.last_name, u.image, u.nick_name
                  FROM
                    redi_project_history ph2
                  INNER JOIN redi_user u
                    ON u.id=ph2.user_id
                  WHERE ph2.project_id = :project_id
                  ORDER BY created_at DESC
                  LIMIT 1";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('project_id', $projectId);
        $query->execute();

        $result = $query->fetchAll();

        $response = array();

        if (isset($result[0])) {
            $response = array(
                'userId' => (int)$result[0]['user_id'],
                'name' => trim($result[0]['first_name'] . ' ' . $result[0]['last_name']),
                'nickName' => $result[0]['nick_name'],
                'image' => ($result[0]['image']) ? $imagePath . $result[0]['image'] : null,
            );
        }

        return $response;
    }

    public function getUserByProjectId($projectId, $imagePath)
    {
        $dql = "SELECT
                    pu.user_id as userId, u.first_name AS firstName, u.last_name AS lastName,
                    ur.id AS roleId, ur.role_name AS role,
                    u.image
                  FROM
                    redi_project_user pu
                  INNER JOIN redi_user u
                    ON u.id=pu.user_id
                  LEFT JOIN redi_user_role ur
                    ON ur.id=pu.role_id
                  WHERE pu.project_id = :project_id";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('project_id', $projectId);
        $query->execute();

        $result = $query->fetchAll();

        foreach ($result as &$row) {
            $row['userId'] = (int)$row['userId'];
            $row['fullName'] = trim($row['firstName'] . ' ' . $row['lastName']);
            $row['image'] = ($row['image']) ? $imagePath . $row['image'] : null;
            $row['roleId'] = (int)$row['roleId'];
        }

        return $result;
    }

    public function getPojectCampaign($projectId)
    {
        $dql = "SELECT ptc.campaignId, c.campaignName, ptc.firstPointOfContactId
                FROM \Application\Entity\RediProjectToCampaign ptc
                 INNER JOIN \Application\Entity\RediCampaign c
                  WITH ptc.campaignId=c.id
                WHERE ptc.projectId=:project_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('project_id', $projectId);
        return $query->getArrayResult();
    }

    public function getAllProjectEditorSataus()
    {
        $dql = "SELECT
                  pes
                FROM \Application\Entity\RediProjectEditorStatus pes ";

        $query = $this->getEntityManager()->createQuery($dql);
        return $query->getArrayResult();
    }

    public function getFullEditorProject($editorId = null, $offlset = 0, $lenght = 20)
    {
        $dql = "SELECT
                  p.id AS projectId,
                  c.id AS campaignId,
                  c.campaignName,
                  ptc.projectCampaignId,
                  s.id AS spotId,
                  s.spotName,
                  u.id AS editorUserId,
                  u.username as editorUserName,
                  CONCAT(u.firstName, ' ', u.lastName) AS editorFullName,
                  pep.notes,
                  pep.watched,
                  pep.brokenDown,
                  pep.due,
                  pep.dueDate,
                  pep.statusId,
                  pes.statusName,
                  pep.updatedAt
                FROM
                  \Application\Entity\RediEditorToSpot ets
                  INNER JOIN \Application\Entity\RediSpot s
                    WITH s.id = ets.spotId
                  INNER JOIN \Application\Entity\RediProjectToCampaign ptc
                    WITH ptc.id=s.projectCampaignId
                  INNER JOIN \Application\Entity\RediProject p
                    WITH p.id = ptc.projectId
                  INNER JOIN \Application\Entity\RediCampaign c
                    WITH c.id = ptc.campaignId
                  LEFT JOIN \Application\Entity\RediProjectEditorProgress pep
                    WITH pep.spotId = s.id
                    AND pep.projectId = s.projectId
                    AND pep.campaignId = s.campaignId
                  LEFT JOIN \Application\Entity\RediProjectEditorStatus pes
                    WITH pes.id = pep.statusId
                  INNER JOIN \Application\Entity\RediUser u
                    WITH u.id=ets.editorId ";

        if ($editorId) {
            $dql .= " WHERE ets.editorId = :editor_id ";
        }

        $dql .= " ORDER BY ets.editorId ASC, p.projectName ASC, pep.updatedAt DESC ";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offlset);
        $query->setMaxResults($lenght);

        if ($editorId) {
            $query->setParameter('editor_id', $editorId);
        }

        $result = $query->getArrayResult();

        return $result;
    }

    public function getSpotByProjectAndCampaign($projectId, $campaignId)
    {
        $dql = "SELECT s.id, s.spotName, s.revisionNotCounted, s.notes, s.revisions, s.graphicsRevisions,
                    s.billingType, s.billingNote, s.firstRevisionCost, s.internalDeadline, s.clientDeadline
                FROM \Application\Entity\RediSpot s
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                    WITH ptc.id=s.projectCampaignId
                WHERE
                  ptc.projectId=:project_id
                  AND ptc.campaignId=:campaign_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('project_id', $projectId);
        $query->setParameter('campaign_id', $campaignId);
        $data = $query->getArrayResult();

        foreach ($data as &$row) {
            $row['version'] = $this->getVersionBySpot($row['id']);
        }

        return $data;
    }

    public function getSpotByProjectCampaignId($projectCampaignId)
    {
        $dql = "SELECT s.id, s.spotName, s.revisionNotCounted, s.notes, s.revisions, s.graphicsRevisions,
                    s.billingType, s.billingNote, s.firstRevisionCost, s.internalDeadline, s.clientDeadline,
                    s.projectCampaignId
                FROM \Application\Entity\RediSpot s
                WHERE
                  s.projectCampaignId=:project_campaign_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('project_campaign_id', $projectCampaignId);
        $data = $query->getArrayResult();

        foreach ($data as &$row) {
            $row['version'] = $this->getVersionBySpot($row['id']);
        }

        return $data;
    }

    public function getUserByProjectAndCampaign($projectId, $campaignId, $imagePath = '')
    {
        $dql = "SELECT pcu.userId AS userId, u.username, u.email,
                u.firstName, u.lastName,
                u.typeId, ut.typeName as type,
                pcu.roleId, ur.roleName AS role,
                u.image
                FROM \Application\Entity\RediProjectToCampaign ptc
                INNER JOIN \Application\Entity\RediProjectToCampaignUser pcu
                  WITH ptc.id=pcu.projectCampaignId
                INNER JOIN \Application\Entity\RediUser u
                  WITH u.id=pcu.userId
                INNER JOIN \Application\Entity\RediUserType ut
                  WITH u.typeId=ut.id
                LEFT JOIN \Application\Entity\RediUserRole ur
                  WITH pcu.roleId=ur.id
                WHERE
                  ptc.projectId=:project_id
                  AND ptc.campaignId=:campaign_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('project_id', $projectId);
        $query->setParameter('campaign_id', $campaignId);
        $data = $query->getArrayResult();

        foreach ($data as &$row) {
            $row['image'] = $row['image'] ? $imagePath . $row['image'] : null;
            $row['fullName'] = trim($row['firstName'] . ' ' . $row['lastName']);
        }

        return $data;
    }

    public function getVersionBySpot($spotId)
    {
        $dql = "SELECT 
                sv.id AS spotVersionId,
                v.id, v.versionName, v.custom,
                sv.versionStatusId, vs.name AS versionStatusName, 
                sv.versionNote
                FROM \Application\Entity\RediSpotVersion sv
                INNER JOIN \Application\Entity\RediVersion v
                  WITH sv.versionId=v.id
                LEFT JOIN \Application\Entity\RediVersionStatus vs
                    WITH vs.id=sv.versionStatusId
                WHERE
                  sv.spotId=:spot_id 
                ORDER BY v.seq ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('spot_id', $spotId);
        $data = $query->getArrayResult();

        foreach ($data as &$row) {
            $row['spotVersionId'] = (int)$row['spotVersionId'];
            $row['editor'] = $this->getSpotVersionEditor($row['spotVersionId']);
        }

        return $data;
    }

    public function getHistoryByProjectId($projectId, $imagePath)
    {
        $dql = "SELECT
                  ph.id, ph.message, ph.userId, u.username, u.firstName, u.lastName, '' AS fullName,
                  u.image, ph.createdAt
                FROM \Application\Entity\RediProjectHistory ph
                INNER JOIN \Application\Entity\RediUser u
                  WITH ph.userId=u.id
                WHERE
                  ph.projectId=:project_id
                ORDER BY ph.createdAt DESC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('project_id', $projectId);
        $data = $query->getArrayResult();

        foreach ($data as &$row) {
            $row['fullName'] = trim($row['firstName'] . ' ' . $row['lastName']);

            if ($row['image']) {
                $row['image'] = $imagePath . $row['image'];
            } else {
                $row['image'] = null;
            }
        }

        return $data;
    }

    public function getProjectName($projectId, $userTypeId, $projectNameOnly = false)
    {
        // Get project data
        $projectDql = "SELECT p
                FROM \Application\Entity\RediProject p
                WHERE
                  p.id=:project_id ";

        $query = $this->getEntityManager()->createQuery($projectDql);
        $query->setParameter('project_id', $projectId);
        $query->setMaxResults(1);
        $projectData = $query->getArrayResult();

        if (!empty($projectData[0])) {
            $project = $projectData[0];
        } else {
            return array();
        }

        $userRepo = new UsersRepository($this->_entityManager);
        $userPermission = $userRepo->getUserPermission($userTypeId, true);

        $projectNameView = $userRepo->extractPermission($userPermission, 2, 'view_or_edit');
        $projectCodeNameView = $userRepo->extractPermission($userPermission, 31, 'view_or_edit');

        $projectName = $project['projectName'];
        $projectCodeName = $project['projectCode'];
        $result = array();

        if ($projectNameView && $projectCodeNameView) {
            $result['projectName'] = $projectName;
            $result['projectCode'] = $projectCodeName;
        } else if ($projectNameView || $projectCodeNameView) {
            if ($projectCodeName) {
                $result['projectCode'] = $projectCodeName;
            } else {
                $result['projectName'] = $projectName;
            }
        }

        if ($projectNameOnly) {
            if (empty($result['projectName']) && !empty($project['projectCode'])) {
                $result['projectName'] = $result['projectCode'];
            }

            unset($result['projectCode']);
        }

        return $result;
    }

    public function getSpotVersionEditor($spotVersionId)
    {
        $dql = "SELECT 
                  u.id, 
                  u.firstName, u.lastName,
                  u.username,
                  u.initials
                FROM \Application\Entity\RediSpotVersionEditor sve
                  INNER JOIN \Application\Entity\RediUser u
                    WITH u.id = sve.userId
                  WHERE sve.spotVersionId = :spot_version_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('spot_version_id', $spotVersionId);
        $result = $query->getArrayResult();

        foreach ($result as &$row) {
            $row['name'] = trim($row['firstName'] . ' ' . $row['lastName']);

            $row['id'] = (int)$row['id'];

            unset($row['firstName']);
            unset($row['lastName']);
        }

        return $result;
    }

    public function getFilters($filter = array())
    {
        $dql = "SELECT
                  p.id AS projectId,
                  ptc.id AS projectCampaignId,
                  ca.id AS campaignId,
                  ca.campaignName,
                  sp.id AS spotId,
                  sp.spotName,
                  sv.id AS spotVersionId,
                  v.id AS versionId,
                  v.versionName
                FROM \Application\Entity\RediProject p
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                    WITH p.id=ptc.projectId
                LEFT JOIN \Application\Entity\RediCampaign ca
                    WITH ca.id=ptc.campaignId
                LEFT JOIN \Application\Entity\RediSpot sp
                    WITH sp.projectCampaignId = ptc.id
                LEFT JOIN \Application\Entity\RediSpotVersion sv
                    WITH sv.spotId = sp.id
                LEFT JOIN \Application\Entity\RediVersion v
                    WITH v.id = sv.versionId
                 ";

        // If user user does not have access to all time entry
        // (if user does not belong to those selected user type)
        // then join tables to get only the projects he is assigned to
        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $dql .= " LEFT JOIN \Application\Entity\RediProjectToCampaignBilling ptcb
                        WITH ptcb.projectCampaignId=ptc.id
                      LEFT JOIN \Application\Entity\RediProjectToCampaignDesigner ptcd
                        WITH ptcd.projectCampaignId=ptc.id
                      LEFT JOIN \Application\Entity\RediProjectToCampaignEditor ptce
                        WITH ptce.projectCampaignId=ptc.id ";
        }

        $dqlFilter = [];

        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $dqlFilter[] = " (ptcu.userId = :project_to_campaign_user_id
                              OR ptcb.userId = :project_to_campaign_user_id
                              OR ptcd.userId = :project_to_campaign_user_id
                              OR ptce.userId = :project_to_campaign_user_id
                              OR p.createdByUserId = :project_to_campaign_user_id
                              OR ca.createdByUserId = :project_to_campaign_user_id) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= ' GROUP BY p.id, ca.id, sp.id, v.id
                ORDER BY p.projectName ASC, 
                        p.projectCode ASC,
                        ca.campaignName ASC,
                        sp.spotName ASC,
                        v.versionName ASC';

        $query = $this->getEntityManager()->createQuery($dql);

        if (empty($filter['all_project_access']) && !empty($filter['project_to_campaign_user_id'])) {
            $query->setParameter('project_to_campaign_user_id', $filter['project_to_campaign_user_id']);
        }

        $result = $query->getArrayResult();

        $response = array();

        foreach($result as $row) {
            if(empty($response[$row['projectId']])) {
                $response[$row['projectId']] = array(
                    'projectId' => (int)$row['projectId'],
                    'campaign' => array(),
                );
            }

            if(empty($row['campaignId'])) continue;

            if(empty($response[$row['projectId']]['campaign'][$row['campaignId']])) {
                $response[$row['projectId']]['campaign'][$row['campaignId']] = array(
                    'campaignId' => (int)$row['campaignId'],
                    'projectCampaignId' => (int)$row['projectCampaignId'],
                    'campaignName' => $row['campaignName'],
                    'spot' => array(),
                );
            }

            if(empty($row['spotId'])) continue;

            if(empty($response[$row['projectId']]['campaign'][$row['campaignId']]['spot'][$row['spotId']])) {
                $response[$row['projectId']]['campaign'][$row['campaignId']]['spot'][$row['spotId']] = array(
                    'spotId' => (int)$row['spotId'],
                    'spotName' => $row['spotName'],
                    'version' => array(),
                );
            }

            if(empty($row['versionId'])) continue;

            if(empty($response[$row['projectId']]['campaign'][$row['campaignId']]['spot'][$row['spotId']]['version'][$row['versionId']])) {
                $response[$row['projectId']]['campaign'][$row['campaignId']]['spot'][$row['spotId']]['version'][$row['versionId']] = array(
                    'versionId' => (int)$row['versionId'],
                    'spotVersionId' => (int)$row['spotVersionId'],
                    'versionName' => $row['versionName'],
                );
            }
        }

        $response = array_values($response);

        foreach($response as &$project) {
            if(empty($project['campaign'])) continue;

            $project['campaign'] = array_values($project['campaign']);

            foreach($project['campaign'] as &$campaign) {
                if(empty($campaign['spot'])) continue;

                $campaign['spot'] = array_values($campaign['spot']);

                foreach($campaign['spot'] as &$spot) {
                    if(empty($spot['version'])) continue;

                    $spot['version'] = array_values($spot['version']);
                }
            }
        }

        return $response;
    }
}
