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

        $modules = array_map(function($module) use ($subModules) {
            $module['subModule'] = array_filter($subModules, function($subModule) use ($module){
                return ($subModule['moduleId'] == $module['id']);
            });

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
}
