<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediSubModuleAccess
 *
 * @ORM\Table(name="redi_sub_module_access")
 * @ORM\Entity
 */
class RediSubModuleAccess
{
    /**
     * @var integer
     *
     * @ORM\Column(name="sub_module_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $subModuleId;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_type_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $userTypeId;



    /**
     * Set subModuleId
     *
     * @param integer $subModuleId
     * @return RediSubModuleAccess
     */
    public function setSubModuleId($subModuleId)
    {
        $this->subModuleId = $subModuleId;

        return $this;
    }

    /**
     * Get subModuleId
     *
     * @return integer 
     */
    public function getSubModuleId()
    {
        return $this->subModuleId;
    }

    /**
     * Set userTypeId
     *
     * @param integer $userTypeId
     * @return RediSubModuleAccess
     */
    public function setUserTypeId($userTypeId)
    {
        $this->userTypeId = $userTypeId;

        return $this;
    }

    /**
     * Get userTypeId
     *
     * @return integer 
     */
    public function getUserTypeId()
    {
        return $this->userTypeId;
    }
}
