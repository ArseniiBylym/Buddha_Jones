<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;
use Zend\Form\Annotation\Type;

// before called Table now Repository Table Data Gateway
// In Bug Entity add  @Entity(repositoryClass="BugRepository")
// To be able to use this query logic through
// $this->getEntityManager()->getRepository('Bug') we have to adjust the metadata slightly.
// http://stackoverflow.com/questions/10481916/the-method-name-must-start-with-either-findby-or-findoneby-uncaught-exception

class UsersRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediUser";

    public function __construct(EntityManager $entityManager) {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);
    }

    public function getRolesArray($number = 30)
    {
        $dql = "SELECT u FROM \Application\Entity\RediUser u";
        $query = $this->getEntityManager()->createQuery($dql);
        return $query->getArrayResult();
    }
    public function search($search='', $type=[], $offset = 0, $length = 10, $userAccess = array())
    {
        $selectColumn = ' a.id ';

        if($userAccess['can_access_basic_data']) {
            $selectColumn = " a.id, a.username, a.firstName as first_name, a.lastName as last_name, 
                            a.image, a.email,
                            a.initials, a.typeId as type_id, ut.typeName as type_name, utc.class,
                            a.lastLoginDate AS last_login_date, a.createdDate AS created_date,
                            a.status ";
        }

        if($userAccess['can_access_extra_data']) {
            $selectColumn = " a.id, a.username, a.firstName as first_name, a.lastName as last_name, 
                            a.image, a.email,
                            a.initials, a.typeId as type_id, ut.typeName as type_name, utc.class,
                            a.hourlyRate as hourly_rate, a.salaryType as salary_type,
                            a.salaryAmount as salary_amount, a.minHour as min_hour,
                            a.lastLoginDate AS last_login_date, a.createdDate AS created_date,
                            a.status ";
        }

        $dql = "SELECT " . $selectColumn . "
                FROM \Application\Entity\RediUser a
                LEFT JOIN \Application\Entity\RediUserType ut
                    WITH a.typeId=ut.id
                LEFT JOIN \Application\Entity\RediUserTypeClass utc
                    WITH a.typeId=utc.typeId ";

        $dqlFilter = [];

        if ($search) {
            $dqlFilter[] = " (a.firstName LIKE '%" . $search . "%' OR a.lastName LIKE '%" . $search . "%' OR a.username LIKE '%" . $search . "%' OR a.initials ='" . $search . "' OR a.email LIKE '%" . $search . "%') ";
        }

        if (count($type)) {
                $dqlFilter[] = " utc.class IN (:type) ";
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " .  implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY a.id ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        if(count($type)) {
            $query->setParameter('type', $type, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        $data = $query->getArrayResult();

        foreach($data as &$row) {
            $row['full_name'] = trim(implode(' ', array($row['first_name'], $row['last_name'])));
        }

        return $data;
    }

    public function getUser($userId, $userAccess = array())
    {

        $selectColumn = ' a.id ';

        if($userAccess['can_access_basic_data']) {
            $selectColumn = " a.id, a.username, a.firstName as first_name, a.lastName as last_name, 
                            a.image, a.email,
                            a.initials, a.typeId as type_id, ut.typeName as type_name, 
                            a.lastLoginDate AS last_login_date, a.createdDate AS created_date,
                            a.status ";
        }

        if($userAccess['can_access_extra_data']) {
            $selectColumn = " a.id, a.username, a.firstName as first_name, a.lastName as last_name, 
                            a.image, a.email,
                            a.initials, a.typeId as type_id, ut.typeName as type_name,
                            a.hourlyRate as hourly_rate, a.salaryType as salary_type,
                            a.salaryAmount as salary_amount, a.minHour as min_hour,
                            a.lastLoginDate AS last_login_date, a.createdDate AS created_date,
                            a.status ";
        }


        $dql = "SELECT " . $selectColumn . "
                FROM \Application\Entity\RediUser a
                JOIN \Application\Entity\RediUserType ut
                    WITH a.typeId=ut.id
                WHERE a.id=:user_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_id', $userId);
        $query->setMaxResults(1);
        $user =  $query->getArrayResult();

        if(isset($user[0])) {
            $response = $user[0];

            $response['full_name'] = trim(implode(' ', array($response['first_name'], $response['last_name'])));
        } else {
            $response = null;
        }

        return $response;
    }

    public function searchCount($search='', $type=[])
    {
        $dql = "SELECT COUNT(a.id) AS total_count
                FROM \Application\Entity\RediUser a
                LEFT JOIN \Application\Entity\RediUserTypeClass utc
                    WITH a.typeId=utc.typeId";

        $dqlFilter = [];

        if ($search) {
            $dqlFilter[] = " (a.firstName LIKE '%" . $search . "%' OR a.lastName LIKE '%" . $search . "%' OR a.username LIKE '%" . $search . "%' OR a.initials ='" . $search . "' OR a.email LIKE '%" . $search . "%') ";
        }

        if (count($type)) {
            $dqlFilter[] = " utc.class IN (:type) ";
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " .  implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if(count($type)) {
            $query->setParameter('type', $type, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        $result = $query->getArrayResult();

        return (int)$result[0]['total_count'];
    }


    public function searchStaff($search='', $offset = 0, $length = 10)
    {
        $dql = "SELECT a
                FROM \Application\Entity\RediStaff a";

        $dqlFilter = [];

        if ($search) {
            $dqlFilter[] = " (a.name LIKE '%" . $search . "%') ";
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " .  implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY a.name ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);
        $data = $query->getArrayResult();

        foreach($data as &$row) {
            $row['rate'] = (float)$row['rate'];
            $row['minHour'] = (int)$row['minHour'];
        }
        return $data;
    }

    public function getStaff($staffId)
    {
        $dql = "SELECT a
                FROM \Application\Entity\RediStaff a
                WHERE a.id=:staff_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('staff_id', $staffId);
        $query->setMaxResults(1);
        $staff =  $query->getArrayResult();

        if(isset($staff[0])) {
            $response = $staff[0];
            $response['rate'] = (float)$response['rate'];
            $response['minHour'] = (int)$response['minHour'];
        } else {
            $response = null;
        }

        return $response;
    }

    public function searchStaffCount($search='')
    {
        $dql = "SELECT COUNT(a.id) AS total_count
                FROM \Application\Entity\RediStaff a";

        $dqlFilter = [];

        if ($search) {
            $dqlFilter[] = " (a.name LIKE '%" . $search . "%') ";
        }

        if(count($dqlFilter)) {
            $dql .= " WHERE " .  implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        $result = $query->getArrayResult();

        return (int)$result[0]['total_count'];
    }

}
