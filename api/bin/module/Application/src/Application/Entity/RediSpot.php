<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediSpot
 *
 * @ORM\Table(name="redi_spot")
 * @ORM\Entity
 */
class RediSpot
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
     * @var string
     *
     * @ORM\Column(name="spot_name", type="string", length=255, nullable=true)
     */
    private $spotName;

    /**
     * @var integer
     *
     * @ORM\Column(name="project_campaign_id", type="integer", nullable=true)
     */
    private $projectCampaignId;

    /**
     * @var integer
     *
     * @ORM\Column(name="revision_not_counted", type="smallint", nullable=true)
     */
    private $revisionNotCounted;

    /**
     * @var string
     *
     * @ORM\Column(name="notes", type="text", nullable=true)
     */
    private $notes;

    /**
     * @var integer
     *
     * @ORM\Column(name="revisions", type="integer", nullable=true)
     */
    private $revisions;

    /**
     * @var integer
     *
     * @ORM\Column(name="graphics_revisions", type="smallint", nullable=true)
     */
    private $graphicsRevisions;

    /**
     * @var string
     *
     * @ORM\Column(name="first_revision_cost", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $firstRevisionCost;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="internal_deadline", type="datetime", nullable=true)
     */
    private $internalDeadline;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="client_deadline", type="datetime", nullable=true)
     */
    private $clientDeadline;

    /**
     * @var string
     *
     * @ORM\Column(name="billing_type", type="string", length=1, nullable=true)
     */
    private $billingType;

    /**
     * @var string
     *
     * @ORM\Column(name="billing_note", type="text", nullable=true)
     */
    private $billingNote;

    /**
     * @var integer
     *
     * @ORM\Column(name="trt_id", type="integer", nullable=true)
     */
    private $trtId;



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
     * Set spotName
     *
     * @param string $spotName
     * @return RediSpot
     */
    public function setSpotName($spotName)
    {
        $this->spotName = $spotName;

        return $this;
    }

    /**
     * Get spotName
     *
     * @return string 
     */
    public function getSpotName()
    {
        return $this->spotName;
    }

    /**
     * Set projectCampaignId
     *
     * @param integer $projectCampaignId
     * @return RediSpot
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
     * Set revisionNotCounted
     *
     * @param integer $revisionNotCounted
     * @return RediSpot
     */
    public function setRevisionNotCounted($revisionNotCounted)
    {
        $this->revisionNotCounted = $revisionNotCounted;

        return $this;
    }

    /**
     * Get revisionNotCounted
     *
     * @return integer 
     */
    public function getRevisionNotCounted()
    {
        return $this->revisionNotCounted;
    }

    /**
     * Set notes
     *
     * @param string $notes
     * @return RediSpot
     */
    public function setNotes($notes)
    {
        $this->notes = $notes;

        return $this;
    }

    /**
     * Get notes
     *
     * @return string 
     */
    public function getNotes()
    {
        return $this->notes;
    }

    /**
     * Set revisions
     *
     * @param integer $revisions
     * @return RediSpot
     */
    public function setRevisions($revisions)
    {
        $this->revisions = $revisions;

        return $this;
    }

    /**
     * Get revisions
     *
     * @return integer 
     */
    public function getRevisions()
    {
        return $this->revisions;
    }

    /**
     * Set graphicsRevisions
     *
     * @param integer $graphicsRevisions
     * @return RediSpot
     */
    public function setGraphicsRevisions($graphicsRevisions)
    {
        $this->graphicsRevisions = $graphicsRevisions;

        return $this;
    }

    /**
     * Get graphicsRevisions
     *
     * @return integer 
     */
    public function getGraphicsRevisions()
    {
        return $this->graphicsRevisions;
    }

    /**
     * Set firstRevisionCost
     *
     * @param string $firstRevisionCost
     * @return RediSpot
     */
    public function setFirstRevisionCost($firstRevisionCost)
    {
        $this->firstRevisionCost = $firstRevisionCost;

        return $this;
    }

    /**
     * Get firstRevisionCost
     *
     * @return string 
     */
    public function getFirstRevisionCost()
    {
        return $this->firstRevisionCost;
    }

    /**
     * Set internalDeadline
     *
     * @param \DateTime $internalDeadline
     * @return RediSpot
     */
    public function setInternalDeadline($internalDeadline)
    {
        $this->internalDeadline = $internalDeadline;

        return $this;
    }

    /**
     * Get internalDeadline
     *
     * @return \DateTime 
     */
    public function getInternalDeadline()
    {
        return $this->internalDeadline;
    }

    /**
     * Set clientDeadline
     *
     * @param \DateTime $clientDeadline
     * @return RediSpot
     */
    public function setClientDeadline($clientDeadline)
    {
        $this->clientDeadline = $clientDeadline;

        return $this;
    }

    /**
     * Get clientDeadline
     *
     * @return \DateTime 
     */
    public function getClientDeadline()
    {
        return $this->clientDeadline;
    }

    /**
     * Set billingType
     *
     * @param string $billingType
     * @return RediSpot
     */
    public function setBillingType($billingType)
    {
        $this->billingType = $billingType;

        return $this;
    }

    /**
     * Get billingType
     *
     * @return string 
     */
    public function getBillingType()
    {
        return $this->billingType;
    }

    /**
     * Set billingNote
     *
     * @param string $billingNote
     * @return RediSpot
     */
    public function setBillingNote($billingNote)
    {
        $this->billingNote = $billingNote;

        return $this;
    }

    /**
     * Get billingNote
     *
     * @return string 
     */
    public function getBillingNote()
    {
        return $this->billingNote;
    }

    /**
     * Set trtId
     *
     * @param integer $trtId
     * @return RediSpot
     */
    public function setTrtId($trtId)
    {
        $this->trtId = $trtId;

        return $this;
    }

    /**
     * Get trtId
     *
     * @return integer 
     */
    public function getTrtId()
    {
        return $this->trtId;
    }
}
