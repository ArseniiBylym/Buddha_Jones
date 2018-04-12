<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediGraphicsRequestAssign
 *
 * @ORM\Table(name="redi_graphics_request_assign")
 * @ORM\Entity
 */
class RediGraphicsRequestAssign
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="graphics_request_id", type="bigint", nullable=true)
     */
    private $graphicsRequestId;

    /**
     * @var integer
     *
     * @ORM\Column(name="assigned_to_user_id", type="bigint", nullable=true)
     */
    private $assignedToUserId;

    /**
     * @var integer
     *
     * @ORM\Column(name="accepted", type="smallint", nullable=true)
     */
    private $accepted;

    /**
     * @var integer
     *
     * @ORM\Column(name="created_by_user_id", type="bigint", nullable=true)
     */
    private $createdByUserId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;



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
     * Set graphicsRequestId
     *
     * @param integer $graphicsRequestId
     * @return RediGraphicsRequestAssign
     */
    public function setGraphicsRequestId($graphicsRequestId)
    {
        $this->graphicsRequestId = $graphicsRequestId;

        return $this;
    }

    /**
     * Get graphicsRequestId
     *
     * @return integer 
     */
    public function getGraphicsRequestId()
    {
        return $this->graphicsRequestId;
    }

    /**
     * Set assignedToUserId
     *
     * @param integer $assignedToUserId
     * @return RediGraphicsRequestAssign
     */
    public function setAssignedToUserId($assignedToUserId)
    {
        $this->assignedToUserId = $assignedToUserId;

        return $this;
    }

    /**
     * Get assignedToUserId
     *
     * @return integer 
     */
    public function getAssignedToUserId()
    {
        return $this->assignedToUserId;
    }

    /**
     * Set accepted
     *
     * @param integer $accepted
     * @return RediGraphicsRequestAssign
     */
    public function setAccepted($accepted)
    {
        $this->accepted = $accepted;

        return $this;
    }

    /**
     * Get accepted
     *
     * @return integer 
     */
    public function getAccepted()
    {
        return $this->accepted;
    }

    /**
     * Set createdByUserId
     *
     * @param integer $createdByUserId
     * @return RediGraphicsRequestAssign
     */
    public function setCreatedByUserId($createdByUserId)
    {
        $this->createdByUserId = $createdByUserId;

        return $this;
    }

    /**
     * Get createdByUserId
     *
     * @return integer 
     */
    public function getCreatedByUserId()
    {
        return $this->createdByUserId;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return RediGraphicsRequestAssign
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     * @return RediGraphicsRequestAssign
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime 
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }
}
