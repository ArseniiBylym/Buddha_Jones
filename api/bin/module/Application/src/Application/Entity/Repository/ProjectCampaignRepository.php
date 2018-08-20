<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;

class ProjectCampaignRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediProjectToCampaign";

    public function __construct(EntityManager $entityManager)
    {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);
    }

    public function search($filter = array(), $offset = 0, $length = 10)
    {
        $dql = "SELECT
                  ptc.id,
                  ptc.projectId,
                  ptc.campaignId, c.campaignName,
                  ptc.firstPointOfContactId,
                  ptc.requestWritingTeam, ptc.writingTeamNotes,
                  ptc.requestMusicTeam, ptc.musicTeamNotes,
                  MAX(ph.createdAt) AS maxHistoryCreatedAt,
                  ptc.note, ptc.budget, ptc.budgetNote,
                  ptc.por, ptc.invoiceContact,
                  ptc.materialReceiveDate
                FROM \Application\Entity\RediProjectToCampaign ptc
                INNER JOIN \Application\Entity\RediProject p
                    WITH p.id=ptc.projectId
                INNER JOIN \Application\Entity\RediCampaign c
                    WITH c.id=ptc.campaignId 
                LEFT JOIN \Application\Entity\RediProjectHistory ph
                    WITH ph.projectId=ptc.projectId
                    AND ph.campaignId=ptc.campaignId";

        if(!empty($filter['user_id'])){
            $dql .= " LEFT JOIN \Application\Entity\RediProjectToCampaignUser ptcu
                    WITH ptc.id=ptcu.projectCampaignId
                        AND ptcu.userId = :user_id
                    LEFT JOIN \Application\Entity\RediProjectToCampaignBilling ptcbu
                        WITH ptc.id=ptcbu.projectCampaignId
                        AND ptcbu.userId = :user_id
                    LEFT JOIN \Application\Entity\RediProjectToCampaignDesigner ptcd
                        WITH ptc.id=ptcd.projectCampaignId
                        AND ptcd.userId = :user_id
                    LEFT JOIN \Application\Entity\RediProjectToCampaignEditor ptce
                        WITH ptc.id=ptce.projectCampaignId 
                        AND ptce.userId = :user_id ";
        }

        $dqlFilter = [];

        if (!empty($filter['project_campaign_id'])) {
            $dqlFilter[] = " ptc.id=:project_campaign_id ";
        }

        if (!empty($filter['project_id'])) {
            $dqlFilter[] = " ptc.projectId=:project_id ";
        }

        if (!empty($filter['campaign_id'])) {
            $dqlFilter[] = " ptc.campaignId=:campaign_id ";
        }

        if (isset($filter['request_writing_team']) && $filter['request_writing_team'] !== null) {
            $dqlFilter[] = " ptc.requestWritingTeam=:request_writing_team ";
        }

        if (isset($filter['request_music_team']) && $filter['request_music_team'] !== null) {
            $dqlFilter[] = " ptc.requestMusicTeam=:request_music_team ";
        }

        if(!empty($filter['user_id'])){
            $dqlFilter[] = " (ptcu.userId IS NOT NULL OR ptcbu.userId IS NOT NULL OR ptcd.userId IS NOT NULL OR ptce.userId  IS NOT NULL) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= ' GROUP BY ptc.id ';

        if(!empty($filter['user_id'])) {
            $dql .= " ORDER BY maxHistoryCreatedAt DESC";
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (!empty($filter['project_campaign_id'])) {
            $query->setParameter('project_campaign_id', $filter['project_campaign_id']);
        }

        if (!empty($filter['project_id'])) {
            $query->setParameter('project_id', $filter['project_id']);
        }

        if (!empty($filter['campaign_id'])) {
            $query->setParameter('campaign_id', $filter['campaign_id']);
        }

        if (isset($filter['request_writing_team']) && $filter['request_writing_team'] !== null) {
            $query->setParameter('request_writing_team', $filter['request_writing_team']);
        }

        if (isset($filter['request_music_team']) && $filter['request_music_team'] !== null) {
            $query->setParameter('request_music_team', $filter['request_music_team']);
        }

        if(!empty($filter['user_id'])){
            $query->setParameter('user_id', $filter['user_id']);
        }

        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        $result = $query->getArrayResult();

        foreach($result as &$row) {
            $row['id'] = (int)$row['id'];

            if($row['maxHistoryCreatedAt']) {
                $row['maxHistoryCreatedAt'] = \DateTime::createFromFormat('Y-m-d H:i:s', $row['maxHistoryCreatedAt']);
            }
        }

        return $result;
    }


    public function searchCount($filter = array())
    {
        $dql = "SELECT COUNT(ptc.id) AS total_count
                FROM \Application\Entity\RediProjectToCampaign ptc 
                INNER JOIN \Application\Entity\RediProject p
                  WITH p.id=ptc.projectId
                INNER JOIN \Application\Entity\RediCampaign c
                  WITH c.id=ptc.campaignId ";

        if(!empty($filter['user_id'])){
            $dql .= " LEFT JOIN \Application\Entity\RediProjectToCampaignUser ptcu
                WITH ptc.id=ptcu.projectCampaignId
                    AND ptcu.userId = :user_id
                LEFT JOIN \Application\Entity\RediProjectToCampaignBilling ptcbu
                WITH ptc.id=ptcbu.projectCampaignId
                AND ptcbu.userId = :user_id
                LEFT JOIN \Application\Entity\RediProjectToCampaignDesigner ptcd
                WITH ptc.id=ptcd.projectCampaignId
                AND ptcd.userId = :user_id
                LEFT JOIN \Application\Entity\RediProjectToCampaignEditor ptce
                WITH ptc.id=ptce.projectCampaignId 
                AND ptce.userId = :user_id ";
        }

        $dqlFilter = [];

        if (!empty($filter['project_campaign_id'])) {
            $dqlFilter[] = " ptc.id=:project_campaign_id ";
        }

        if (!empty($filter['project_id'])) {
            $dqlFilter[] = " ptc.projectId=:project_id ";
        }

        if (!empty($filter['campaign_id'])) {
            $dqlFilter[] = " ptc.campaignId=:campaign_id ";
        }

        if (isset($filter['request_writing_team']) && $filter['request_writing_team'] !== null) {
            $dqlFilter[] = " ptc.requestWritingTeam=:request_writing_team ";
        }

        if (isset($filter['request_music_team']) && $filter['request_music_team'] !== null) {
            $dqlFilter[] = " ptc.requestMusicTeam=:request_music_team ";
        }

        if(!empty($filter['user_id'])){
            $dqlFilter[] = " (ptcu.userId IS NOT NULL OR ptcbu.userId IS NOT NULL OR ptcd.userId IS NOT NULL OR ptce.userId  IS NOT NULL) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);
        if (!empty($filter['project_campaign_id'])) {
            $query->setParameter('project_campaign_id', $filter['project_campaign_id']);
        }

        if (!empty($filter['project_id'])) {
            $query->setParameter('project_id', $filter['project_id']);
        }

        if (!empty($filter['campaign_id'])) {
            $query->setParameter('campaign_id', $filter['campaign_id']);
        }

        if (isset($filter['request_writing_team']) && $filter['request_writing_team'] !== null) {
            $query->setParameter('request_writing_team', $filter['request_writing_team']);
        }

        if (isset($filter['request_music_team']) && $filter['request_music_team'] !== null) {
            $query->setParameter('request_music_team', $filter['request_music_team']);
        }

        if(!empty($filter['user_id'])){
            $query->setParameter('user_id', $filter['user_id']);
        }

        $result = $query->getArrayResult();

        return (isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }
}
