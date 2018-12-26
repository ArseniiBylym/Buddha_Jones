<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediSubModule
 *
 * @ORM\Table(name="redi_sub_module")
 * @ORM\Entity
 */
class RediSubModule
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="module_id", type="integer", nullable=true)
     */
    private $moduleId;

    /**
     * @var string
     *
     * @ORM\Column(name="sub_module_name", type="string", length=50, nullable=true)
     */
    private $subModuleName;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set moduleId
     *
     * @param integer $moduleId
     * @return RediSubModule
     */
    public function setModuleId($moduleId)
    {
        $this->moduleId = $moduleId;

        return $this;
    }

    /**
     * Get moduleId
     *
     * @return integer 
     */
    public function getModuleId()
    {
        return $this->moduleId;
    }

    /**
     * Set subModuleName
     *
     * @param string $subModuleName
     * @return RediSubModule
     */
    public function setSubModuleName($subModuleName)
    {
        $this->subModuleName = $subModuleName;

        return $this;
    }

    /**
     * Get subModuleName
     *
     * @return string 
     */
    public function getSubModuleName()
    {
        return $this->subModuleName;
    }
}
