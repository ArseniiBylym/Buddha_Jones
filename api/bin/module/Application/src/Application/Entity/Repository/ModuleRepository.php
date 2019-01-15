<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;
use Zend\View\Model\ViewModel;



// before called Table now Repository Table Data Gateway
// In Bug Entity add  @Entity(repositoryClass="BugRepository")
// To be able to use this query logic through
// $this->getEntityManager()->getRepository('Bug') we have to adjust the metadata slightly.
// http://stackoverflow.com/questions/10481916/the-method-name-must-start-with-either-findby-or-findoneby-uncaught-exception

class ModuleRepository extends EntityRepository
{
    private $_className = "\Application\Entity\RediModule";

    private $_config;

    public function __construct(EntityManager $entityManager)
    {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);

        $this->_config = new Config(include 'config/autoload/global.php');
    }

    public function getModuleTree()
    {
        $modules = $this->getAllModule();
        $subModules = $this->getAllSubModule();

        $modules = array_map(function ($module) use ($subModules) {
            $subModuleArr = array_filter($subModules, function ($subModule) use ($module) {
                return ($subModule['moduleId'] == $module['id']);
            });

            $subModuleArr = array_map(function ($subModule) {
                unset($subModule['moduleId']);
                return $subModule;
            }, $subModuleArr);

            $module['subModule'] = $subModuleArr;

            return $module;
        }, $modules);

        return $modules;
    }

    public function getAllModule($filter = array())
    {
        $dql = "SELECT 
                  m
                FROM \Application\Entity\RediModule m";

        $dqlFilter = [];

        if (!empty($filter['module_id'])) {
            $dqlFilter[] = " m.id = :module_id";
        }

        if ($dqlFilter) {
            $dql = " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY m.moduleName ASC";

        $query = $this->getEntityManager()->createQuery($dql);

        if (!empty($filter['module_id'])) {
            $query->setParameter('module_id', $filter['module_id']);
        }

        $result = $query->getArrayResult();

        return $result;
    }

    public function getAllSubModule($filter = array())
    {
        $dql = "SELECT 
                  s
                FROM \Application\Entity\RediSubModule s";

        $dqlFilter = [];

        if (!empty($filter['module_id'])) {
            $dqlFilter[] = " s.moduleId = :module_id";
        }

        if (!empty($filter['sub_module_id'])) {
            $dqlFilter[] = " s.id = :sub_module_id";
        }

        if ($dqlFilter) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $dql .= " ORDER BY s.subModuleName ASC";

        $query = $this->getEntityManager()->createQuery($dql);

        if (!empty($filter['module_id'])) {
            $query->setParameter('module_id', $filter['module_id']);
        }

        if (!empty($filter['sub_module_id'])) {
            $query->setParameter('sub_module_id', $filter['sub_module_id']);
        }

        $result = $query->getArrayResult();

        return $result;
    }

    public function getSubModuleAccess($filter = array())
    {
        $dql = "SELECT 
                  sma
                FROM 
                    \Application\Entity\RediSubModuleAccess sma
                    LEFT JOIN \Application\Entity\RediUser u
                        WITH u.typeId = sma.userTypeId";

        $dqlFilter = [];

        if (!empty($filter['user_id'])) {
            $dqlFilter[] = " u.id = :user_id";
        }

        if (!empty($filter['user_type_id'])) {
            $dqlFilter[] = " sma.userTypeId = :user_type_id";
        }

        if ($dqlFilter) {
            $dql .= " WHERE " . implode(" AND ", $dqlFilter);
        }

        $query = $this->getEntityManager()->createQuery($dql);

        if (!empty($filter['user_id'])) {
            $query->setParameter('user_id', $filter['user_id']);
        }

        if (!empty($filter['user_type_id'])) {
            $query->setParameter('user_type_id', $filter['user_type_id']);
        }

        $result = $query->getArrayResult();

        if (empty($filter['return_full_data'])) {
            return $result;
        }

        // $filter['return_full_data'] is true
        $response = $this->getModuleTree();
        $result = array_column($result, 'subModuleId');

        $response = array_map(function ($module) use ($result) {
            $module['subModule'] = array_map(function ($subModule) use ($result) {
                $subModule['canAccess'] = (bool)(in_array($subModule['id'], $result));
                return $subModule;
            }, $module['subModule']);

            return $module;
        }, $response);
        return $response;
    }

    public function removeAccessByUserTypeId($userTypeId)
    {
        $dql = "DELETE
                    FROM \Application\Entity\RediSubModuleAccess sma
                    WHERE sma.userTypeId = :user_type_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_type_id', $userTypeId);
        $query->execute();
    }

    public function checkUserSubModule($userTypeId, $subModuleId)
    {
        $dql = "SELECT 
                  COUNT(sma) AS total_count
                FROM 
                    \Application\Entity\RediSubModuleAccess sma
                WHERE 
                    sma.userTypeId = :user_type_id
                    AND sma.subModuleId = :sub_module_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('sub_module_id', $subModuleId);
        $query->setParameter('user_type_id', $userTypeId);

        $result = $query->getArrayResult();

        return (bool)(isset($result[0]['total_count']) ? (int)$result[0]['total_count'] : 0);
    }

    public function getUserSubModules($userTypeId)
    {
        $dql = "SELECT 
                  sma
                FROM 
                    \Application\Entity\RediSubModuleAccess sma
                WHERE 
                    sma.userTypeId = :user_type_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter('user_type_id', $userTypeId);
        $result = $query->getArrayResult();

        return array_column($result, 'sub_module_id');

    }
}
