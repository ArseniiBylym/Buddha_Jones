<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediUserTypeClassName
 *
 * @ORM\Table(name="redi_user_type_class_name")
 * @ORM\Entity
 */
class RediUserTypeClassName
{
    /**
     * @var string
     *
     * @ORM\Column(name="class", type="string", length=1, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $class;

    /**
     * @var string
     *
     * @ORM\Column(name="class_name", type="string", length=45, nullable=true)
     */
    private $className;



    /**
     * Get class
     *
     * @return string 
     */
    public function getClass()
    {
        return $this->class;
    }

    /**
     * Set className
     *
     * @param string $className
     * @return RediUserTypeClassName
     */
    public function setClassName($className)
    {
        $this->className = $className;

        return $this;
    }

    /**
     * Get className
     *
     * @return string 
     */
    public function getClassName()
    {
        return $this->className;
    }
}
