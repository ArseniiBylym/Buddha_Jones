<?php
namespace Application\Entity\Repository;

use Application\Entity\RediSpotSentViaMethod;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;

// before called Table now Repository Table Data Gateway
// In Bug Entity add  @Entity(repositoryClass="BugRepository")
// To be able to use this query logic through
// $this->getEntityManager()->getRepository('Bug') we have to adjust the metadata slightly.
// http://stackoverflow.com/questions/10481916/the-method-name-must-start-with-either-findby-or-findoneby-uncaught-exception

class SpotRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediSpot";
    private $_entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);

        $this->_entityManager = $entityManager;
    }

    public function search($filter, $offset = 0, $length = 10)
    {
        $dql = "SELECT a.id,
                    a.spotName,
                    a.projectCampaignId,
                    a.revisionNotCounted,
                    a.notes,
                    a.revisions,
                    a.graphicsRevisions,
                    a.firstRevisionCost,
                    a.internalDeadline,
                    a.clientDeadline,
                    a.billingType,
                    a.billingNote, 
                    ptc.projectId, 
                    ptc.campaignId,
                    a.trtId,
                    trt.runtime
                FROM \Application\Entity\RediSpot a 
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc 
                    WITH a.projectCampaignId=ptc.id
                LEFT JOIN \Application\Entity\RediTrt trt
                    WITH trt.id = a.trtId";

        $dqlFilter = [];

        if (!empty($filter['project_id'])) {
            $dqlFilter[] = "ptc.projectId= " . (int)$filter['project_id'];
        }

        if (!empty($filter['campaign_id'])) {
            $dqlFilter[] = "ptc.campaignId= " . (int)$filter['campaign_id'];
        }

        if (!empty($filter['project_campaign_id'])) {
            $dqlFilter[] = "a.projectCampaignId= " . (int)$filter['project_campaign_id'];
        }

        if (!empty($filter['search'])) {
            $dqlFilter[] = "(a.spotName LIKE '%" . $filter['search'] . "%' )";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY a.spotName ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);
        $result = $query->getArrayResult();

        foreach ($result as &$row) {
            $row['id'] = (int)$row['id'];
        }

        return $result;
    }

    public function searchCount($filter)
    {
        $dql = "SELECT COUNT(a.id) AS total_count 
                FROM \Application\Entity\RediSpot a 
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc 
                    WITH a.projectCampaignId=ptc.id ";


        $dqlFilter = [];

        if (!empty($filter['project_id'])) {
            $dqlFilter[] = "ptc.projectId= " . (int)$filter['project_id'];
        }

        if (!empty($filter['campaign_id'])) {
            $dqlFilter[] = "ptc.campaignId= " . (int)$filter['campaign_id'];
        }

        if (!empty($filter['project_campaign_id'])) {
            $dqlFilter[] = "a.projectCampaignId= " . (int)$filter['project_campaign_id'];
        }

        if (!empty($filter['search'])) {
            $dqlFilter[] = "(a.spotName LIKE '%" . $filter['search'] . "%' )";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY a.id ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $result = $query->getArrayResult();

        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }

    public function getById($spotId)
    {
        $dql = "SELECT
                a.id,
                a.spotName,
                a.projectCampaignId,
                a.revisionNotCounted,
                a.notes,
                a.revisions,
                a.graphicsRevisions,
                a.firstRevisionCost,
                a.internalDeadline,
                a.clientDeadline,
                a.billingType,
                a.billingNote,
                a.trtId,
                trt.runtime
                FROM \Application\Entity\RediSpot a 
                LEFT JOIN \Application\Entity\RediTrt trt
                    WITH trt.id = a.trtId
                WHERE a.id=:spot_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setMaxResults(1);
        $query->setParameter('spot_id', $spotId);

        $data = $query->getArrayResult();

        return (isset($data[0]) ? $data[0] : null);
    }

    public function searchSpotSent($filter = array())
    {
        if (!empty($filter['details'])) {
            $columns = array(
                "requestId",
                "projectId",
                "fullLock",
                "finishOption",
                "notes",
                "internalNote",
                "studioNote",
                "deadline",
                "spotSentDate",
                "finishingHouse",
                "framerate",
                "framerateNote",
                "rasterSize",
                "rasterSizeNote",
                "musicCueSheet",
                "gfxFinish",
                "audioPrep",
                "audio",
                "audioNote",
                "videoPrep",
                "graphicsFinish",
                "specNote",
                "specSheetFile",
                "tagChart",
                "deliveryToClient",
                "deliveryNote",
                "spotResend",
                "statusId",
                // "editor",
                "customerContact",
                "createdBy",
                "updatedBy",
                "createdAt",
                "updatedAt",
            );
        } else {
            $columns = array(
                "requestId",
                "projectId",
                "statusId",
                "spotSentDate",
                "createdBy",
                "createdAt",
                "updatedBy",
                "updatedAt",
            );
        }

        $columns = array_map(function ($column) {
            return "sc." . $column;
        }, $columns);

        $columnString = implode(',', $columns);

        $offset = (!empty($filter['offset'])) ? (int)$filter['offset'] : 0;
        $length = (!empty($filter['length'])) ? (int)$filter['length'] : 10;

        $dql = "SELECT 
                " . $columnString . ",
                uc.firstName AS createdByFirstName, uc.lastName AS createdByLastName,
                uu.firstName AS updatedByFirstName, uu.lastName AS updatedByLastName,
                CASE 
                    WHEN sc.updatedAt IS NOT NULL THEN sc.updatedAt
                    ELSE sc.createdAt
                END  AS sortBy
                FROM \Application\Entity\RediSpotSent sc
                LEFT JOIN \Application\Entity\RediUser uc
                    WITH uc.id = sc.createdBy
                LEFT JOIN \Application\Entity\RediUser uu
                    WITH uu.id = sc.updatedBy
                LEFT JOIN \Application\Entity\RediCampaign c
                    WITH c.id = sc.campaignId  ";

        $dqlFilter = [];

        if (!empty($filter['id'])) {
            $dqlFilter[] = "sc.id= :id";
        }

        if (!empty($filter['request_id'])) {
            $dqlFilter[] = "sc.requestId= :request_id";
        }

        if (!empty($filter['status_id'])) {
            $dqlFilter[] = "sc.statusId = :status_id";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " GROUP BY sc.requestId ";

        if (!empty($filter['sort']) && $filter['sort'] === 'priority') {
            $orderBy = " ORDER BY sc.statusId ASC, sc.updatedAt DESC ";
        } else {
            $orderBy = " ORDER BY sortBy DESC, sc.statusId ASC, sc.requestId DESC ";
        }

        $dql .= $orderBy;

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        if (!empty($filter['id'])) {
            $query->setParameter("id", $filter['id']);
        }

        if (!empty($filter['request_id'])) {
            $query->setParameter("request_id", $filter['request_id']);
        }

        if (!empty($filter['status_id'])) {
            $query->setParameter("status_id", $filter['status_id']);
        }

        $result = $query->getArrayResult();

        $methodes = $this->getSpotSentOption('sent_via_method');
        $finishingOptions = $this->getSpotSentOption('finishing_option');
        $audioOptions = $this->getSpotSentOption('audio_option');
        $delToClientOption = $this->getSpotSentOption('delivery_to_client_option');
        $allStatus = $this->getSpotSentOption('status');
        $allStatusArray = array();

        foreach ($allStatus as $row) {
            $allStatusArray[$row['id']] = $row;
        }

        foreach ($result as &$row) {
            unset($row['sortBy']);

            $row['requestId'] = (int)$row['requestId'];
            $row['projectId'] = (int)$row['projectId'];
            $row['statusId'] = (int)$row['statusId'];
            $row['createdByUser'] = trim($row['createdByFirstName'] . ' ' . $row['createdByLastName']);
            $row['updatedByUser'] = trim($row['updatedByFirstName'] . ' ' . $row['updatedByLastName']);
            $row['statusName'] = (!empty($row['statusId'])
                && !empty($allStatusArray[$row['statusId']]['name']))
                ? $allStatusArray[$row['statusId']]['name']
                : null;

            if (empty($row['updatedAt'])) {
                $row['updatedAt'] = $row['createdAt'];
                $row['updatedBy'] = $row['createdBy'];
                $row['updatedByUser'] = $row['createdByUser'];
            }

            unset($row['createdByFirstName']);
            unset($row['createdByLastName']);
            unset($row['updatedByFirstName']);
            unset($row['updatedByLastName']);

            $row['spotData'] = $this->getSpotVersionDataByRequestId($row['requestId']);

            foreach ($row['spotData'] as &$spotDataRow) {
                $spotDataRow['lineStatusName'] = (!empty($spotDataRow['lineStatusId'])
                    && !empty($allStatusArray[$spotDataRow['lineStatusId']]['name']))
                    ? $allStatusArray[$spotDataRow['lineStatusId']]['name']
                    : null;
            }

            if (!empty($filter['details'])) {
                foreach ($row['spotData'] as &$spotDataRow) {
                    if (!empty($spotDataRow['sentViaMethod'])) {
                        $methodIds = explode(',', $spotDataRow['sentViaMethod']);

                        if (count($methodIds)) {
                            $methodIds = array_map('trim', $methodIds);

                            $spotDataRow['sentViaMethodList'] = array_values(array_filter($methodes, function ($method) use ($methodIds) {
                                return in_array($method['id'], $methodIds);
                            }));
                        }
                    } else {
                        $spotDataRow['sentViaMethodList'] = array();
                    }

                    if (!empty($spotDataRow['editor'])) {
                        $editorIds = explode(',', $spotDataRow['editor']);

                        if (count($editorIds)) {
                            $editorIds = array_map('trim', $editorIds);
                            $userRepo = new UsersRepository($this->_entityManager);
                            $spotDataRow['editorList'] = $userRepo->getUsersById($editorIds);
                        }
                    } else {
                        $spotDataRow['editorList'] = array();
                    }
                }

                if (!empty($row['finishOption'])) {
                    $finishingOptionIds = explode(',', $row['finishOption']);

                    if (count($finishingOptionIds)) {
                        $finishingOptionIds = array_map('trim', $finishingOptionIds);

                        if (count($finishingOptionIds) === 2) {
                            $row['finishOptionList'] = array_values(array_filter($finishingOptions, function ($option) use ($finishingOptionIds) {
                                return $option['id'] == $finishingOptionIds[0];
                            }));

                            if (count($row['finishOptionList'])) {
                                $row['finishOptionList'] = $row['finishOptionList'][0];
                                $row['finishOptionList']['children'] = array_values(array_filter($row['finishOptionList']['children'], function ($option) use ($finishingOptionIds) {
                                    return $option['id'] == $finishingOptionIds[1];
                                }));
                            }
                        } else {
                            $row['finishOptionList'] = null;
                        }
                    }
                }

                if (!empty($row['audio'])) {
                    $optionIds = explode(',', $row['audio']);

                    if (count($optionIds)) {
                        $optionIds = array_map('trim', $optionIds);

                        $row['audioList'] = array_values(array_filter($audioOptions, function ($option) use ($optionIds) {
                            return in_array($option['id'], $optionIds);
                        }));
                    }
                }

                if (!empty($row['deliveryToClient'])) {
                    $deliveryToClientIds = explode(',', $row['deliveryToClient']);

                    if (count($deliveryToClientIds)) {
                        $deliveryToClientIds = array_map('trim', $deliveryToClientIds);

                        if (count($deliveryToClientIds) === 2) {
                            $row['deliveryToClientList'] = array_values(array_filter($delToClientOption, function ($option) use ($deliveryToClientIds) {
                                return $option['id'] == $deliveryToClientIds[0];
                            }));

                            if (count($row['deliveryToClientList'])) {
                                $row['deliveryToClientList'] = $row['deliveryToClientList'][0];
                                $row['deliveryToClientList']['children'] = array_values(array_filter($row['deliveryToClientList']['children'], function ($option) use ($deliveryToClientIds) {
                                    return $option['id'] == $deliveryToClientIds[1];
                                }));
                            }
                        } else {
                            $row['deliveryToClientList'] = null;
                        }
                    }
                }

                if (!empty($row['customerContact'])) {
                    $customerContactIds = explode(',', $row['customerContact']);

                    if (count($customerContactIds)) {
                        $customerContactIds = array_map('trim', $customerContactIds);
                        $customerRepo = new CustomerRepository($this->_entityManager);

                        $row['customerContactList'] = $customerRepo->getCustomerContactsById($customerContactIds);
                    }
                }

            }
        }

        return $result;
    }

    public function searchSpotSentCount($filter = array())
    {
        $dql = "SELECT COUNT(DISTINCT sc.requestId) AS total_count 
                FROM \Application\Entity\RediSpotSent sc ";

        $dqlFilter = [];

        if (!empty($filter['id'])) {
            $dqlFilter[] = "sc.id= :id";
        }

        if (!empty($filter['request_id'])) {
            $dqlFilter[] = "sc.reqeustId= :request_id";
        }

        if (!empty($filter['status_id'])) {
            $dqlFilter[] = "sc.statusId = :status_id";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (!empty($filter['id'])) {
            $query->setParameter("id", $filter['id']);
        }

        if (!empty($filter['request_id'])) {
            $query->setParameter("request_id", $filter['request_id']);
        }

        if (!empty($filter['status_id'])) {
            $query->setParameter("status_id", $filter['status_id']);
        }

        $result = $query->getArrayResult();

        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }

    public function validateWorkStageForSpotSent($workStage)
    {
        if (count($workStage)) {
            $dql = "SELECT DISTINCT COALESCE(ws.parentId, 0) as distinctParentId
                FROM \Application\Entity\RediWorkStage ws 
                WHERE ws.id IN (:work_stage_ids)";

            $query = $this->getEntityManager()->createQuery($dql);
            $query->setParameter("work_stage_ids", $workStage);

            $result = $query->getArrayResult();

            $response = (count($result) <= 1) ? true : false;
        } else {
            $response = true;
        }

        return $response;
    }

    public function getSpotVersionDataByRequestId($requestId)
    {
        $dql = "SELECT 
                    sc.campaignId,
                    ca.campaignName,
                    sc.projectCampaignId,
                    sc.spotId,
                    s.spotName,
                    sc.versionId,
                    v.versionName,
                    sc.spotVersionId,
                    sc.sentViaMethod,
                    sc.finishRequest,
                    sc.spotResend,
                    sc.prodAccept,
                    sc.finishAccept,
                    sc.lineStatusId,
                    sc.editor,
                    s.trtId,
                    trt.runtime
                FROM \Application\Entity\RediSpotSent sc
                LEFT JOIN \Application\Entity\RediCampaign ca
                    WITH ca.id = sc.campaignId
                LEFT JOIN \Application\Entity\RediSpot s
                    WITH s.id = sc.spotId
                LEFT JOIN \Application\Entity\RediVersion v
                    WITH v.id = sc.versionId
                LEFT JOIN \Application\Entity\RediTrt trt
                    WITH s.trtId = trt.id
                WHERE sc.requestId = :request_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter("request_id", $requestId);

        $result = $query->getArrayResult();

        foreach ($result as &$row) {
            $row['campaignId'] = (int)$row['campaignId'];
            $row['projectCampaignId'] = (int)$row['projectCampaignId'];
            $row['spotId'] = (int)$row['spotId'];
            $row['versionId'] = (int)$row['versionId'];
            $row['spotVersionId'] = (int)$row['spotVersionId'];
            $row['lineStatusId'] = (int)$row['lineStatusId'];
        }

        return $result;
    }

    public function getRawSpotVersionDataByRequestId($requestId)
    {
        $dql = "SELECT
                    sc.campaign_id,
                    sc.project_campaign_id,
                    sc.spot_id,
                    sc.version_id,
                    sc.spot_version_id,
                    sc.sent_via_method,
                    sc.finish_request,
                    sc.spot_resend,
                    sc.line_status_id,
                    sc.editor,
                    sc.editor AS editors_string,
                    sc.prod_accept,
                    sc.finish_accept
                FROM redi_spot_sent sc
                  WHERE sc.request_id = :request_id ";

        $query = $this->getEntityManager()->getConnection()->prepare($dql);
        $query->bindParam('request_id', $requestId);
        $query->execute();
        $result = $query->fetchAll();

        return $result;
    }

    public function getSpotVersionBySpotSentId($spotSentId, $returnWorker = false)
    {
        if ($returnWorker) {
            $extraSelect = ",sstsv.id ";
        } else {
            $extraSelect = "";
        }
        $dql = "SELECT 
                  sv.id AS spotVersionId,
                  sv.spotId, s.spotName,
                  sv.versionId, v.versionName,
                  p.id as projectId,
                  c.id as campaignId, c.campaignName" . $extraSelect . "
                FROM \Application\Entity\RediSpotSentToSpotVersion sstsv 
                INNER JOIN \Application\Entity\RediSpotVersion sv
                  WITH sv.id = sstsv.spotVersionId
                INNER JOIN \Application\Entity\RediSpotSent ss
                  WITH ss.id=:spot_sent_id
                INNER JOIN \Application\Entity\RediSpot s
                  WITH s.id=sv.spotId
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                    WITH ptc.id=s.projectCampaignId
                LEFT JOIN \Application\Entity\RediProject p
                  WITH p.id=ptc.projectId
                LEFT JOIN \Application\Entity\RediCampaign c
                  WITH c.id=ptc.campaignId
                LEFT JOIN \Application\Entity\RediVersion v 
                   WITH v.id=sv.versionId
                WHERE sstsv.spotSentId=:spot_sent_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter("spot_sent_id", $spotSentId);

        $result = $query->getArrayResult();

        if ($returnWorker) {
            foreach ($result as &$row) {
                $dql1 = "SELECT 
                  u.id, u.username, u.email, u.firstName, u.lastName, ut.typeName
                FROM \Application\Entity\RediSpotSentToSpotVersionToEditorDesigner sed 
                INNER JOIN \Application\Entity\RediUser u
                  WITH sed.editorDesignerId=u.id
                INNER JOIN \Application\Entity\RediUserType ut
                  WITH u.typeId=ut.id
                WHERE sed.spotSentSpotVersionId=:spot_sent_spot_version_id";

                $query1 = $this->getEntityManager()->createQuery($dql1);
                $query1->setParameter("spot_sent_spot_version_id", $row['id']);

                $result1 = $query1->getArrayResult();


                foreach ($result1 as $row1) {
                    $row['worker'][strtolower($row1['typeName'])][] = $row1;
                }

                unset($row['id']);
            }
        }

        foreach ($result as &$row) {
            $row['editor'] = $this->getSpotVersionEditor($row['spotVersionId']);
        }

        return $result;
    }

    public function getSpotSentCustomerContact($spotSentId)
    {
        $dql = "SELECT 
                  cc
                FROM \Application\Entity\RediSpotSentToCustomerContact sstcc
                INNER JOIN \Application\Entity\RediCustomerContact cc
                  WITH sstcc.customerContactId=cc.id
                WHERE sstcc.spotSentId=:spot_sent_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter("spot_sent_id", $spotSentId);

        $result = $query->getArrayResult();

        return $result;
    }

    public function getSpotSentWorkStage($spotSentId)
    {
        $dql = "SELECT 
                  ws.id, ws.workStage,
                  wsp.id AS parentId, wsp.workStage AS parentWorkStage
                FROM \Application\Entity\RediSpotSentToWorkStage ssws
                INNER JOIN \Application\Entity\RediWorkStage ws
                  WITH ssws.workStageId=ws.id
                LEFT JOIN \Application\Entity\RediWorkStage wsp
                  WITH ws.parentId=wsp.id
                WHERE ssws.spotSentId=:spot_sent_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter("spot_sent_id", $spotSentId);

        $result = $query->getArrayResult();

        return $result;
    }

    public function clearSpotSentSpotVersion($spotSentId)
    {
        $dql1 = "DELETE
                FROM \Application\Entity\RediSpotSentToSpotVersionToEditorDesigner s
                WHERE s.spotSentSpotVersionId 
                IN (
                  SELECT 
                    sv.id 
                  FROM \Application\Entity\RediSpotSentToSpotVersion sv 
                  WHERE sv.spotSentId=:spot_sent_id
                )";

        $query1 = $this->getEntityManager()->createQuery($dql1);
        $query1->setParameter("spot_sent_id", $spotSentId);

        $query1->execute();

        $dql2 = "DELETE
                FROM \Application\Entity\RediSpotSentToSpotVersion sv 
                WHERE sv.spotSentId=:spot_sent_id";

        $query2 = $this->getEntityManager()->createQuery($dql2);
        $query2->setParameter("spot_sent_id", $spotSentId);

        $query2->execute();


    }

    public function fullSearch($filter = [], $offset = 0, $length = 10)
    {
        $dql = "SELECT 
                    cu.cardname AS customerName,
                    cu.cardcode,
                    ptc.customerId,
                    p.id AS projectId,
                    ca.campaignName,
                    ca.id AS campaignId,
                    MIN(ptc.id) AS projectToCampaignid,
                    s.spotName,
                    s.id AS spotId
                FROM \Application\Entity\RediSpot s
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                    WITH ptc.id=s.projectCampaignId
                INNER JOIN \Application\Entity\RediProject p
                    WITH p.id=ptc.projectId
                LEFT JOIN \Application\Entity\RediCampaign ca
                    WITH ca.id=ptc.campaignId
                LEFT JOIN \Application\Entity\RediCustomer cu
                    WITH cu.id=ptc.customerId ";

        $dqlFilter = [];

        if ($filter['search']) {
            $dqlFilter[] = "(p.projectName LIKE :search OR  p.projectCode LIKE :search OR s.spotName LIKE :search)";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " GROUP BY p.id, s.id 
                ORDER BY s.spotName ASC, p.projectName ASC";

        $query = $this->getEntityManager()->createQuery($dql);

        if ($filter['search']) {
            $query->setParameter('search', $filter['search'] . '%');
        }

        $query->setFirstResult($offset);
        $query->setMaxResults($length);
        $result = $query->getArrayResult();

        foreach ($result as &$row) {
            $row['campaignId'] = $row['campaignId'] ? (int)$row['campaignId'] : null;
            $row['spotId'] = $row['spotId'] ? (int)$row['spotId'] : null;

            $versionDql = "SELECT 
                            v.versionName 
                            FROM \Application\Entity\RediSpotVersion stv
                            INNER JOIN \Application\Entity\RediVersion v
                                WITH v.id=stv.versionId
                            WHERE stv.spotId=:spotId";

            $query = $this->getEntityManager()->createQuery($versionDql);
            $query->setParameter('spotId', $row['spotId']);
            $row['version'] = array_column($query->getArrayResult(), 'versionName');
        }

        return $result;
    }

    public function fullSearchCount($filter = [])
    {
        $dql = "SELECT 
                    COUNT(DISTINCT s) AS total_count
                FROM \Application\Entity\RediSpot s
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                    WITH ptc.id=s.projectCampaignId
                INNER JOIN \Application\Entity\RediProject p
                    WITH p.id=ptc.projectId
                LEFT JOIN \Application\Entity\RediCampaign ca
                    WITH ca.id=ptc.campaignId
                LEFT JOIN \Application\Entity\RediCustomer cu
                    WITH cu.id=ptc.customerId ";

        $dqlFilter = [];

        if ($filter['search']) {
            $dqlFilter[] = "(p.projectName LIKE :search OR  p.projectCode LIKE :search OR s.spotName LIKE :search)";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if ($filter['search']) {
            $query->setParameter('search', $filter['search'] . '%');
        }

        $result = $query->getArrayResult();

        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }

    public function getSpotSentOption($key = null)
    {
        $dql = "SELECT 
                  sso.value
                FROM \Application\Entity\RediSpotSentOption sso
                  WHERE sso.key = :key";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('key', $key);
        $result = $query->getArrayResult();

        $response = null;

        if (!empty($result[0])) {
            $result = json_decode($result[0]['value'], true);

            foreach ($result as $row) {
                $response[] = $row;

                if (!empty($row['children']) && !in_array($key, array('finishing_option', 'delivery_to_client_option'))) {
                    array_push($response, ...$row['children']);
                }
            }
        }

        return $response;
    }

    public function getAllFinishingHouse()
    {
        $dql = "SELECT 
                  fh
                FROM \Application\Entity\RediFinishingHouse fh";

        $query = $this->getEntityManager()->createQuery($dql);
        $result = $query->getArrayResult();

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

    public function getSpotVersionEditorBySpotAndVersion($spotId, $versionId)
    {
        $dql = "SELECT 
                  u.id, 
                  u.firstName, u.lastName,
                  u.username,
                  u.initials
                FROM \Application\Entity\RediSpotVersionEditor sve
                    INNER JOIN \Application\Entity\RediUser u
                        WITH u.id = sve.userId
                    INNER JOIN \Application\Entity\RediSpotVersion sv
                        WITH sv.id = sve.spotVersionId                  
                  WHERE sv.spotId = :spot_id
                  AND sv.versionId = :version_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('spot_id', $spotId);
        $query->setParameter('version_id', $versionId);
        $result = $query->getArrayResult();

        foreach ($result as &$row) {
            $row['name'] = trim($row['firstName'] . ' ' . $row['lastName']);

            $row['id'] = (int)$row['id'];

            unset($row['firstName']);
            unset($row['lastName']);
        }

        return $result;
    }

    public function getNextSpotSentRequestId()
    {
        $key = 'MAX_SPOT_SENT_REQUEST_ID';

        $dql = "SELECT 
                  s.settingValue
                FROM \Application\Entity\RediSetting s
                WHERE s.settingKey=:key";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('key', $key);
        $query->setMaxResults(1);
        $result = $query->getArrayResult();

        $maxRequestId = ((!empty($result[0]['settingValue'])) ? (int)$result[0]['settingValue'] : 0) + 1;

        // update request_id in setting table
        $updateQuery = "UPDATE redi_setting 
                        SET 
                            setting_value = :max_request_id
                        WHERE
                            setting_key = :key";

        $updateSetting = $this->getEntityManager()->getConnection()->prepare($updateQuery);
        $updateSetting->bindParam('max_request_id', $maxRequestId);
        $updateSetting->bindParam('key', $key);
        $updateSetting->execute();

        return $maxRequestId;
    }
}