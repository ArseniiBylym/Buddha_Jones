<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediUserTypeClass
 *
 * @ORM\Table(name="redi_user_type_class")
 * @ORM\Entity
 */
class RediUserTypeClass
{
    /**
     * @var integer
     *
     * @ORM\Column(name="type_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $typeId;

    /**
     * @var string
     *
     * @ORM\Column(name="class", type="string", length=1, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $class;



    /**
     * Set typeId
     *
     * @param integer $typeId
     * @return RediUserTypeClass
     */
    public function setTypeId($typeId)
    {
        $this->typeId = $typeId;

        return $this;
    }

    /**
     * Get typeId
     *
     * @return integer 
     */
    public function getTypeId()
    {
        return $this->typeId;
    }

    /**
     * Set class
     *
     * @param string $class
     * @return RediUserTypeClass
     */
    public function setClass($class)
    {
        $this->class = $class;

        return $this;
    }

    /**
     * Get class
     *
     * @return string 
     */
    public function getClass()
    {
        return $this->class;
    }
}
