<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediActivity
 *
 * @ORM\Table(name="redi_activity")
 * @ORM\Entity
 */
class RediActivity
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @var integer
     *
     * @ORM\Column(name="type_id", type="integer", nullable=true)
     */
    private $typeId;

    /**
     * @var integer
     *
     * @ORM\Column(name="description_required", type="smallint", nullable=true)
     */
    private $descriptionRequired;

    /**
     * @var integer
     *
     * @ORM\Column(name="billable", type="smallint", nullable=true)
     */
    private $billable;

    /**
     * @var boolean
     *
     * @ORM\Column(name="project_campaign_required", type="boolean", nullable=true)
     */
    private $projectCampaignRequired;

    /**
     * @var boolean
     *
     * @ORM\Column(name="project_campaign_spot_version_required", type="boolean", nullable=true)
     */
    private $projectCampaignSpotVersionRequired;

    /**
     * @var boolean
     *
     * @ORM\Column(name="files_included", type="boolean", nullable=true)
     */
    private $filesIncluded;

    /**
     * @var integer
     *
     * @ORM\Column(name="status", type="smallint", nullable=true)
     */
    private $status;

    /**
     * @var integer
     *
     * @ORM\Column(name="allowed_in_future", type="smallint", nullable=true)
     */
    private $allowedInFuture;



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
     * Set name
     *
     * @param string $name
     * @return RediActivity
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set typeId
     *
     * @param integer $typeId
     * @return RediActivity
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
     * Set descriptionRequired
     *
     * @param integer $descriptionRequired
     * @return RediActivity
     */
    public function setDescriptionRequired($descriptionRequired)
    {
        $this->descriptionRequired = $descriptionRequired;

        return $this;
    }

    /**
     * Get descriptionRequired
     *
     * @return integer 
     */
    public function getDescriptionRequired()
    {
        return $this->descriptionRequired;
    }

    /**
     * Set billable
     *
     * @param integer $billable
     * @return RediActivity
     */
    public function setBillable($billable)
    {
        $this->billable = $billable;

        return $this;
    }

    /**
     * Get billable
     *
     * @return integer 
     */
    public function getBillable()
    {
        return $this->billable;
    }

    /**
     * Set projectCampaignRequired
     *
     * @param boolean $projectCampaignRequired
     * @return RediActivity
     */
    public function setProjectCampaignRequired($projectCampaignRequired)
    {
        $this->projectCampaignRequired = $projectCampaignRequired;

        return $this;
    }

    /**
     * Get projectCampaignRequired
     *
     * @return boolean 
     */
    public function getProjectCampaignRequired()
    {
        return $this->projectCampaignRequired;
    }

    /**
     * Set projectCampaignSpotVersionRequired
     *
     * @param boolean $projectCampaignSpotVersionRequired
     * @return RediActivity
     */
    public function setProjectCampaignSpotVersionRequired($projectCampaignSpotVersionRequired)
    {
        $this->projectCampaignSpotVersionRequired = $projectCampaignSpotVersionRequired;

        return $this;
    }

    /**
     * Get projectCampaignSpotVersionRequired
     *
     * @return boolean 
     */
    public function getProjectCampaignSpotVersionRequired()
    {
        return $this->projectCampaignSpotVersionRequired;
    }

    /**
     * Set filesIncluded
     *
     * @param boolean $filesIncluded
     * @return RediActivity
     */
    public function setFilesIncluded($filesIncluded)
    {
        $this->filesIncluded = $filesIncluded;

        return $this;
    }

    /**
     * Get filesIncluded
     *
     * @return boolean 
     */
    public function getFilesIncluded()
    {
        return $this->filesIncluded;
    }

    /**
     * Set status
     *
     * @param integer $status
     * @return RediActivity
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
     * Set allowedInFuture
     *
     * @param integer $allowedInFuture
     * @return RediActivity
     */
    public function setAllowedInFuture($allowedInFuture)
    {
        $this->allowedInFuture = $allowedInFuture;

        return $this;
    }

    /**
     * Get allowedInFuture
     *
     * @return integer 
     */
    public function getAllowedInFuture()
    {
        return $this->allowedInFuture;
    }
}
