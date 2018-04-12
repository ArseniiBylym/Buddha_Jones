<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediActivityToType
 *
 * @ORM\Table(name="redi_activity_to_type", indexes={@ORM\Index(name="activity_id", columns={"activity_id"}), @ORM\Index(name="type_id", columns={"type_id"})})
 * @ORM\Entity
 */
class RediActivityToType
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
     * @ORM\Column(name="type_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $typeId;



    /**
     * Set activityId
     *
     * @param integer $activityId
     * @return RediActivityToType
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
     * Set typeId
     *
     * @param integer $typeId
     * @return RediActivityToType
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
}
