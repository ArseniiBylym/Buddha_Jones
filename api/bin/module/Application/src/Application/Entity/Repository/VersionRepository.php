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

class VersionRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediVersion";

    public function __construct(EntityManager $entityManager) {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);
    }

    public function search($filter, $offset = 0, $length = 10)
    {
        $dql = "SELECT a.id, a.versionName, a.custom
                FROM \Application\Entity\RediVersion a ";

        $dqlFilter = array(
            "a.active=1",
        );

        if (!empty($filter['search'])) {
            $dqlFilter[] = " (a.versionName LIKE '%" . $filter['search'] . "%' ) ";
        }

        if(isset($filter['custom']) && $filter['custom'] !== null) {
            $dqlFilter[] = " a.custom = :custom ";
        }

        if(!empty($filter['id'])) {
            $dqlFilter[] = " a.id = :id ";
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY a.seq ASC";

        $query = $this->getEntityManager()->createQuery($dql);

        if(isset($filter['custom']) && $filter['custom'] !== null) {
            $query->setParameter('custom', $filter['custom']);
        }

        if(!empty($filter['id'])) {
            $query->setParameter('id', $filter['id']);
        }

        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        $data = $query->getArrayResult();

        return $data;
    }

    public function searchCount($filter)
    {
        $dql = "SELECT COUNT(a.id) AS total_count 
                FROM \Application\Entity\RediVersion a  ";

        $dqlFilter = array(
            "a.active=1",
        );

        if (!empty($filter['search'])) {
            $dqlFilter[] = " (a.versionName LIKE '%" . $filter['search'] . "%' ) ";
        }

        if(isset($filter['custom']) && $filter['custom'] !== null) {
            $dqlFilter[] = " a.custom = :custom ";
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if(isset($filter['custom']) && $filter['custom'] !== null) {
            $query->setParameter('custom', $filter['custom']);
        }

        $result = $query->getArrayResult();

        return (isset($result[0]['total_count'])?(int)$result[0]['total_count']:0);
    }

    public function searchWithSpot($filter, $offset = 0, $length = 10)
    {
        $dql = "SELECT a.id, a.versionName, a.custom, sv.spotId, sv.billingType
                FROM \Application\Entity\RediVersion a
                INNER JOIN \Application\Entity\RediSpotVersion sv 
                  WITH a.id=sv.versionId ";


        $dqlFilter = array(
            "a.active=1",
            "sv.spotId=:spot_id",
        );

        if (!empty($filter['search'])) {
            $dqlFilter[] = " (a.versionName LIKE '%" . $filter['search'] . "%' ) ";
        }

        if(isset($filter['custom']) && $filter['custom'] !== null) {
            $dqlFilter[] = " a.custom = :custom ";
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY a.seq ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('spot_id', $filter['spot_id']);

        if(isset($filter['custom']) && $filter['custom'] !== null) {
            $query->setParameter('custom', $filter['custom']);
        }

        $query->setFirstResult($offset);
        $query->setMaxResults($length);
        return $query->getArrayResult();
    }

    public function searchCountWithSpot($filter)
    {
        $dql = "SELECT COUNT(a.id) AS total_count 
                FROM \Application\Entity\RediVersion a 
                 INNER JOIN \Application\Entity\RediSpotVersion sv 
                  WITH a.id=sv.versionId ";

        $dqlFilter = array(
            "a.active=1",
            "sv.spotId=:spot_id",
        );

        if (!empty($filter['search'])) {
            $dqlFilter[] = " (a.versionName LIKE '%" . $filter['search'] . "%' ) ";
        }

        if(isset($filter['custom']) && $filter['custom'] !== null) {
            $dqlFilter[] = " a.custom = :custom ";
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('spot_id', $filter['spot_id']);

        if(isset($filter['custom']) && $filter['custom'] !== null) {
            $query->setParameter('custom', $filter['custom']);
        }

        $result =  $query->getArrayResult();

        return (isset($result[0]['total_count'])?(int)$result[0]['total_count']:0);
    }

    public function searchVersionStatus()
    {
        $dql = "SELECT a
                FROM \Application\Entity\RediVersionStatus a ";

        $query = $this->getEntityManager()->createQuery($dql);
        $result =  $query->getArrayResult();

        return $result;
    }
}
