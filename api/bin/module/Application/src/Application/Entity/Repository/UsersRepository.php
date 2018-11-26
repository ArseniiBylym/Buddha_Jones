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
    private $_billingUserTypeIds = array(5, 24, 100);
    private $_musicUserTypeIds = array(18, 19);
    private $_writerUserTypeIds = array(26);
    private $_config;

    public function __construct(EntityManager $entityManager)
    {
        $this->_config = $config = new \Zend\Config\Config(include getcwd() . '/config/autoload/global.php');

        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);
    }

    public function getRolesArray($number = 30)
    {
        $dql = "SELECT u FROM \Application\Entity\RediUser u";
        $query = $this->getEntityManager()->createQuery($dql);
        return $query->getArrayResult();
    }
    public function search($search = '', $ids = [], $class = [], $type = [], $offset = 0, $length = 10, $userAccess = array())
    {
        $selectColumn = ' a.id ';

        if ($userAccess['can_access_basic_data']) {
            $selectColumn = " a.id, a.username, a.firstName as first_name, a.lastName as last_name,
                            a.nickName as nick_name,
                            a.image, a.email,
                            a.initials, a.typeId as type_id, ut.typeName as type_name, utc.class,
                            a.lastLoginDate AS last_login_date, a.createdDate AS created_date,
                            a.status ";
        }

        if ($userAccess['can_access_extra_data']) {
            $selectColumn = " a.id, a.username, a.firstName as first_name, a.lastName as last_name,
                            a.nickName as nick_name,
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

        if (count($class)) {
            $dqlFilter[] = " utc.class IN (:class) ";
        }

        if (count($ids)) {
            $dqlFilter[] = " a.id IN (:ids) ";
        }

        if (count($type)) {
            $dqlFilter[] = " a.typeId IN (:type) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " GROUP BY a.id
                ORDER BY a.id ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        if (count($class)) {
            $query->setParameter('class', $class, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        if (count($type)) {
            $query->setParameter('type', $type, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        if (count($ids)) {
            $query->setParameter('ids', $ids, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        $data = $query->getArrayResult();

        foreach ($data as &$row) {
            $row['full_name'] = trim(implode(' ', array($row['first_name'], $row['last_name'])));
        }

        return $data;
    }

    // new search function. remove previous one if not required
    public function searchUser($search = '', $ids = [], $class = [], $type = [], $offset = 0, $length = 10, $userAccess = array())
    {
        $selectColumn = ' a.id ';

        if ($userAccess['can_access_basic_data']) {
            $selectColumn = " a.id, a.username, a.firstName, a.lastName,
                            a.nickName,
                            a.image, a.email,
                            a.initials, a.typeId, ut.typeName, utc.class,
                            a.lastLoginDate, a.createdDate,
                            a.status ";
        }

        if ($userAccess['can_access_extra_data']) {
            $selectColumn = " a.id, a.username, 
                            a.firstName, a.lastName, a.nickName,
                            a.image, a.email,
                            a.initials, a.typeId, ut.typeName, utc.class,
                            a.hourlyRate, a.salaryType,
                            a.salaryAmount, a.minHour,
                            a.lastLoginDate, a.createdDate,
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

        if (count($class)) {
            $dqlFilter[] = " utc.class IN (:class) ";
        }

        if (count($ids)) {
            $dqlFilter[] = " a.id IN (:ids) ";
        }

        if (count($type)) {
            $dqlFilter[] = " a.typeId IN (:type) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " GROUP BY a.id
                ORDER BY a.id ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);

        if (count($class)) {
            $query->setParameter('class', $class, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        if (count($type)) {
            $query->setParameter('type', $type, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        if (count($ids)) {
            $query->setParameter('ids', $ids, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        $data = $query->getArrayResult();

        foreach ($data as &$row) {
            $row['fullName'] = trim(implode(' ', array($row['firstName'], $row['lastName'])));
        }

        return $data;
    }

    public function getUser($userId, $userAccess = array())
    {
        $imageUrl = $this->_config['site_url'] . 'thumb/profile_image/';

        $selectColumn = " a.id, a.username, a.nickName,
                        a.email, a.image, 
                        a.firstName, a.lastName, a.initials, 
                        a.typeId, ut.typeName,
                        a.lastLoginDate, a.createdDate,
                        a.status ";

        if (!empty($userAccess['can_access_extra_data'])) {
            $selectColumn .= " , a.salaryType, a.salaryAmount, 
                            a.minHour, a.hourlyRate ";
        }

        $dql = "SELECT " . $selectColumn . "
                FROM \Application\Entity\RediUser a
                JOIN \Application\Entity\RediUserType ut
                    WITH a.typeId=ut.id
                WHERE a.id=:user_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_id', $userId);
        $query->setMaxResults(1);
        $user = $query->getArrayResult();

        if (isset($user[0])) {
            $response = $user[0];

            $response['fullName'] = trim(implode(' ', array($response['firstName'], $response['lastName'])));

            if (!empty($response['image'])) {
                $response['image'] = $imageUrl . $response['image'];
            }
        } else {
            $response = null;
        }

        return $response;
    }

    // duplicate function. remove previous one when sure about the usage
    public function getSingleUser($userId, $userAccess = array())
    {

        $selectColumn = ' a.id ';

        if ($userAccess['can_access_basic_data']) {
            $selectColumn = " a.id, a.username, 
                            a.firstName, a.lastName, a.nickName,
                            a.image, a.email,
                            a.initials, a.typeId, ut.typeName,
                            a.lastLoginDate, a.createdDate,
                            a.status ";
        }

        if ($userAccess['can_access_extra_data']) {
            $selectColumn = " a.id, a.username, 
                            a.firstName, a.lastName, a.nickName,
                            a.image, a.email,
                            a.initials, a.typeId, ut.typeName,
                            a.hourlyRate, a.salaryType,
                            a.salaryAmount, a.minHour,
                            a.lastLoginDate, a.createdDate,
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
        $user = $query->getArrayResult();

        if (isset($user[0])) {
            $response = $user[0];

            $response['fullName'] = trim(implode(' ', array($response['firstName'], $response['lastName'])));
        } else {
            $response = null;
        }

        return $response;
    }

    public function getUserssById($ids)
    {
        $dql = "SELECT 
                  u.id, u.firstName, u.lastName, u.initials
                FROM \Application\Entity\RediUser u
                WHERE u.id IN (:id)";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('id', $ids, \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
        $result = $query->getArrayResult();

        foreach ($result as &$row) {
            $row['name'] = trim($row['firstName'] . " " . $row['lastName']);

            unset($row['firstName']);
            unset($row['lastName']);
        }

        return $result;
    }

    public function searchCount($search = '', $ids = [], $class = [], $type = [])
    {
        $dql = "SELECT COUNT(DISTINCT a.id) AS total_count
                FROM \Application\Entity\RediUser a
                LEFT JOIN \Application\Entity\RediUserTypeClass utc
                    WITH a.typeId=utc.typeId";

        $dqlFilter = [];

        if ($search) {
            $dqlFilter[] = " (a.firstName LIKE '%" . $search . "%' OR a.lastName LIKE '%" . $search . "%' OR a.username LIKE '%" . $search . "%' OR a.initials ='" . $search . "' OR a.email LIKE '%" . $search . "%') ";
        }

        if (count($class)) {
            $dqlFilter[] = " utc.class IN (:class) ";
        }

        if (count($type)) {
            $dqlFilter[] = " a.typeId IN (:type) ";
        }

        if (count($ids)) {
            $dqlFilter[] = " a.id IN (:ids) ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (count($class)) {
            $query->setParameter('class', $class, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        if (count($type)) {
            $query->setParameter('type', $type, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        if (count($ids)) {
            $query->setParameter('ids', $ids, \Doctrine\DBAL\Connection::PARAM_STR_ARRAY);
        }

        $result = $query->getArrayResult();

        return (int)$result[0]['total_count'];
    }


    public function searchStaff($search = '', $offset = 0, $length = 10)
    {
        $dql = "SELECT a
                FROM \Application\Entity\RediStaff a";

        $dqlFilter = [];

        if ($search) {
            $dqlFilter[] = " (a.name LIKE '%" . $search . "%') ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY a.name ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setFirstResult($offset);
        $query->setMaxResults($length);
        $data = $query->getArrayResult();

        foreach ($data as &$row) {
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
        $staff = $query->getArrayResult();

        if (isset($staff[0])) {
            $response = $staff[0];
            $response['rate'] = (float)$response['rate'];
            $response['minHour'] = (int)$response['minHour'];
        } else {
            $response = null;
        }

        return $response;
    }

    public function searchStaffCount($search = '')
    {
        $dql = "SELECT COUNT(a.id) AS total_count
                FROM \Application\Entity\RediStaff a";

        $dqlFilter = [];

        if ($search) {
            $dqlFilter[] = " (a.name LIKE '%" . $search . "%') ";
        }

        if (count($dqlFilter)) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        $result = $query->getArrayResult();

        return (int)$result[0]['total_count'];
    }

    public function getUserPermission($userTypeId, $setKey = false)
    {
        $dql = "select
                    pp.id,
                    pp.key,
                    utpp.canView,
                    utpp.canEdit
                FROM
                \Application\Entity\RediProjectPermissions pp
                LEFT JOIN
                    \Application\Entity\RediUserTypeProjectPermission utpp WITH pp.id = utpp.projectPermissionId AND utpp.userTypeId = :user_type_id
                GROUP BY pp.id
                ORDER BY pp.id ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_type_id', $userTypeId);
        $result = $query->getArrayResult();

        foreach ($result as &$row) {
//            if(!empty($row['canView']))
            $row['canView'] = (!empty($row['canView'])) ? true : false;
            $row['canEdit'] = (!empty($row['canEdit'])) ? true : false;
        }

        if ($setKey) {
            $data = array();

            foreach ($result as $row2) {
                $data[$row2['id']] = $row2;
            }

            return $data;
        }

        return $result;
    }

    public function extractPermission($permissionArray, $permissionId, $options)
    {
        $selectedPermission = !empty($permissionArray[$permissionId]) ? $permissionArray[$permissionId] : null;

        if (!$selectedPermission) {
            return false;
        }

        switch ($options) {
            case 'view':
                return (bool)($selectedPermission['canView']);
                break;
            case 'edit':
                return (bool)($selectedPermission['canEdit']);
                break;
            case 'view_or_edit':
                return (bool)($selectedPermission['canView'] || $selectedPermission['canEdit']);
                break;
            case 'view_and_edit':
                return (bool)($selectedPermission['canView'] && $selectedPermission['canEdit']);
                break;
        }

        return false;
    }

    public function getPageAccessOfUser($userTypeId)
    {
        return array(
            'project-board' => $this->getUserProjectBoardAccess($userTypeId),
            'project-create' => $this->getUserProjectCreateAccess($userTypeId),
            'time-entry' => $this->getUserTimeEntryAccess($userTypeId),
            'time-card' => $this->getUserTimeCardAccess($userTypeId),
            'activities-definition' => true,
            'project-board-permission' => $this->getProjectBoardPermissionAccess($userTypeId),
            'producer-spot-sent-list' => true,
            'producer-spot-sent-form' => true,
            'new-customer-approval' => $this->getNewCustomerApproval($userTypeId),
        );
    }

    public function getNewCustomerApproval($userTypeId) {
        $userPermission = $this->getUserPermission($userTypeId, true);
        $canEditCustomerNew = $this->extractPermission($userPermission, 33, 'view_or_edit');
        
        return (bool)$canEditCustomerNew;
    }

    public function getUserTimeCardAccess($userTypeId)
    {
        $response = (bool)($userTypeId == 100);

        return $response;
    }

    public function getProjectBoardPermissionAccess($userTypeId)
    {
        $response = (bool)($userTypeId == 100);

        return $response;
    }

    public function getUserProjectBoardAccess($userTypeId)
    {
        $dql = "SELECT
                    COUNT(utpp.userTypeId) AS totalCount
                FROM
                    \Application\Entity\RediUserTypeProjectPermission utpp
                WHERE
                    utpp.canView = 1 and utpp.userTypeId = :user_type_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_type_id', $userTypeId);
        $result = $query->getArrayResult();

        $response = false;

        if (!empty($result[0]['totalCount']) && $result[0]['totalCount'] > 0) {
            $response = true;
        }

        return $response;
    }

    public function getUserProjectCreateAccess($userTypeId)
    {
        $dql = "SELECT
                    COUNT(utpp.userTypeId) AS totalCount
                FROM
                    \Application\Entity\RediUserTypeProjectPermission utpp
                WHERE
                    utpp.canEdit = 1
                    AND utpp.projectPermissionId = 1
                    AND utpp.userTypeId = :user_type_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_type_id', $userTypeId);
        $result = $query->getArrayResult();

        $response = false;

        if (!empty($result[0]['totalCount']) && $result[0]['totalCount'] > 0) {
            $response = true;
        }

        return $response;
    }

    public function getUserTimeEntryAccess($userTypeId)
    {
        $dql = "SELECT
                    COUNT(uttep.id) AS totalCount
                FROM
                    \Application\Entity\RediUserTypeTimeEntryPermission uttep
                WHERE
                    uttep.userTypeId = :user_type_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_type_id', $userTypeId);
        $result = $query->getArrayResult();

        $response = true;

        if (!empty($result[0]['totalCount']) && $result[0]['totalCount'] > 0) {
            $response = false;
        }

        return $response;
    }

    /**
     * Get list of all permission of a user type
     *
     * @param int $userTypeId User type id
     * @return array
     */
    public function getUserAccessPermission($userTypeId)
    {
        $dql = "SELECT
                    ua
                FROM
                    \Application\Entity\RediUserAccess ua
                WHERE
                    ua.userTypeId = :user_type_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_type_id', $userTypeId);
        $query->setMaxResults(1);
        $result = $query->getArrayResult();

        $response = array(
            'can_access_basic_data' => (bool)(isset($result[0]['canAccessBasicData']) ? $result[0]['canAccessBasicData'] : false),
            'can_access_extra_data' => (bool)(isset($result[0]['canAccessExtraData']) ? $result[0]['canAccessExtraData'] : false),
            'can_edit' => (bool)(isset($result[0]['canAccessExtraData']) ? $result[0]['canAccessExtraData'] : false),
        );

        return $response;
    }

    public function getUserToApproveTimeEntry($approverUserTypeId)
    {
        $dql = "SELECT
                    uttap.submittingUserTypeId
                FROM
                    \Application\Entity\RediUserTypeTimeApprovalPermission uttap
                WHERE
                    uttap.approverUserTypeId = :approver_user_type_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('approver_user_type_id', $approverUserTypeId);
        $result = $query->getArrayResult();

        $response = array_column($result, 'submittingUserTypeId');

        return $response;
    }

    public function searchProjectPermission()
    {
        $dql = "SELECT
                    pp
                FROM
                    \Application\Entity\RediProjectPermissions pp";

        $query = $this->getEntityManager()->createQuery($dql);
        $result = $query->getArrayResult();

        return $result;
    }

    public function getUserTypeProjectPermission($userTypeId)
    {
        $dql = "select
                    " . $userTypeId . " AS userTypeId,
                    pp.id AS projectPermissionId,
                    pp.key AS projectPermsisionKey,
                    pp.label AS projectPermissionLabel,
                    utpp.canView,
                    utpp.canEdit
                FROM
                    \Application\Entity\RediProjectPermissions pp
                LEFT JOIN
                    \Application\Entity\RediUserTypeProjectPermission utpp
                    WITH pp.id = utpp.projectPermissionId
                        AND utpp.userTypeId = :user_type_id
                GROUP BY pp.id
                ORDER BY pp.id ASC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_type_id', $userTypeId);
        $result = $query->getArrayResult();

        foreach ($result as &$row) {
            $row['userTypeId'] = (int)$row['userTypeId'];
            $row['canView'] = (int)$row['canView'];
            $row['canEdit'] = (int)$row['canEdit'];
        }

        return $result;
    }

    public function isBillingUser($userId)
    {
        $dql = "SELECT 
                u.typeId
                FROM \Application\Entity\RediUser u
                WHERE u.id = :user_id";
        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_id', $userId);
        $query->setMaxResults(1);
        $result = $query->getArrayResult();

        if (empty($result[0]['typeId'])) {
            return false;
        }

        $userTypeId = (int)$result[0]['typeId'];

        return in_array($userTypeId, $this->_billingUserTypeIds);
    }

    public function getTypeIdsByName($typeName) {
        switch ($typeName) {
            case 'music':
                $typeIds = $this->_musicUserTypeIds;
                break;
            case 'writer':
                $typeIds = $this->_writerUserTypeIds;
                break;
            default:
                $typeIds = null;
        }

        return $typeIds;
    }

    public function getUserByTypeName($typeName)
    {
        $typeIds = $this->getTypeIdsByName($typeName);

        if ($typeIds) {
            $dql = "SELECT 
                u
                FROM \Application\Entity\RediUser u
                WHERE u.typeId IN (:type_id)";

            $query = $this->getEntityManager()->createQuery($dql);
            $query->setParameter('type_id', $typeIds, \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
            $result = $query->getArrayResult();

            return $result;
        }

        return array();
    }

    public function getUserLastClockin($userId)
    {
        $dql = "SELECT 
                    uci.clockin
                FROM \Application\Entity\RediUserClockin uci
                WHERE uci.userId = :user_id
                ORDER BY uci.clockin DESC";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setMaxResults(1);
        $query->setParameter('user_id', $userId);
        $result = $query->getArrayResult();

        return (!empty($result[0]['clockin'])?$result[0]['clockin'] : null);
    }

}
