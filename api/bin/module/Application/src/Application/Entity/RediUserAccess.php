<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediUserAccess
 *
 * @ORM\Table(name="redi_user_access")
 * @ORM\Entity
 */
class RediUserAccess
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
     * @var boolean
     *
     * @ORM\Column(name="can_access_basic_data", type="boolean", nullable=true)
     */
    private $canAccessBasicData;

    /**
     * @var boolean
     *
     * @ORM\Column(name="can_access_extra_data", type="boolean", nullable=true)
     */
    private $canAccessExtraData;

    /**
     * @var boolean
     *
     * @ORM\Column(name="can_edit", type="boolean", nullable=true)
     */
    private $canEdit;



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
     * Set canAccessBasicData
     *
     * @param boolean $canAccessBasicData
     * @return RediUserAccess
     */
    public function setCanAccessBasicData($canAccessBasicData)
    {
        $this->canAccessBasicData = $canAccessBasicData;

        return $this;
    }

    /**
     * Get canAccessBasicData
     *
     * @return boolean 
     */
    public function getCanAccessBasicData()
    {
        return $this->canAccessBasicData;
    }

    /**
     * Set canAccessExtraData
     *
     * @param boolean $canAccessExtraData
     * @return RediUserAccess
     */
    public function setCanAccessExtraData($canAccessExtraData)
    {
        $this->canAccessExtraData = $canAccessExtraData;

        return $this;
    }

    /**
     * Get canAccessExtraData
     *
     * @return boolean 
     */
    public function getCanAccessExtraData()
    {
        return $this->canAccessExtraData;
    }

    /**
     * Set canEdit
     *
     * @param boolean $canEdit
     * @return RediUserAccess
     */
    public function setCanEdit($canEdit)
    {
        $this->canEdit = $canEdit;

        return $this;
    }

    /**
     * Get canEdit
     *
     * @return boolean 
     */
    public function getCanEdit()
    {
        return $this->canEdit;
    }
}
