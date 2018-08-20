<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediUserTypeTimeEntryPermission
 *
 * @ORM\Table(name="redi_user_type_time_entry_permission")
 * @ORM\Entity
 */
class RediUserTypeTimeEntryPermission
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
     * @ORM\Column(name="user_type_id", type="integer", nullable=false)
     */
    private $userTypeId;



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
     * Set userTypeId
     *
     * @param integer $userTypeId
     * @return RediUserTypeTimeEntryPermission
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
