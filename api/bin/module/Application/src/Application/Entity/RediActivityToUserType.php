<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediActivityToUserType
 *
 * @ORM\Table(name="redi_activity_to_user_type", indexes={@ORM\Index(name="activity_id", columns={"activity_id"}), @ORM\Index(name="user_type_id", columns={"user_type_id"})})
 * @ORM\Entity
 */
class RediActivityToUserType
{
    /**
     * @var integer
     *
     * @ORM\Column(name="activity_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $activityId;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_type_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $userTypeId;



    /**
     * Set activityId
     *
     * @param integer $activityId
     * @return RediActivityToUserType
     */
    public function setActivityId($activityId)
    {
        $this->activityId = $activityId;

        return $this;
    }

    /**
     * Get activityId
     *
     * @return integer 
     */
    public function getActivityId()
    {
        return $this->activityId;
    }

    /**
     * Set userTypeId
     *
     * @param integer $userTypeId
     * @return RediActivityToUserType
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
