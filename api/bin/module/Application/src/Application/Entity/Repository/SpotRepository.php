<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;

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
            $dqlFilter[] = "ptc.projectId= " . (int) $filter['project_id'];
        }

        if (!empty($filter['campaign_id'])) {
            $dqlFilter[] = "ptc.campaignId= " . (int) $filter['campaign_id'];
        }

        if (!empty($filter['project_campaign_id'])) {
            $dqlFilter[] = "a.projectCampaignId= " . (int) $filter['project_campaign_id'];
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
            $row['id'] = (int) $row['id'];
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
            $dqlFilter[] = "ptc.projectId= " . (int) $filter['project_id'];
        }

        if (!empty($filter['campaign_id'])) {
            $dqlFilter[] = "ptc.campaignId= " . (int) $filter['campaign_id'];
        }

        if (!empty($filter['project_campaign_id'])) {
            $dqlFilter[] = "a.projectCampaignId= " . (int) $filter['project_campaign_id'];
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

        return (isset($result[0]['total_count']) ? (int) $result[0]['total_count'] : 0);
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
                "musicNote",
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
                "spotSentType",
                "allGraphicsResend",
                "graphicsNote",
                "finalNarr",
                "qcApproved",
                "qcNote",
                "qcLink",
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
                "spotSentType",
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

        $offset = (!empty($filter['offset'])) ? (int) $filter['offset'] : 0;
        $length = (!empty($filter['length'])) ? (int) $filter['length'] : 10;

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

        if (!empty($filter['spot_sent_type'])) {
            $dqlFilter[] = "sc.spotSentType = :spot_sent_type";
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

        if (!empty($filter['spot_sent_type'])) {
            $query->setParameter("spot_sent_type", $filter['spot_sent_type']);
        }

        $result = $query->getArrayResult();

        $finishingOptions = $this->getSpotSentOption('finishing_option');
        $audioOptions = $this->getSpotSentOption('audio_option');
        $delToClientOption = $this->getSpotSentOption('delivery_to_client_option');
        $allStatus = $this->getSpotSentOption('status');
        $allStatusArray = array();

        foreach ($allStatus as $row) {
            $allStatusArray[$row['id']] = $row;
        }

        foreach ($result as &$row) {
            if (isset($row['spotSentType']) && $row['spotSentType'] == 2) {
                $methodes = $this->getSpotSentOption('graphics_sent_via_method');
            } else {
                $methodes = $this->getSpotSentOption('sent_via_method');
            }

            unset($row['sortBy']);

            $row['requestId'] = (int) $row['requestId'];
            $row['projectId'] = (int) $row['projectId'];
            $row['statusId'] = (int) $row['statusId'];
            $row['createdByUser'] = trim($row['createdByFirstName'] . ' ' . $row['createdByLastName']);
            $row['updatedByUser'] = trim($row['updatedByFirstName'] . ' ' . $row['updatedByLastName']);
            $row['spotSentType'] = (int) $row['spotSentType'];

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
                $spotDataRow['graphicsFile'] = $this->getSpotSendFiles($spotDataRow['spotSentId']);

                // unset($spotDataRow['spotSentId']);
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

        return (isset($result[0]['total_count']) ? (int) $result[0]['total_count'] : 0);
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
                    sc.id AS spotSentId,
                    sc.requestId,
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
                    sc.graphicsStatusId,
                    sc.editor,
                    s.trtId,
                    trt.runtime,
                    sc.noGraphics,
                    sc.isPdf,
                    sc.qcApproved,
                    sc.qcNote,
                    sc.qcLink
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

        $result = array_map(function ($row) {
            $row['spotSentId'] = (int) $row['spotSentId'];
            $row['requestId'] = (int) $row['requestId'];
            $row['campaignId'] = (int) $row['campaignId'];
            $row['projectCampaignId'] = (int) $row['projectCampaignId'];
            $row['spotId'] = (int) $row['spotId'];
            $row['versionId'] = (int) $row['versionId'];
            $row['spotVersionId'] = (int) $row['spotVersionId'];
            $row['lineStatusId'] = (int) $row['lineStatusId'];

            return $row;
        }, $result);

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

    public function getSpotSendFiles($spotSentId)
    {
        $dql = "SELECT
                  s.spotSentId, s.fileName, s.fileDescription, s.resend, s.creativeUserId
                FROM \Application\Entity\RediSpotSentFile s
                WHERE s.spotSentId=:spot_sent_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter("spot_sent_id", $spotSentId);

        $result = $query->getArrayResult();

        return $result;
    }

    public function deleteSpotSentFileByRequestId($requestId)
    {
        $dql1 = "DELETE
                FROM \Application\Entity\RediSpotSentFile s
                WHERE s.spotSentId IN (
                  SELECT
                    ss.id
                  FROM \Application\Entity\RediSpotSent ss
                  WHERE ss.requestId=:request_id
                )";

        $query1 = $this->getEntityManager()->createQuery($dql1);
        $query1->setParameter("request_id", $requestId);

        $query1->execute();
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
            $row['campaignId'] = $row['campaignId'] ? (int) $row['campaignId'] : null;
            $row['spotId'] = $row['spotId'] ? (int) $row['spotId'] : null;

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

        return (isset($result[0]['total_count']) ? (int) $result[0]['total_count'] : 0);
    }

    public function getSpotSentOption($key = null, $asIdHash = false)
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

        if ($asIdHash) {
            $response = $this->getSpotSentOptionAsIdHash($response);
        }

        return $response;
    }

    public function getSpotSentOptionAsIdHash($arr)
    {
        $result = array();

        foreach ($arr as $row) {
            if (!empty($row['id'])) {
                $result[$row['id']] = $row;
            }
        }

        return $result;
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

            $row['id'] = (int) $row['id'];

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

            $row['id'] = (int) $row['id'];

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

        $maxRequestId = ((!empty($result[0]['settingValue'])) ? (int) $result[0]['settingValue'] : 0) + 1;

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

    public function getSpotSentListTree($filter = array())
    {
        if (empty($filter['get_count'])) {
            $columns = "ss.projectId,
                        p.projectName,
                        std.id AS studioId,
                        std.studioName,
                        ss.campaignId,
                        c.campaignName,
                        cu.id AS customerId,
                        cu.customerName,
                        ss.projectCampaignId,
                        ss.spotId,
                        s.spotName,
                        ss.versionId,
                        v.versionName,
                        ss.id AS spotSentId,
                        ss.requestId AS spotSentRequestId,
                        ss.spotSentDate,
                        ss.lineStatusId AS spotLineStatusId,
                        ss.graphicsStatusId,
                        s.trtId,
                        trt.runtime,
                        ss.noGraphics,
                        ss.allGraphicsResend,
                        ss.finishRequest,
                        ss.finishOption,
                        fh.name AS finishingHouse,
                        ss.allGraphicsResend,
                        ss.noGraphics,
                        ss.isPdf,
                        ss.spotSentType,
                        ss.internalNote,
                        ss.spotResend,
                        ss.editor,
                        ss.customerContact,
                        ss.spotSentDate,
                        ss.qcApproved,
                        ss.prodAccept,
                        ss.finishAccept,
                        ss.qcNote,
                        ss.qcLink,
                        ss.createdAt,
                        ss.updatedAt";
        } else {
            $columns = "COUNT(DISTINCT ss.id) AS total_count";
        }

        $dql = "SELECT
                    " . $columns . "
                FROM \Application\Entity\RediSpotSent ss
                LEFT JOIN \Application\Entity\RediProject p
                    WITH p.id = ss.projectId
                LEFT JOIN \Application\Entity\RediCampaign c
                    WITH c.id = ss.campaignId
                LEFT JOIN \Application\Entity\RediSpot s
                    WITH s.id = ss.spotId
                LEFT JOIN \Application\Entity\RediVersion v
                    WITH v.id = ss.versionId
                LEFT JOIN \Application\Entity\RediStudio std
                    WITH p.studioId = std.id
                LEFT JOIN \Application\Entity\RediProjectToCampaign ptc
                    WITH ss.projectCampaignId = ptc.id
                LEFT JOIN \Application\Entity\RediCustomer cu
                    WITH cu.id = ptc.customerId
                LEFT JOIN \Application\Entity\RediTrt trt
                    WITH trt.id = s.trtId
                LEFT JOIN \Application\Entity\RediFinishingHouse fh
                    WITH ss.finishingHouse = fh.id
                LEFT JOIN \Application\Entity\RediProjectToCampaignUser ptcu
                    WITH ptcu.projectCampaignId = ss.projectCampaignId
                WHERE ss.billId IS NULL
                    AND ss.projectId IS NOT NULL
                    AND ss.campaignId IS NOT NULL
                ";

        $dqlFilter = [];

        if (!empty($filter['current_user_id'])) {
            $dqlFilter[] = " (((ss.createdBy= :current_user_id OR ptcu.userId = :current_user_id) AND ss.lineStatusId <= 1) OR ss.lineStatusId > 1) ";
        }

        if (!empty($filter['spot_sent_id'])) {
            $dqlFilter[] = " (ss.id = :spot_sent_id) ";
        }

        if (!empty($filter['line_status_id'])) {
            $dqlFilter[] = " (ss.lineStatusId IN (:line_status_id)) ";

            if (!is_array($filter['line_status_id'])) {
                $filter['line_status_id'] = (array) $filter['line_status_id'];
            }
        }

        if (!empty($filter['graphics_status_id'])) {
            $dqlFilter[] = " (ss.graphicsStatusId IN (:graphics_status_id)) ";

            if (!is_array($filter['graphics_status_id'])) {
                $filter['graphics_status_id'] = (array) $filter['graphics_status_id'];
            }
        }

        if (!empty($filter['spot_sent_type'])) {
            $dqlFilter[] = " (ss.spotSentType = :spot_sent_type) ";
        }

        if (!empty($filter['spot_sent_for_billing'])) {
            $dqlFilter[] = " (ss.lineStatusId = 4 OR ss.graphicsStatusId = 4) ";
        }

        if (!empty($filter['project_id'])) {
            $dqlFilter[] = " ss.projectId IN (:project_id) ";

            if (!is_array($filter['project_id'])) {
                $filter['project_id'] = (array) $filter['project_id'];
            }
        }

        if (!empty($filter['campaign_id'])) {
            $dqlFilter[] = " ss.campaignId IN (:campaign_id) ";

            if (!is_array($filter['campaign_id'])) {
                $filter['campaign_id'] = (array) $filter['campaign_id'];
            }
        }

        if (!empty($filter['project_campaign_id'])) {
            $dqlFilter[] = " ss.projectCampaignId IN (:project_campaign_id) ";

            if (!is_array($filter['project_campaign_id'])) {
                $filter['project_campaign_id'] = (array) $filter['project_campaign_id'];
            }
        }

        if (!empty($filter['spot_id'])) {
            $dqlFilter[] = " ss.spotId IN (:spot_id) ";

            if (!is_array($filter['spot_id'])) {
                $filter['spot_id'] = (array) $filter['spot_id'];
            }
        }

        if (!empty($filter['version_id'])) {
            $dqlFilter[] = " ss.versionId = :version_id ";
        }

        if (!empty($filter['start_date'])) {
            $dqlFilter[] = " ss.spotSentDate >= :start_date ";

            $startDate = new \DateTime($filter['start_date']);
            $startDate = $startDate->format('Y-m-d 00:00:00');
        }

        if (!empty($filter['end_date'])) {
            $dqlFilter[] = " ss.spotSentDate <= :end_date ";

            $endDate = new \DateTime($filter['end_date']);
            $endDate = $endDate->format('Y-m-d 23:59:59');
        }

        if (empty($filter['return_flat_result'])) {
            $dqlFilter[] = " (ss.projectId IS NOT NULL AND ss.campaignId IS NOT NULL AND ss.spotId IS NOT NULL) ";
        }

        if (count($dqlFilter)) {
            $dql .= " AND " . implode(" AND ", $dqlFilter);
        }

        if (empty($filter['get_count'])) {
            if (!empty($filter['return_flat_result'])) {
                $dql .= " GROUP BY ss.id
                    ORDER BY ss.id ASC";
            } else {
                $dql .= " GROUP BY ss.projectId , ss.campaignId , ss.spotId , ss.versionId, ss.lineStatusId
                    ORDER BY p.projectName ASC , c.campaignName ASC, s.spotName ASC, v.versionName ASC";
            }
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (empty($filter['get_count'])) {
            if (isset($filter['offset'])) {
                $query->setFirstResult($filter['offset']);
            }

            if (!empty($filter['length'])) {
                $query->setMaxResults($filter['length']);
            }
        }

        if (!empty($filter['current_user_id'])) {
            $query->setParameter("current_user_id", $filter['current_user_id']);
        }

        if (!empty($filter['spot_sent_id'])) {
            $query->setParameter("spot_sent_id", $filter['spot_sent_id']);
        }

        if (!empty($filter['spot_sent_type'])) {
            $query->setParameter("spot_sent_type", $filter['spot_sent_type']);
        }

        if (!empty($filter['line_status_id'])) {
            $query->setParameter("line_status_id", $filter['line_status_id'], \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
        }

        if (!empty($filter['graphics_status_id'])) {
            $query->setParameter("graphics_status_id", $filter['graphics_status_id'], \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
        }

        if (!empty($filter['project_id'])) {
            $query->setParameter("project_id", $filter['project_id'], \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
        }

        if (!empty($filter['campaign_id'])) {
            $query->setParameter("campaign_id", $filter['campaign_id'], \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
        }

        if (!empty($filter['project_campaign_id'])) {
            $query->setParameter("project_campaign_id", $filter['project_campaign_id'], \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
        }

        if (!empty($filter['spot_id'])) {
            $query->setParameter("spot_id", $filter['spot_id'], \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
        }

        if (!empty($filter['version_id'])) {
            $query->setParameter("version_id", $filter['version_id'], \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
        }

        if (!empty($filter['start_date'])) {
            $query->setParameter('start_date', $startDate);
        }

        if (!empty($filter['end_date'])) {
            $query->setParameter('end_date', $endDate);
        }

        $result = $query->getArrayResult();

        if (!empty($filter['get_count'])) {
            return (!empty($result[0]['total_count'])) ? (int) $result[0]['total_count'] : 0;
        }

        $statusOptions = $this->getSpotSentOption('status', true);
        $graphicsStatusOptions = $this->getSpotSentOption('graphics_status', true);
        $userRepo = new UsersRepository($this->_entityManager);

        // update status
        $result = array_map(function ($ssRow) use ($statusOptions, $graphicsStatusOptions, $userRepo, $filter) {
            $ssRow['spotLineStatus'] = (!empty($statusOptions[$ssRow['spotLineStatusId']])) ? $statusOptions[$ssRow['spotLineStatusId']]['name'] : null;
            $graphicsStatus = (!empty($graphicsStatusOptions[$ssRow['graphicsStatusId']])) ? $graphicsStatusOptions[$ssRow['graphicsStatusId']]['name'] : null;

            if ($ssRow['noGraphics'] === null) {
                if ($ssRow['graphicsStatusId'] == 2) {
                    $graphicsStatus = 'EDL Requested';
                }

                if ($ssRow['graphicsStatusId'] == 3) {
                    $graphicsStatus = 'EDL Exported';
                }
            } else {
                if ($ssRow['noGraphics'] === 1 && $ssRow['graphicsStatusId'] == 4) {
                    $graphicsStatus = 'No Graphics';
                }

                if ($ssRow['noGraphics'] === 0) {
                    if ($ssRow['allGraphicsResend'] == 0 && $ssRow['graphicsStatusId'] == 4) {
                        $graphicsStatus = 'Ready to Bill';
                    }

                    if ($ssRow['allGraphicsResend'] == 1 && $ssRow['graphicsStatusId'] == 4) {
                        $graphicsStatus = 'All Resend';
                    }
                }
            }

            if ($ssRow['spotLineStatusId'] == 3 and $ssRow['qcApproved'] === 0) {
                $ssRow['spotLineStatus'] = "QC Not Approved";
            }

            if (!empty($ssRow['finishOption'])) {
                $finishingOptions = $this->getSpotSentOption('finishing_option');
                $finishingOptionIds = explode(',', $ssRow['finishOption']);

                if (count($finishingOptionIds)) {
                    $finishingOptionIds = array_map('trim', $finishingOptionIds);

                    if (count($finishingOptionIds) === 2) {
                        $ssRow['finishOption'] = array_values(array_filter($finishingOptions, function ($option) use ($finishingOptionIds) {
                            return $option['id'] == $finishingOptionIds[0];
                        }));
                        if (count($ssRow['finishOption'])) {
                            $ssRow['finishOption'] = $ssRow['finishOption'][0]['name'];
                        }
                    } else {
                        $ssRow['finishOption'] = null;
                    }
                }
            }

            $ssRow['graphicsStatus'] = $graphicsStatus;

            if (!empty($filter['return_producer_list'])) {
                $ssRow['producers'] = $userRepo->getCreativeUsersFromProjectCampaignByRole($ssRow['projectCampaignId'], array(1, 2, 3));
            }

            if (!empty($filter['return_editor_list'])) {
                $ssRow['editors'] = array();

                if (!empty($ssRow['editor'])) {
                    $editorIds = explode(',', $ssRow['editor']);

                    if (count($editorIds)) {
                        $editorIds = array_map('trim', $editorIds);
                        $userRepo = new UsersRepository($this->_entityManager);
                        $ssRow['editors'] = $userRepo->getUsersById($editorIds);
                    }
                }
            }

            if (!empty($filter['return_customer_contact_list'])) {
                $ssRow['customerContacts'] = array();

                if (!empty($ssRow['customerContact'])) {
                    $customerContactIds = explode(',', $ssRow['customerContact']);

                    if (count($customerContactIds)) {
                        $customerContactIds = array_map('trim', $customerContactIds);
                        $customerRepo = new CustomerRepository($this->_entityManager);

                        $ssRow['customerContacts'] = $customerRepo->getCustomerContactsById($customerContactIds);
                    }
                }
            }

            if (!empty($filter['return_graphics_file_list'])) {
                $ssRow['graphicsFile'] = $this->getSpotSendFiles($ssRow['spotSentId']);
            }

            unset($ssRow['editor']);
            unset($ssRow['customerContact']);

            return $ssRow;
        }, $result);

        if (!empty($filter['return_flat_result'])) {
            return $result;
        }

        $response = array();

        foreach ($result as $row) {
            if (empty($response[$row['projectId']])) {
                $response[$row['projectId']] = array(
                    'projectId' => (int) $row['projectId'],
                    'projectName' => $row['projectName'],
                    'studioId' => (int) $row['studioId'],
                    'studioName' => $row['studioName'],
                    'campaign' => array(),
                );
            }

            if (empty($response[$row['projectId']]['campaign'][$row['campaignId']])) {
                $response[$row['projectId']]['campaign'][$row['campaignId']] = array(
                    'campaignId' => (int) $row['campaignId'],
                    'campaignName' => $row['campaignName'],
                    'projectCampaignId' => (int) $row['projectCampaignId'],
                    'customerId' => (int) $row['customerId'],
                    'customerName' => $row['customerName'],
                    'spot' => array(),
                );
            }

            if (empty($row['spotId'])) {
                continue;
            }

            if (empty($response[$row['projectId']]['campaign'][$row['campaignId']]['spot'][$row['spotId'] . '_' . $row['versionId']])) {
                $spotRes = array(
                    'spotId' => (int) $row['spotId'],
                    'spotName' => $row['spotName'],
                    'spotSentId' => (int) $row['spotSentId'],
                    'spotSentRequestId' => (int) $row['spotSentRequestId'],
                    'spotLineStatusId' => $row['spotLineStatusId'],
                    'spotLineStatus' => $row['spotLineStatus'],
                    'graphicsStatusId' => $row['graphicsStatusId'],
                    'graphicsStatus' => $row['graphicsStatus'],
                    'spotSentDate' => $row['spotSentDate'],
                    'trtId' => $row['trtId'],
                    'runtime' => $row['runtime'],
                    'versionId' => $row['versionId'],
                    'versionName' => $row['versionName'],
                    'finishRequest' => (int) $row['finishRequest'],
                    'finishOption' => $row['finishOption'],
                    'finishingHouse' => $row['finishingHouse'],
                    'producers' => $row['producers'],
                    'allGraphicsResend' => $row['allGraphicsResend'],
                    'isPdf' => $row['isPdf'],
                    'spotSentType' => $row['spotSentType'],
                    'noGraphics' => $row['noGraphics'],
                    'qcApproved' => $row['qcApproved'],
                    'qcNote' => $row['qcNote'],
                    'qcLink' => $row['qcLink'],
                );

                if (!empty($filter['return_graphics_file_list'])) {
                    $spotRes['graphicsFile'] = $row['graphicsFile'];
                }

                $response[$row['projectId']]['campaign'][$row['campaignId']]['spot'][$row['spotId'] . '_' . $row['versionId']] = $spotRes;
            }
        }

        $response = array_values(array_map(function ($project) {
            $project['campaign'] = array_values(array_map(function ($campaign) {
                $campaign['spot'] = array_values(array_map(function ($spot) {
                    // $spot['version'] = array_values($spot['version']);
                    return $spot;
                }, $campaign['spot']));

                return $campaign;
            }, $project['campaign']));

            return $project;
        }, $response));

        return $response;
    }

    public function getSpotSentTreeById($spotSentId)
    {
        $data = $this->getSpotSentListTree(array(
            'spot_sent_id' => $spotSentId,
            'return_flat_result' => true,
        ));

        $data = (isset($data[0]) ? $data[0] : null);

        if ($data) {
            $data['graphicsFile'] = $this->getSpotSendFiles($spotSentId);

            return $data;
        }
    }
}
