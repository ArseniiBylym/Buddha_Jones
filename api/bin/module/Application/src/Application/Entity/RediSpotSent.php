<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediSpotSent
 *
 * @ORM\Table(name="redi_spot_sent")
 * @ORM\Entity
 */
class RediSpotSent
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
     * @ORM\Column(name="request_id", type="bigint", nullable=true)
     */
    private $requestId;

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
     * @ORM\Column(name="project_campaign_id", type="integer", nullable=true)
     */
    private $projectCampaignId;

    /**
     * @var integer
     *
     * @ORM\Column(name="full_lock", type="smallint", nullable=true)
     */
    private $fullLock;

    /**
     * @var string
     *
     * @ORM\Column(name="sent_via_method", type="string", length=100, nullable=true)
     */
    private $sentViaMethod;

    /**
     * @var integer
     *
     * @ORM\Column(name="finish_request", type="smallint", nullable=true)
     */
    private $finishRequest;

    /**
     * @var string
     *
     * @ORM\Column(name="finish_option", type="string", length=10, nullable=true)
     */
    private $finishOption;

    /**
     * @var string
     *
     * @ORM\Column(name="notes", type="text", nullable=true)
     */
    private $notes;

    /**
     * @var string
     *
     * @ORM\Column(name="internal_note", type="text", nullable=true)
     */
    private $internalNote;

    /**
     * @var string
     *
     * @ORM\Column(name="studio_note", type="text", nullable=true)
     */
    private $studioNote;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="deadline", type="datetime", nullable=true)
     */
    private $deadline;

    /**
     * @var integer
     *
     * @ORM\Column(name="finishing_house", type="integer", nullable=true)
     */
    private $finishingHouse;

    /**
     * @var string
     *
     * @ORM\Column(name="framerate", type="string", length=100, nullable=true)
     */
    private $framerate;

    /**
     * @var string
     *
     * @ORM\Column(name="framerate_note", type="text", nullable=true)
     */
    private $framerateNote;

    /**
     * @var string
     *
     * @ORM\Column(name="raster_size", type="string", length=100, nullable=true)
     */
    private $rasterSize;

    /**
     * @var string
     *
     * @ORM\Column(name="raster_size_note", type="text", nullable=true)
     */
    private $rasterSizeNote;

    /**
     * @var integer
     *
     * @ORM\Column(name="music_cue_sheet", type="smallint", nullable=true)
     */
    private $musicCueSheet;

    /**
     * @var string
     *
     * @ORM\Column(name="music_note", type="text", nullable=true)
     */
    private $musicNote;

    /**
     * @var integer
     *
     * @ORM\Column(name="gfx_finish", type="smallint", nullable=true)
     */
    private $gfxFinish;

    /**
     * @var integer
     *
     * @ORM\Column(name="audio_prep", type="smallint", nullable=true)
     */
    private $audioPrep;

    /**
     * @var string
     *
     * @ORM\Column(name="audio", type="string", length=45, nullable=true)
     */
    private $audio;

    /**
     * @var string
     *
     * @ORM\Column(name="audio_note", type="text", nullable=true)
     */
    private $audioNote;

    /**
     * @var integer
     *
     * @ORM\Column(name="video_prep", type="smallint", nullable=true)
     */
    private $videoPrep;

    /**
     * @var integer
     *
     * @ORM\Column(name="graphics_finish", type="smallint", nullable=true)
     */
    private $graphicsFinish;

    /**
     * @var string
     *
     * @ORM\Column(name="spec_note", type="text", nullable=true)
     */
    private $specNote;

    /**
     * @var string
     *
     * @ORM\Column(name="spec_sheet_file", type="text", nullable=true)
     */
    private $specSheetFile;

    /**
     * @var string
     *
     * @ORM\Column(name="tag_chart", type="text", nullable=true)
     */
    private $tagChart;

    /**
     * @var string
     *
     * @ORM\Column(name="delivery_to_client", type="string", length=45, nullable=true)
     */
    private $deliveryToClient;

    /**
     * @var string
     *
     * @ORM\Column(name="delivery_note", type="text", nullable=true)
     */
    private $deliveryNote;

    /**
     * @var integer
     *
     * @ORM\Column(name="spot_resend", type="smallint", nullable=true)
     */
    private $spotResend;

    /**
     * @var integer
     *
     * @ORM\Column(name="status_id", type="integer", nullable=true)
     */
    private $statusId;

    /**
     * @var string
     *
     * @ORM\Column(name="editor", type="string", length=100, nullable=true)
     */
    private $editor;

    /**
     * @var string
     *
     * @ORM\Column(name="customer_contact", type="string", length=100, nullable=true)
     */
    private $customerContact;

    /**
     * @var integer
     *
     * @ORM\Column(name="spot_id", type="integer", nullable=true)
     */
    private $spotId;

    /**
     * @var integer
     *
     * @ORM\Column(name="version_id", type="integer", nullable=true)
     */
    private $versionId;

    /**
     * @var integer
     *
     * @ORM\Column(name="spot_version_id", type="integer", nullable=true)
     */
    private $spotVersionId;

    /**
     * @var integer
     *
     * @ORM\Column(name="prod_accept", type="smallint", nullable=true)
     */
    private $prodAccept;

    /**
     * @var integer
     *
     * @ORM\Column(name="finish_accept", type="smallint", nullable=true)
     */
    private $finishAccept;

    /**
     * @var integer
     *
     * @ORM\Column(name="line_status_id", type="integer", nullable=true)
     */
    private $lineStatusId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="spot_sent_date", type="datetime", nullable=true)
     */
    private $spotSentDate;

    /**
     * @var integer
     *
     * @ORM\Column(name="bill_id", type="bigint", nullable=true)
     */
    private $billId;

    /**
     * @var integer
     *
     * @ORM\Column(name="bill_line_id", type="bigint", nullable=true)
     */
    private $billLineId;

    /**
     * @var integer
     *
     * @ORM\Column(name="spot_sent_type", type="smallint", nullable=true)
     */
    private $spotSentType;

    /**
     * @var integer
     *
     * @ORM\Column(name="no_graphics", type="smallint", nullable=true)
     */
    private $noGraphics;

    /**
     * @var integer
     *
     * @ORM\Column(name="is_pdf", type="smallint", nullable=true)
     */
    private $isPdf;

    /**
     * @var integer
     *
     * @ORM\Column(name="all_graphics_resend", type="smallint", nullable=true)
     */
    private $allGraphicsResend;

    /**
     * @var integer
     *
     * @ORM\Column(name="graphics_status_id", type="integer", nullable=true)
     */
    private $graphicsStatusId;

    /**
     * @var string
     *
     * @ORM\Column(name="graphics_note", type="text", nullable=true)
     */
    private $graphicsNote;

    /**
     * @var string
     *
     * @ORM\Column(name="final_narr", type="string", length=20, nullable=true)
     */
    private $finalNarr;

    /**
     * @var integer
     *
     * @ORM\Column(name="qc_approved", type="smallint", nullable=true)
     */
    private $qcApproved;

    /**
     * @var string
     *
     * @ORM\Column(name="qc_note", type="text", nullable=true)
     */
    private $qcNote;

    /**
     * @var string
     *
     * @ORM\Column(name="qc_link", type="string", length=200, nullable=true)
     */
    private $qcLink;

    /**
     * @var integer
     *
     * @ORM\Column(name="created_by", type="integer", nullable=true)
     */
    private $createdBy;

    /**
     * @var integer
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updatedBy;

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
     * Set requestId
     *
     * @param integer $requestId
     * @return RediSpotSent
     */
    public function setRequestId($requestId)
    {
        $this->requestId = $requestId;

        return $this;
    }

    /**
     * Get requestId
     *
     * @return integer 
     */
    public function getRequestId()
    {
        return $this->requestId;
    }

    /**
     * Set projectId
     *
     * @param integer $projectId
     * @return RediSpotSent
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
     * @return RediSpotSent
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
     * Set projectCampaignId
     *
     * @param integer $projectCampaignId
     * @return RediSpotSent
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
     * Set fullLock
     *
     * @param integer $fullLock
     * @return RediSpotSent
     */
    public function setFullLock($fullLock)
    {
        $this->fullLock = $fullLock;

        return $this;
    }

    /**
     * Get fullLock
     *
     * @return integer 
     */
    public function getFullLock()
    {
        return $this->fullLock;
    }

    /**
     * Set sentViaMethod
     *
     * @param string $sentViaMethod
     * @return RediSpotSent
     */
    public function setSentViaMethod($sentViaMethod)
    {
        $this->sentViaMethod = $sentViaMethod;

        return $this;
    }

    /**
     * Get sentViaMethod
     *
     * @return string 
     */
    public function getSentViaMethod()
    {
        return $this->sentViaMethod;
    }

    /**
     * Set finishRequest
     *
     * @param integer $finishRequest
     * @return RediSpotSent
     */
    public function setFinishRequest($finishRequest)
    {
        $this->finishRequest = $finishRequest;

        return $this;
    }

    /**
     * Get finishRequest
     *
     * @return integer 
     */
    public function getFinishRequest()
    {
        return $this->finishRequest;
    }

    /**
     * Set finishOption
     *
     * @param string $finishOption
     * @return RediSpotSent
     */
    public function setFinishOption($finishOption)
    {
        $this->finishOption = $finishOption;

        return $this;
    }

    /**
     * Get finishOption
     *
     * @return string 
     */
    public function getFinishOption()
    {
        return $this->finishOption;
    }

    /**
     * Set notes
     *
     * @param string $notes
     * @return RediSpotSent
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
     * Set internalNote
     *
     * @param string $internalNote
     * @return RediSpotSent
     */
    public function setInternalNote($internalNote)
    {
        $this->internalNote = $internalNote;

        return $this;
    }

    /**
     * Get internalNote
     *
     * @return string 
     */
    public function getInternalNote()
    {
        return $this->internalNote;
    }

    /**
     * Set studioNote
     *
     * @param string $studioNote
     * @return RediSpotSent
     */
    public function setStudioNote($studioNote)
    {
        $this->studioNote = $studioNote;

        return $this;
    }

    /**
     * Get studioNote
     *
     * @return string 
     */
    public function getStudioNote()
    {
        return $this->studioNote;
    }

    /**
     * Set deadline
     *
     * @param \DateTime $deadline
     * @return RediSpotSent
     */
    public function setDeadline($deadline)
    {
        $this->deadline = $deadline;

        return $this;
    }

    /**
     * Get deadline
     *
     * @return \DateTime 
     */
    public function getDeadline()
    {
        return $this->deadline;
    }

    /**
     * Set finishingHouse
     *
     * @param integer $finishingHouse
     * @return RediSpotSent
     */
    public function setFinishingHouse($finishingHouse)
    {
        $this->finishingHouse = $finishingHouse;

        return $this;
    }

    /**
     * Get finishingHouse
     *
     * @return integer 
     */
    public function getFinishingHouse()
    {
        return $this->finishingHouse;
    }

    /**
     * Set framerate
     *
     * @param string $framerate
     * @return RediSpotSent
     */
    public function setFramerate($framerate)
    {
        $this->framerate = $framerate;

        return $this;
    }

    /**
     * Get framerate
     *
     * @return string 
     */
    public function getFramerate()
    {
        return $this->framerate;
    }

    /**
     * Set framerateNote
     *
     * @param string $framerateNote
     * @return RediSpotSent
     */
    public function setFramerateNote($framerateNote)
    {
        $this->framerateNote = $framerateNote;

        return $this;
    }

    /**
     * Get framerateNote
     *
     * @return string 
     */
    public function getFramerateNote()
    {
        return $this->framerateNote;
    }

    /**
     * Set rasterSize
     *
     * @param string $rasterSize
     * @return RediSpotSent
     */
    public function setRasterSize($rasterSize)
    {
        $this->rasterSize = $rasterSize;

        return $this;
    }

    /**
     * Get rasterSize
     *
     * @return string 
     */
    public function getRasterSize()
    {
        return $this->rasterSize;
    }

    /**
     * Set rasterSizeNote
     *
     * @param string $rasterSizeNote
     * @return RediSpotSent
     */
    public function setRasterSizeNote($rasterSizeNote)
    {
        $this->rasterSizeNote = $rasterSizeNote;

        return $this;
    }

    /**
     * Get rasterSizeNote
     *
     * @return string 
     */
    public function getRasterSizeNote()
    {
        return $this->rasterSizeNote;
    }

    /**
     * Set musicCueSheet
     *
     * @param integer $musicCueSheet
     * @return RediSpotSent
     */
    public function setMusicCueSheet($musicCueSheet)
    {
        $this->musicCueSheet = $musicCueSheet;

        return $this;
    }

    /**
     * Get musicCueSheet
     *
     * @return integer 
     */
    public function getMusicCueSheet()
    {
        return $this->musicCueSheet;
    }

    /**
     * Set musicNote
     *
     * @param string $musicNote
     * @return RediSpotSent
     */
    public function setMusicNote($musicNote)
    {
        $this->musicNote = $musicNote;

        return $this;
    }

    /**
     * Get musicNote
     *
     * @return string 
     */
    public function getMusicNote()
    {
        return $this->musicNote;
    }

    /**
     * Set gfxFinish
     *
     * @param integer $gfxFinish
     * @return RediSpotSent
     */
    public function setGfxFinish($gfxFinish)
    {
        $this->gfxFinish = $gfxFinish;

        return $this;
    }

    /**
     * Get gfxFinish
     *
     * @return integer 
     */
    public function getGfxFinish()
    {
        return $this->gfxFinish;
    }

    /**
     * Set audioPrep
     *
     * @param integer $audioPrep
     * @return RediSpotSent
     */
    public function setAudioPrep($audioPrep)
    {
        $this->audioPrep = $audioPrep;

        return $this;
    }

    /**
     * Get audioPrep
     *
     * @return integer 
     */
    public function getAudioPrep()
    {
        return $this->audioPrep;
    }

    /**
     * Set audio
     *
     * @param string $audio
     * @return RediSpotSent
     */
    public function setAudio($audio)
    {
        $this->audio = $audio;

        return $this;
    }

    /**
     * Get audio
     *
     * @return string 
     */
    public function getAudio()
    {
        return $this->audio;
    }

    /**
     * Set audioNote
     *
     * @param string $audioNote
     * @return RediSpotSent
     */
    public function setAudioNote($audioNote)
    {
        $this->audioNote = $audioNote;

        return $this;
    }

    /**
     * Get audioNote
     *
     * @return string 
     */
    public function getAudioNote()
    {
        return $this->audioNote;
    }

    /**
     * Set videoPrep
     *
     * @param integer $videoPrep
     * @return RediSpotSent
     */
    public function setVideoPrep($videoPrep)
    {
        $this->videoPrep = $videoPrep;

        return $this;
    }

    /**
     * Get videoPrep
     *
     * @return integer 
     */
    public function getVideoPrep()
    {
        return $this->videoPrep;
    }

    /**
     * Set graphicsFinish
     *
     * @param integer $graphicsFinish
     * @return RediSpotSent
     */
    public function setGraphicsFinish($graphicsFinish)
    {
        $this->graphicsFinish = $graphicsFinish;

        return $this;
    }

    /**
     * Get graphicsFinish
     *
     * @return integer 
     */
    public function getGraphicsFinish()
    {
        return $this->graphicsFinish;
    }

    /**
     * Set specNote
     *
     * @param string $specNote
     * @return RediSpotSent
     */
    public function setSpecNote($specNote)
    {
        $this->specNote = $specNote;

        return $this;
    }

    /**
     * Get specNote
     *
     * @return string 
     */
    public function getSpecNote()
    {
        return $this->specNote;
    }

    /**
     * Set specSheetFile
     *
     * @param string $specSheetFile
     * @return RediSpotSent
     */
    public function setSpecSheetFile($specSheetFile)
    {
        $this->specSheetFile = $specSheetFile;

        return $this;
    }

    /**
     * Get specSheetFile
     *
     * @return string 
     */
    public function getSpecSheetFile()
    {
        return $this->specSheetFile;
    }

    /**
     * Set tagChart
     *
     * @param string $tagChart
     * @return RediSpotSent
     */
    public function setTagChart($tagChart)
    {
        $this->tagChart = $tagChart;

        return $this;
    }

    /**
     * Get tagChart
     *
     * @return string 
     */
    public function getTagChart()
    {
        return $this->tagChart;
    }

    /**
     * Set deliveryToClient
     *
     * @param string $deliveryToClient
     * @return RediSpotSent
     */
    public function setDeliveryToClient($deliveryToClient)
    {
        $this->deliveryToClient = $deliveryToClient;

        return $this;
    }

    /**
     * Get deliveryToClient
     *
     * @return string 
     */
    public function getDeliveryToClient()
    {
        return $this->deliveryToClient;
    }

    /**
     * Set deliveryNote
     *
     * @param string $deliveryNote
     * @return RediSpotSent
     */
    public function setDeliveryNote($deliveryNote)
    {
        $this->deliveryNote = $deliveryNote;

        return $this;
    }

    /**
     * Get deliveryNote
     *
     * @return string 
     */
    public function getDeliveryNote()
    {
        return $this->deliveryNote;
    }

    /**
     * Set spotResend
     *
     * @param integer $spotResend
     * @return RediSpotSent
     */
    public function setSpotResend($spotResend)
    {
        $this->spotResend = $spotResend;

        return $this;
    }

    /**
     * Get spotResend
     *
     * @return integer 
     */
    public function getSpotResend()
    {
        return $this->spotResend;
    }

    /**
     * Set statusId
     *
     * @param integer $statusId
     * @return RediSpotSent
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
     * Set editor
     *
     * @param string $editor
     * @return RediSpotSent
     */
    public function setEditor($editor)
    {
        $this->editor = $editor;

        return $this;
    }

    /**
     * Get editor
     *
     * @return string 
     */
    public function getEditor()
    {
        return $this->editor;
    }

    /**
     * Set customerContact
     *
     * @param string $customerContact
     * @return RediSpotSent
     */
    public function setCustomerContact($customerContact)
    {
        $this->customerContact = $customerContact;

        return $this;
    }

    /**
     * Get customerContact
     *
     * @return string 
     */
    public function getCustomerContact()
    {
        return $this->customerContact;
    }

    /**
     * Set spotId
     *
     * @param integer $spotId
     * @return RediSpotSent
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
     * @return RediSpotSent
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
     * Set spotVersionId
     *
     * @param integer $spotVersionId
     * @return RediSpotSent
     */
    public function setSpotVersionId($spotVersionId)
    {
        $this->spotVersionId = $spotVersionId;

        return $this;
    }

    /**
     * Get spotVersionId
     *
     * @return integer 
     */
    public function getSpotVersionId()
    {
        return $this->spotVersionId;
    }

    /**
     * Set prodAccept
     *
     * @param integer $prodAccept
     * @return RediSpotSent
     */
    public function setProdAccept($prodAccept)
    {
        $this->prodAccept = $prodAccept;

        return $this;
    }

    /**
     * Get prodAccept
     *
     * @return integer 
     */
    public function getProdAccept()
    {
        return $this->prodAccept;
    }

    /**
     * Set finishAccept
     *
     * @param integer $finishAccept
     * @return RediSpotSent
     */
    public function setFinishAccept($finishAccept)
    {
        $this->finishAccept = $finishAccept;

        return $this;
    }

    /**
     * Get finishAccept
     *
     * @return integer 
     */
    public function getFinishAccept()
    {
        return $this->finishAccept;
    }

    /**
     * Set lineStatusId
     *
     * @param integer $lineStatusId
     * @return RediSpotSent
     */
    public function setLineStatusId($lineStatusId)
    {
        $this->lineStatusId = $lineStatusId;

        return $this;
    }

    /**
     * Get lineStatusId
     *
     * @return integer 
     */
    public function getLineStatusId()
    {
        return $this->lineStatusId;
    }

    /**
     * Set spotSentDate
     *
     * @param \DateTime $spotSentDate
     * @return RediSpotSent
     */
    public function setSpotSentDate($spotSentDate)
    {
        $this->spotSentDate = $spotSentDate;

        return $this;
    }

    /**
     * Get spotSentDate
     *
     * @return \DateTime 
     */
    public function getSpotSentDate()
    {
        return $this->spotSentDate;
    }

    /**
     * Set billId
     *
     * @param integer $billId
     * @return RediSpotSent
     */
    public function setBillId($billId)
    {
        $this->billId = $billId;

        return $this;
    }

    /**
     * Get billId
     *
     * @return integer 
     */
    public function getBillId()
    {
        return $this->billId;
    }

    /**
     * Set billLineId
     *
     * @param integer $billLineId
     * @return RediSpotSent
     */
    public function setBillLineId($billLineId)
    {
        $this->billLineId = $billLineId;

        return $this;
    }

    /**
     * Get billLineId
     *
     * @return integer 
     */
    public function getBillLineId()
    {
        return $this->billLineId;
    }

    /**
     * Set spotSentType
     *
     * @param integer $spotSentType
     * @return RediSpotSent
     */
    public function setSpotSentType($spotSentType)
    {
        $this->spotSentType = $spotSentType;

        return $this;
    }

    /**
     * Get spotSentType
     *
     * @return integer 
     */
    public function getSpotSentType()
    {
        return $this->spotSentType;
    }

    /**
     * Set noGraphics
     *
     * @param integer $noGraphics
     * @return RediSpotSent
     */
    public function setNoGraphics($noGraphics)
    {
        $this->noGraphics = $noGraphics;

        return $this;
    }

    /**
     * Get noGraphics
     *
     * @return integer 
     */
    public function getNoGraphics()
    {
        return $this->noGraphics;
    }

    /**
     * Set isPdf
     *
     * @param integer $isPdf
     * @return RediSpotSent
     */
    public function setIsPdf($isPdf)
    {
        $this->isPdf = $isPdf;

        return $this;
    }

    /**
     * Get isPdf
     *
     * @return integer 
     */
    public function getIsPdf()
    {
        return $this->isPdf;
    }

    /**
     * Set allGraphicsResend
     *
     * @param integer $allGraphicsResend
     * @return RediSpotSent
     */
    public function setAllGraphicsResend($allGraphicsResend)
    {
        $this->allGraphicsResend = $allGraphicsResend;

        return $this;
    }

    /**
     * Get allGraphicsResend
     *
     * @return integer 
     */
    public function getAllGraphicsResend()
    {
        return $this->allGraphicsResend;
    }

    /**
     * Set graphicsStatusId
     *
     * @param integer $graphicsStatusId
     * @return RediSpotSent
     */
    public function setGraphicsStatusId($graphicsStatusId)
    {
        $this->graphicsStatusId = $graphicsStatusId;

        return $this;
    }

    /**
     * Get graphicsStatusId
     *
     * @return integer 
     */
    public function getGraphicsStatusId()
    {
        return $this->graphicsStatusId;
    }

    /**
     * Set graphicsNote
     *
     * @param string $graphicsNote
     * @return RediSpotSent
     */
    public function setGraphicsNote($graphicsNote)
    {
        $this->graphicsNote = $graphicsNote;

        return $this;
    }

    /**
     * Get graphicsNote
     *
     * @return string 
     */
    public function getGraphicsNote()
    {
        return $this->graphicsNote;
    }

    /**
     * Set finalNarr
     *
     * @param string $finalNarr
     * @return RediSpotSent
     */
    public function setFinalNarr($finalNarr)
    {
        $this->finalNarr = $finalNarr;

        return $this;
    }

    /**
     * Get finalNarr
     *
     * @return string 
     */
    public function getFinalNarr()
    {
        return $this->finalNarr;
    }

    /**
     * Set qcApproved
     *
     * @param integer $qcApproved
     * @return RediSpotSent
     */
    public function setQcApproved($qcApproved)
    {
        $this->qcApproved = $qcApproved;

        return $this;
    }

    /**
     * Get qcApproved
     *
     * @return integer 
     */
    public function getQcApproved()
    {
        return $this->qcApproved;
    }

    /**
     * Set qcNote
     *
     * @param string $qcNote
     * @return RediSpotSent
     */
    public function setQcNote($qcNote)
    {
        $this->qcNote = $qcNote;

        return $this;
    }

    /**
     * Get qcNote
     *
     * @return string 
     */
    public function getQcNote()
    {
        return $this->qcNote;
    }

    /**
     * Set qcLink
     *
     * @param string $qcLink
     * @return RediSpotSent
     */
    public function setQcLink($qcLink)
    {
        $this->qcLink = $qcLink;

        return $this;
    }

    /**
     * Get qcLink
     *
     * @return string 
     */
    public function getQcLink()
    {
        return $this->qcLink;
    }

    /**
     * Set createdBy
     *
     * @param integer $createdBy
     * @return RediSpotSent
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
     * Set updatedBy
     *
     * @param integer $updatedBy
     * @return RediSpotSent
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
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return RediSpotSent
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
     * @return RediSpotSent
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
