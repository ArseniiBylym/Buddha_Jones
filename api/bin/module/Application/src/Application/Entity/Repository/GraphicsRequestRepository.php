<?php

namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;
use Zend\I18n\Validator\DateTime;

class GraphicsRequestRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediGraphicsRequest";

    public function __construct(EntityManager $entityManager)
    {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);
    }

    public function search($offset = 0, $length = 10, $filter = array())
    {
        $dql = "SELECT  
                  gr.id, 
                  gr.projectId, p.projectName,
                  gr.campaignId, c.campaignName,
                  gr.spotId, s.spotName,
                  gr.versionId, v.versionName,
                  gr.resolution, gr.resolutionNote,
                  grd.frameRate,  grd.priority, grd.priorityDate, grd.burnIn,
                  grf.finisherId, '' AS finisher, uf.firstName AS finisherFirstName, uf.lastName AS finisherLastName,
                  grf.formatComped, grf.formatTextless, grf.formatKeyable, 
                  grf.checkerDue, grf.checkerDueDate,
                  grf.finalRendersDue, grf.finalRendersDueDate,
                  grf.finishingAt, grf.finishingContact, 
                  grf.projectCollect, grf.projectCollectNote,
                  grf.stereoFinish, grf.stereoFinishNote,
                  gr.note, 
                  gr.statusId, grs.name as status,
                  gr.createdByUserId, '' AS createdByUser, u.firstName, u.lastName,
                  gr.createdAt, gr.updatedAt, 
                  gr.urgent, gr.inHouse, ";

        if($filter['user_type_id']==2) {
            $dql .= " gra.accepted,
                    (CASE 
                    WHEN (gra.accepted=1 AND gr.urgent=1) THEN 3
                    WHEN (gra.accepted=1 AND gr.urgent=0) THEN 2
                    WHEN (gra.accepted=0 AND gr.urgent=1) THEN 1
                    ELSE 0
                  END) AS custom_sort_order ";
        } else if($filter['user_type_id']==3) {
            $dql .= " (CASE 
                    WHEN (gr.statusId=1) THEN 5
                    WHEN (gr.statusId=2 AND gr.createdByUserId=:user_id) THEN 4
                    WHEN (gr.statusId=3 AND gr.createdByUserId=:user_id) THEN 3
                    WHEN (gr.statusId=4 AND gr.createdByUserId=:user_id) THEN 2
                    WHEN (gr.statusId=5 AND gr.createdByUserId=:user_id) THEN 1
                    ELSE 0
                  END) AS custom_sort_order ";
        } else if($filter['user_type_id']==8) {
            $dql .= " (CASE 
                    WHEN (gr.statusId=2 AND gr.urgent=1) THEN 6
                    WHEN (gr.statusId=2 AND gr.urgent=0) THEN 5
                    WHEN (gr.statusId=3 AND gr.urgent=1) THEN 4
                    WHEN (gr.statusId=3 AND gr.urgent=0) THEN 3
                    WHEN (gr.statusId=4 AND gr.urgent=1) THEN 3
                    WHEN (gr.statusId=4 AND gr.urgent=0) THEN 2
                    WHEN (gr.statusId=5) THEN 1
                    ELSE 0
                  END) AS custom_sort_order ";
        }

        $dql .= " FROM \Application\Entity\RediGraphicsRequest gr 
                LEFT JOIN \Application\Entity\RediGraphicsRequestDesign grd
                  WITH gr.id=grd.graphicsRequestId 
                LEFT JOIN \Application\Entity\RediGraphicsRequestFinishing grf 
                  WITH grf.graphicsRequestId=gr.id 
                LEFT JOIN \Application\Entity\RediSpot s
                  WITH gr.spotId=s.id 
                LEFT JOIN \Application\Entity\RediVersion v
                  WITH gr.versionId=v.id 
                LEFT JOIN \Application\Entity\RediStatus st 
                  WITH gr.statusId=st.id 
                LEFT JOIN \Application\Entity\RediProject p
                  WITH p.id=gr.projectId
                LEFT JOIN \Application\Entity\RediCampaign c
                  WITH c.id=gr.campaignId
                LEFT JOIN \Application\Entity\RediGraphicsRequestStatus grs
                  WITH grs.id=gr.statusId 
                LEFT JOIN \Application\Entity\RediUser u
                  WITH gr.createdByUserId=u.id
                LEFT JOIN \Application\Entity\RediUser uf
                  WITH grf.finisherId=uf.id  ";

        if($filter['user_type_id']==2) {
            $dql .= " INNER JOIN \Application\Entity\RediGraphicsRequestAssign gra
                  WITH gra.graphicsRequestId=gr.id AND gra.assignedToUserId=:user_id";
        }

        $dqlFilter = [];

        if (isset($filter['id']) && $filter['id']) {
            $dqlFilter[] = " gr.id=:id ";
        }
        if (isset($filter['status_id']) && $filter['status_id']) {
            $dqlFilter[] = " gr.statusId=:status_id ";
        }

        if($filter['user_type_id']==3) {
            $dqlFilter[] = "  gr.createdByUserId=:user_id ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY custom_sort_order DESC ";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        if (isset($filter['status_id']) && $filter['status_id']) {
            $query->setParameter('status_id', $filter['status_id']);
        }

        if (isset($filter['id']) && $filter['id']) {
            $query->setParameter('id', $filter['id']);
        }

        if(in_array($filter['user_type_id'], array(2, 3))) {
            $query->setParameter('user_id', $filter['user_id']);
        }

        $data = $query->getArrayResult();

        foreach ($data as &$row) {
            $row['id'] = (int)$row['id'];
            $row['projectId'] = $row['projectId']?(int)$row['projectId']:null;
            $row['campaignId'] = $row['campaignId']?(int)$row['campaignId']:null;
            $row['spotId'] = $row['spotId']?(int)$row['spotId']:null;
            $row['versionId'] = $row['versionId']?(int)$row['versionId']:null;
            $row['statusId'] = $row['statusId']?(int)$row['statusId']:null;
            $row['createdByUserId'] = $row['createdByUserId']?(int)$row['createdByUserId']:null;
            $row['projectCollect'] = $row['projectCollect']?(int)$row['projectCollect']:null;
            $row['stereoFinish'] = $row['stereoFinish']?(int)$row['stereoFinish']:null;
            $row['createdAt'] = $row['createdAt']->format('Y-m-d H:i:s');
            $row['createdByUser'] = trim($row['firstName'] . ' ' . $row['lastName']);
            $row['finisher'] = trim($row['finisherFirstName'] . ' ' . $row['finisherLastName']);

            if ($row['updatedAt']) {
                $row['updatedAt'] = $row['updatedAt']->format('Y-m-d H:i:s');
            }

            if ($row['priorityDate']) {
                $row['priorityDate'] = $row['priorityDate']->format('Y-m-d H:i:s');
            }

            if ($row['checkerDueDate']) {
                $row['checkerDueDate'] = $row['checkerDueDate']->format('Y-m-d H:i:s');
            }

            if ($row['finalRendersDueDate']) {
                $row['finalRendersDueDate'] = $row['finalRendersDueDate']->format('Y-m-d H:i:s');
            }

            unset($row['firstName']);
            unset($row['lastName']);
            unset($row['finisherFirstName']);
            unset($row['finisherLastName']);
            unset($row['custom_sort_order']);
        }

        return $data;
    }

    public function searchCount($filter = array())
    {
        $dql = "SELECT  
                  COUNT(gr.id) AS total_count 
                FROM \Application\Entity\RediGraphicsRequest gr ";

        if($filter['user_type_id']==2) {
            $dql .= " INNER JOIN \Application\Entity\RediGraphicsRequestAssign gra
                  WITH gra.graphicsRequestId=gr.id AND gra.assignedToUserId=:user_id";
        }

        $dqlFilter = [];

        if (isset($filter['id']) && $filter['id']) {
            $dqlFilter[] = " gr.id=:id ";
        }
        if (isset($filter['status_id']) && $filter['status_id']) {
            $dqlFilter[] = " gr.statusId=:status_id ";
        }

        if($filter['user_type_id']==3) {
            $dqlFilter[] = "  gr.createdByUserId=:user_id ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }


        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['status_id']) && $filter['status_id']) {
            $query->setParameter('status_id', $filter['status_id']);
        }

        if (isset($filter['id']) && $filter['id']) {
            $query->setParameter('id', $filter['id']);
        }

        if(in_array($filter['user_type_id'], array(2, 3))) {
            $query->setParameter('user_id', $filter['user_id']);
        }

        $result = $query->getArrayResult();


        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }

    public function getById($id)
    {
        $result = $this->search(0, 1, array('id' => $id));
        $response = (isset($result[0]) ? $result[0] : null);

        if($response) {
            $response['files'] = $this->getGraphicsRequestFiles($id);
        }

        return $response;
    }

    public function getGraphicsRequestFiles($id)
    {
        $dql = "SELECT 
                    f
                FROM \Application\Entity\RediGraphicsRequestFile f
                WHERE f.graphicsRequestId=:id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('id', $id);

        $data = $query->getArrayResult();
        $response = array();

        foreach ($data as $row) {
            $response[] = $row['fileName'];
        }

        return $response;
    }

    public function searchAssigned($offset = 0, $length = 10, $filter = array())
    {
        $dql = "SELECT  
                  gra.id, gra.graphicsRequestId,
                  gra.assignedToUserId, ua.firstName AS assignedToFirstName, ua.lastName AS assignedToLastName,
                  gra.accepted, gra.urgent,
                  gr.projectId, p.projectName,
                  gr.campaignId, c.campaignName,
                  gr.spotId, s.spotName,
                  gr.versionId, v.versionName,
                  gr.resolution, gr.resolutionNote,
                  gr.note, 
                  gra.createdByUserId, '' AS createdByUser, u.firstName AS createdByFirstName, u.lastName AS createdByLastName,
                  gra.createdAt, gra.updatedAt
                FROM \Application\Entity\RediGraphicsRequest gr 
                INNER JOIN \Application\Entity\RediGraphicsRequestAssign gra 
                  WITH gr.id=gra.graphicsRequestId
                LEFT JOIN \Application\Entity\RediSpot s
                  WITH gr.spotId=s.id 
                LEFT JOIN \Application\Entity\RediVersion v
                  WITH gr.versionId=v.id 
                LEFT JOIN \Application\Entity\RediProject p
                  WITH p.id=gr.projectId
                LEFT JOIN \Application\Entity\RediCampaign c
                  WITH c.id=gr.campaignId
                LEFT JOIN \Application\Entity\RediUser u
                  WITH gra.createdByUserId=u.id
                LEFT JOIN \Application\Entity\RediUser ua
                  WITH gra.assignedToUserId=ua.id ";

        $dqlFilter = [];

        if (isset($filter['graphics_request_id']) && $filter['graphics_request_id'] !== null) {
            $dqlFilter[] = " gra.graphicsRequestId=:graphics_request_id ";
        }

        if (isset($filter['assigned_to_user_id']) && $filter['assigned_to_user_id'] !== null) {
            $dqlFilter[] = " gra.assignedToUserId=:assigned_to_user_id ";
        }

        if (isset($filter['accepted']) && $filter['accepted'] !== null) {
            $dqlFilter[] = " gra.accepted=:accepted ";
        }

        if (isset($filter['urgent']) && $filter['urgent'] !== null) {
            $dqlFilter[] = " gra.urgent=:urgent ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        if (isset($filter['sort']) && strtolower($filter['sort']) == 'accepted') {
            $dql .= " ORDER BY gra.accepted ";
        } else if (isset($filter['sort']) && strtolower($filter['sort']) == 'urgent') {
            $dql .= " ORDER BY gra.urgent ";
        } else if (isset($filter['sort']) && strtolower($filter['sort']) == 'createdat') {
            $dql .= " ORDER BY gra.createdAt ";
        } else {
            $dql .= " ORDER BY gra.id ";
        }

        if (isset($filter['sort_order']) && strtolower($filter['sort_order']) == 'desc') {
            $dql .= " DESC, gra.id DESC ";
        } else {
            $dql .= " ASC, gra.id ASC ";
        }


        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        if (isset($filter['graphics_request_id']) && $filter['graphics_request_id']) {
            $query->setParameter('graphics_request_id', $filter['graphics_request_id']);
        }

        if (isset($filter['assigned_to_user_id']) && $filter['assigned_to_user_id']) {
            $query->setParameter('assigned_to_user_id', $filter['assigned_to_user_id']);
        }

        if (isset($filter['accepted']) && $filter['accepted']) {
            $query->setParameter('accepted', $filter['accepted']);
        }

        if (isset($filter['urgent']) && $filter['urgent']) {
            $query->setParameter('urgent', $filter['urgent']);
        }

        $data = $query->getArrayResult();

        foreach ($data as &$row) {
            $row['id'] = (int)$row['id'];
            $row['graphicsRequestId'] = (int)$row['graphicsRequestId'];
            $row['assignedToUserId'] = (int)$row['assignedToUserId'];
            $row['projectId'] = $row['projectId']?(int)$row['projectId']:null;
            $row['campaignId'] = $row['campaignId']?(int)$row['campaignId']:null;
            $row['spotId'] = $row['spotId']?(int)$row['spotId']:null;
            $row['versionId'] = $row['versionId']?(int)$row['versionId']:null;
//            $row['statusId'] = $row['statusId']?(int)$row['statusId']:null;
            $row['createdByUserId'] = $row['createdByUserId']?(int)$row['createdByUserId']:null;
//            $row['projectCollect'] = $row['projectCollect']?(int)$row['projectCollect']:null;
//            $row['stereoFinish'] = $row['stereoFinish']?(int)$row['stereoFinish']:null;
//            $row['createdAt'] = $row['createdAt']->format('Y-m-d H:i:s');
            $row['createdByUser'] = trim($row['createdByFirstName'] . ' ' . $row['createdByLastName']);
            $row['assignedToUser'] = trim($row['assignedToFirstName'] . ' ' . $row['assignedToLastName']);
//            $row['finisher'] = trim($row['finisherFirstName'] . ' ' . $row['finisherLastName']);

            if ($row['createdAt']) {
                $row['createdAt'] = $row['createdAt']->format('Y-m-d H:i:s');
            }

            if ($row['updatedAt']) {
                $row['updatedAt'] = $row['updatedAt']->format('Y-m-d H:i:s');
            }

            unset($row['createdByFirstName']);
            unset($row['createdByLastName']);
            unset($row['assignedToFirstName']);
            unset($row['assignedToLastName']);
        }

        return $data;
    }

    public function searchAssignedCount($filter = array())
    {
        $dql = "SELECT 
                  COUNT(gr.id) AS total_count 
                FROM \Application\Entity\RediGraphicsRequest gr 
                INNER JOIN \Application\Entity\RediGraphicsRequestAssign gra 
                  WITH gr.id=gra.graphicsRequestId";

        $dqlFilter = [];

        if (isset($filter['graphics_request_id']) && $filter['graphics_request_id'] !== null) {
            $dqlFilter[] = " gra.graphicsRequestId=:graphics_request_id ";
        }

        if (isset($filter['assigned_to_user_id']) && $filter['assigned_to_user_id'] !== null) {
            $dqlFilter[] = " gra.assignedToUserId=:assigned_to_user_id ";
        }

        if (isset($filter['accepted']) && $filter['accepted'] !== null) {
            $dqlFilter[] = " gra.accepted=:accepted ";
        }

        if (isset($filter['urgent']) && $filter['urgent'] !== null) {
            $dqlFilter[] = " gra.urgent=:urgent ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (isset($filter['graphics_request_id']) && $filter['graphics_request_id']) {
            $query->setParameter('graphics_request_id', $filter['graphics_request_id']);
        }

        if (isset($filter['assigned_to_user_id']) && $filter['assigned_to_user_id']) {
            $query->setParameter('assigned_to_user_id', $filter['assigned_to_user_id']);
        }

        if (isset($filter['accepted']) && $filter['accepted']) {
            $query->setParameter('accepted', $filter['accepted']);
        }

        if (isset($filter['urgent']) && $filter['urgent']) {
            $query->setParameter('urgent', $filter['urgent']);
        }


        $result = $query->getArrayResult();


        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }
}
