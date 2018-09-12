<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediUserTypeResource
 *
 * @ORM\Table(name="redi_user_type_resource")
 * @ORM\Entity
 */
class RediUserTypeResource
{
    /**
     * @var integer
     *
     * @ORM\Column(name="user_type_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $userTypeId;

    /**
     * @var string
     *
     * @ORM\Column(name="resource_id", type="string", length=45, nullable=true)
     */
    private $resourceId;

    /**
     * @var string
     *
     * @ORM\Column(name="allow", type="string", length=45, nullable=true)
     */
    private $allow;



    /**
     * Get userTypeId
     *
     * @return integer 
     */
    public function getUserTypeId()
    {
        return $this->userTypeId;
    }

    /**
     * Set resourceId
     *
     * @param string $resourceId
     * @return RediUserTypeResource
     */
    public function setResourceId($resourceId)
    {
        $this->resourceId = $resourceId;

        return $this;
    }

    /**
     * Get resourceId
     *
     * @return string 
     */
    public function getResourceId()
    {
        return $this->resourceId;
    }

    /**
     * Set allow
     *
     * @param string $allow
     * @return RediUserTypeResource
     */
    public function setAllow($allow)
    {
        $this->allow = $allow;

        return $this;
    }

    /**
     * Get allow
     *
     * @return string 
     */
    public function getAllow()
    {
        return $this->allow;
    }
}
