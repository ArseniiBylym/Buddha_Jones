<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediGraphicsRequest
 *
 * @ORM\Table(name="redi_graphics_request")
 * @ORM\Entity
 */
class RediGraphicsRequest
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
     * @ORM\Column(name="project_id", type="bigint", nullable=true)
     */
    private $projectId;

    /**
     * @var integer
     *
     * @ORM\Column(name="campaign_id", type="bigint", nullable=true)
     */
    private $campaignId;

    /**
     * @var integer
     *
     * @ORM\Column(name="spot_id", type="bigint", nullable=true)
     */
    private $spotId;

    /**
     * @var integer
     *
     * @ORM\Column(name="version_id", type="bigint", nullable=true)
     */
    private $versionId;

    /**
     * @var string
     *
     * @ORM\Column(name="resolution", type="string", length=200, nullable=true)
     */
    private $resolution;

    /**
     * @var string
     *
     * @ORM\Column(name="resolution_note", type="text", nullable=true)
     */
    private $resolutionNote;

    /**
     * @var string
     *
     * @ORM\Column(name="note", type="text", nullable=true)
     */
    private $note;

    /**
     * @var integer
     *
     * @ORM\Column(name="status_id", type="integer", nullable=true)
     */
    private $statusId;

    /**
     * @var integer
     *
     * @ORM\Column(name="urgent", type="smallint", nullable=true)
     */
    private $urgent;

    /**
     * @var integer
     *
     * @ORM\Column(name="created_by_user_id", type="bigint", nullable=true)
     */
    private $createdByUserId;

    /**
     * @var integer
     *
     * @ORM\Column(name="in_house", type="smallint", nullable=true)
     */
    private $inHouse;

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
     * Set projectId
     *
     * @param integer $projectId
     * @return RediGraphicsRequest
     */
    public function setProjectId($projectId)
    {
        $this->projectId = $projectId;

        return $this;
    }

    /**
     * Get projectId
     *
     * @return integer 
     */
    public function getProjectId()
    {
        return $this->projectId;
    }

    /**
     * Set campaignId
     *
     * @param integer $campaignId
     * @return RediGraphicsRequest
     */
    public function setCampaignId($campaignId)
    {
        $this->campaignId = $campaignId;

        return $this;
    }

    /**
     * Get campaignId
     *
     * @return integer 
     */
    public function getCampaignId()
    {
        return $this->campaignId;
    }

    /**
     * Set spotId
     *
     * @param integer $spotId
     * @return RediGraphicsRequest
     */
    public function setSpotId($spotId)
    {
        $this->spotId = $spotId;

        return $this;
    }

    /**
     * Get spotId
     *
     * @return integer 
     */
    public function getSpotId()
    {
        return $this->spotId;
    }

    /**
     * Set versionId
     *
     * @param integer $versionId
     * @return RediGraphicsRequest
     */
    public function setVersionId($versionId)
    {
        $this->versionId = $versionId;

        return $this;
    }

    /**
     * Get versionId
     *
     * @return integer 
     */
    public function getVersionId()
    {
        return $this->versionId;
    }

    /**
     * Set resolution
     *
     * @param string $resolution
     * @return RediGraphicsRequest
     */
    public function setResolution($resolution)
    {
        $this->resolution = $resolution;

        return $this;
    }

    /**
     * Get resolution
     *
     * @return string 
     */
    public function getResolution()
    {
        return $this->resolution;
    }

    /**
     * Set resolutionNote
     *
     * @param string $resolutionNote
     * @return RediGraphicsRequest
     */
    public function setResolutionNote($resolutionNote)
    {
        $this->resolutionNote = $resolutionNote;

        return $this;
    }

    /**
     * Get resolutionNote
     *
     * @return string 
     */
    public function getResolutionNote()
    {
        return $this->resolutionNote;
    }

    /**
     * Set note
     *
     * @param string $note
     * @return RediGraphicsRequest
     */
    public function setNote($note)
    {
        $this->note = $note;

        return $this;
    }

    /**
     * Get note
     *
     * @return string 
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set statusId
     *
     * @param integer $statusId
     * @return RediGraphicsRequest
     */
    public function setStatusId($statusId)
    {
        $this->statusId = $statusId;

        return $this;
    }

    /**
     * Get statusId
     *
     * @return integer 
     */
    public function getStatusId()
    {
        return $this->statusId;
    }

    /**
     * Set urgent
     *
     * @param integer $urgent
     * @return RediGraphicsRequest
     */
    public function setUrgent($urgent)
    {
        $this->urgent = $urgent;

        return $this;
    }

    /**
     * Get urgent
     *
     * @return integer 
     */
    public function getUrgent()
    {
        return $this->urgent;
    }

    /**
     * Set createdByUserId
     *
     * @param integer $createdByUserId
     * @return RediGraphicsRequest
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
     * Set inHouse
     *
     * @param integer $inHouse
     * @return RediGraphicsRequest
     */
    public function setInHouse($inHouse)
    {
        $this->inHouse = $inHouse;

        return $this;
    }

    /**
     * Get inHouse
     *
     * @return integer 
     */
    public function getInHouse()
    {
        return $this->inHouse;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return RediGraphicsRequest
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
     * @return RediGraphicsRequest
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
