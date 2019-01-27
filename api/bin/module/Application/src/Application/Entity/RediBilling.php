<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediBilling
 *
 * @ORM\Table(name="redi_billing")
 * @ORM\Entity
 */
class RediBilling
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
     * @ORM\Column(name="project_campaign_id", type="bigint", nullable=true)
     */
    private $projectCampaignId;

    /**
     * @var integer
     *
     * @ORM\Column(name="ratecard_id", type="integer", nullable=true)
     */
    private $ratecardId;

    /**
     * @var integer
     *
     * @ORM\Column(name="ratecard_template_id", type="integer", nullable=true)
     */
    private $ratecardTemplateId;

    /**
     * @var integer
     *
     * @ORM\Column(name="status", type="integer", nullable=true)
     */
    private $status;

    /**
     * @var integer
     *
     * @ORM\Column(name="created_by", type="integer", nullable=true)
     */
    private $createdBy;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @var integer
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updatedBy;

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
     * Set projectCampaignId
     *
     * @param integer $projectCampaignId
     * @return RediBilling
     */
    public function setProjectCampaignId($projectCampaignId)
    {
        $this->projectCampaignId = $projectCampaignId;

        return $this;
    }

    /**
     * Get projectCampaignId
     *
     * @return integer 
     */
    public function getProjectCampaignId()
    {
        return $this->projectCampaignId;
    }

    /**
     * Set ratecardId
     *
     * @param integer $ratecardId
     * @return RediBilling
     */
    public function setRatecardId($ratecardId)
    {
        $this->ratecardId = $ratecardId;

        return $this;
    }

    /**
     * Get ratecardId
     *
     * @return integer 
     */
    public function getRatecardId()
    {
        return $this->ratecardId;
    }

    /**
     * Set ratecardTemplateId
     *
     * @param integer $ratecardTemplateId
     * @return RediBilling
     */
    public function setRatecardTemplateId($ratecardTemplateId)
    {
        $this->ratecardTemplateId = $ratecardTemplateId;

        return $this;
    }

    /**
     * Get ratecardTemplateId
     *
     * @return integer 
     */
    public function getRatecardTemplateId()
    {
        return $this->ratecardTemplateId;
    }

    /**
     * Set status
     *
     * @param integer $status
     * @return RediBilling
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set createdBy
     *
     * @param integer $createdBy
     * @return RediBilling
     */
    public function setCreatedBy($createdBy)
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    /**
     * Get createdBy
     *
     * @return integer 
     */
    public function getCreatedBy()
    {
        return $this->createdBy;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return RediBilling
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
     * Set updatedBy
     *
     * @param integer $updatedBy
     * @return RediBilling
     */
    public function setUpdatedBy($updatedBy)
    {
        $this->updatedBy = $updatedBy;

        return $this;
    }

    /**
     * Get updatedBy
     *
     * @return integer 
     */
    public function getUpdatedBy()
    {
        return $this->updatedBy;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     * @return RediBilling
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
