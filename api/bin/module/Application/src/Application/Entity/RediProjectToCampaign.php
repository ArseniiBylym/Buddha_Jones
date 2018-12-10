<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediProjectToCampaign
 *
 * @ORM\Table(name="redi_project_to_campaign")
 * @ORM\Entity
 */
class RediProjectToCampaign
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
     * @ORM\Column(name="project_id", type="integer", nullable=true)
     */
    private $projectId;

    /**
     * @var integer
     *
     * @ORM\Column(name="campaign_id", type="integer", nullable=true)
     */
    private $campaignId;

    /**
     * @var integer
     *
     * @ORM\Column(name="customer_id", type="integer", nullable=true)
     */
    private $customerId;

    /**
     * @var integer
     *
     * @ORM\Column(name="first_point_of_contact_id", type="integer", nullable=true)
     */
    private $firstPointOfContactId;

    /**
     * @var boolean
     *
     * @ORM\Column(name="request_writing_team", type="boolean", nullable=true)
     */
    private $requestWritingTeam;

    /**
     * @var string
     *
     * @ORM\Column(name="writing_team_notes", type="text", nullable=true)
     */
    private $writingTeamNotes;

    /**
     * @var boolean
     *
     * @ORM\Column(name="request_music_team", type="boolean", nullable=true)
     */
    private $requestMusicTeam;

    /**
     * @var string
     *
     * @ORM\Column(name="music_team_notes", type="text", nullable=true)
     */
    private $musicTeamNotes;

    /**
     * @var string
     *
     * @ORM\Column(name="note", type="text", nullable=true)
     */
    private $note;

    /**
     * @var string
     *
     * @ORM\Column(name="budget", type="text", nullable=true)
     */
    private $budget;

    /**
     * @var string
     *
     * @ORM\Column(name="budget_note", type="text", nullable=true)
     */
    private $budgetNote;

    /**
     * @var string
     *
     * @ORM\Column(name="POR", type="string", length=200, nullable=true)
     */
    private $por;

    /**
     * @var string
     *
     * @ORM\Column(name="invoice_contact", type="string", length=200, nullable=true)
     */
    private $invoiceContact;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="material_receive_date", type="datetime", nullable=true)
     */
    private $materialReceiveDate;

    /**
     * @var boolean
     *
     * @ORM\Column(name="approved_by_billing", type="boolean", nullable=true)
     */
    private $approvedByBilling;

    /**
     * @var integer
     *
     * @ORM\Column(name="channel_id", type="integer", nullable=true)
     */
    private $channelId;



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
     * @return RediProjectToCampaign
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
     * @return RediProjectToCampaign
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
     * Set customerId
     *
     * @param integer $customerId
     * @return RediProjectToCampaign
     */
    public function setCustomerId($customerId)
    {
        $this->customerId = $customerId;

        return $this;
    }

    /**
     * Get customerId
     *
     * @return integer 
     */
    public function getCustomerId()
    {
        return $this->customerId;
    }

    /**
     * Set firstPointOfContactId
     *
     * @param integer $firstPointOfContactId
     * @return RediProjectToCampaign
     */
    public function setFirstPointOfContactId($firstPointOfContactId)
    {
        $this->firstPointOfContactId = $firstPointOfContactId;

        return $this;
    }

    /**
     * Get firstPointOfContactId
     *
     * @return integer 
     */
    public function getFirstPointOfContactId()
    {
        return $this->firstPointOfContactId;
    }

    /**
     * Set requestWritingTeam
     *
     * @param boolean $requestWritingTeam
     * @return RediProjectToCampaign
     */
    public function setRequestWritingTeam($requestWritingTeam)
    {
        $this->requestWritingTeam = $requestWritingTeam;

        return $this;
    }

    /**
     * Get requestWritingTeam
     *
     * @return boolean 
     */
    public function getRequestWritingTeam()
    {
        return $this->requestWritingTeam;
    }

    /**
     * Set writingTeamNotes
     *
     * @param string $writingTeamNotes
     * @return RediProjectToCampaign
     */
    public function setWritingTeamNotes($writingTeamNotes)
    {
        $this->writingTeamNotes = $writingTeamNotes;

        return $this;
    }

    /**
     * Get writingTeamNotes
     *
     * @return string 
     */
    public function getWritingTeamNotes()
    {
        return $this->writingTeamNotes;
    }

    /**
     * Set requestMusicTeam
     *
     * @param boolean $requestMusicTeam
     * @return RediProjectToCampaign
     */
    public function setRequestMusicTeam($requestMusicTeam)
    {
        $this->requestMusicTeam = $requestMusicTeam;

        return $this;
    }

    /**
     * Get requestMusicTeam
     *
     * @return boolean 
     */
    public function getRequestMusicTeam()
    {
        return $this->requestMusicTeam;
    }

    /**
     * Set musicTeamNotes
     *
     * @param string $musicTeamNotes
     * @return RediProjectToCampaign
     */
    public function setMusicTeamNotes($musicTeamNotes)
    {
        $this->musicTeamNotes = $musicTeamNotes;

        return $this;
    }

    /**
     * Get musicTeamNotes
     *
     * @return string 
     */
    public function getMusicTeamNotes()
    {
        return $this->musicTeamNotes;
    }

    /**
     * Set note
     *
     * @param string $note
     * @return RediProjectToCampaign
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
     * Set budget
     *
     * @param string $budget
     * @return RediProjectToCampaign
     */
    public function setBudget($budget)
    {
        $this->budget = $budget;

        return $this;
    }

    /**
     * Get budget
     *
     * @return string 
     */
    public function getBudget()
    {
        return $this->budget;
    }

    /**
     * Set budgetNote
     *
     * @param string $budgetNote
     * @return RediProjectToCampaign
     */
    public function setBudgetNote($budgetNote)
    {
        $this->budgetNote = $budgetNote;

        return $this;
    }

    /**
     * Get budgetNote
     *
     * @return string 
     */
    public function getBudgetNote()
    {
        return $this->budgetNote;
    }

    /**
     * Set por
     *
     * @param string $por
     * @return RediProjectToCampaign
     */
    public function setPor($por)
    {
        $this->por = $por;

        return $this;
    }

    /**
     * Get por
     *
     * @return string 
     */
    public function getPor()
    {
        return $this->por;
    }

    /**
     * Set invoiceContact
     *
     * @param string $invoiceContact
     * @return RediProjectToCampaign
     */
    public function setInvoiceContact($invoiceContact)
    {
        $this->invoiceContact = $invoiceContact;

        return $this;
    }

    /**
     * Get invoiceContact
     *
     * @return string 
     */
    public function getInvoiceContact()
    {
        return $this->invoiceContact;
    }

    /**
     * Set materialReceiveDate
     *
     * @param \DateTime $materialReceiveDate
     * @return RediProjectToCampaign
     */
    public function setMaterialReceiveDate($materialReceiveDate)
    {
        $this->materialReceiveDate = $materialReceiveDate;

        return $this;
    }

    /**
     * Get materialReceiveDate
     *
     * @return \DateTime 
     */
    public function getMaterialReceiveDate()
    {
        return $this->materialReceiveDate;
    }

    /**
     * Set approvedByBilling
     *
     * @param boolean $approvedByBilling
     * @return RediProjectToCampaign
     */
    public function setApprovedByBilling($approvedByBilling)
    {
        $this->approvedByBilling = $approvedByBilling;

        return $this;
    }

    /**
     * Get approvedByBilling
     *
     * @return boolean 
     */
    public function getApprovedByBilling()
    {
        return $this->approvedByBilling;
    }

    /**
     * Set channelId
     *
     * @param integer $channelId
     * @return RediProjectToCampaign
     */
    public function setChannelId($channelId)
    {
        $this->channelId = $channelId;

        return $this;
    }

    /**
     * Get channelId
     *
     * @return integer 
     */
    public function getChannelId()
    {
        return $this->channelId;
    }
}
