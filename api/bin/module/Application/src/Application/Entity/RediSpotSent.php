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
     * @ORM\Column(name="project_id", type="integer", nullable=true)
     */
    private $projectId;

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
     * @var string
     *
     * @ORM\Column(name="finish_option", type="string", length=100, nullable=true)
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
     * @ORM\Column(name="deadline", type="text", nullable=true)
     */
    private $deadline;

    /**
     * @var string
     *
     * @ORM\Column(name="finishing_house", type="text", nullable=true)
     */
    private $finishingHouse;

    /**
     * @var integer
     *
     * @ORM\Column(name="framerate_id", type="integer", nullable=true)
     */
    private $framerateId;

    /**
     * @var string
     *
     * @ORM\Column(name="framerate_note", type="text", nullable=true)
     */
    private $framerateNote;

    /**
     * @var integer
     *
     * @ORM\Column(name="raster_size_id", type="integer", nullable=true)
     */
    private $rasterSizeId;

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
     * @var integer
     *
     * @ORM\Column(name="audio_prep", type="smallint", nullable=true)
     */
    private $audioPrep;

    /**
     * @var integer
     *
     * @ORM\Column(name="video_prep", type="smallint", nullable=true)
     */
    private $videoPrep;

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
     * @var integer
     *
     * @ORM\Column(name="delivery_to_client_id", type="integer", nullable=true)
     */
    private $deliveryToClientId;

    /**
     * @var string
     *
     * @ORM\Column(name="delivery_note", type="text", nullable=true)
     */
    private $deliveryNote;

    /**
     * @var integer
     *
     * @ORM\Column(name="status_id", type="integer", nullable=true)
     */
    private $statusId;

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
     * Set deadline
     *
     * @param string $deadline
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
     * @return string 
     */
    public function getDeadline()
    {
        return $this->deadline;
    }

    /**
     * Set finishingHouse
     *
     * @param string $finishingHouse
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
     * @return string 
     */
    public function getFinishingHouse()
    {
        return $this->finishingHouse;
    }

    /**
     * Set framerateId
     *
     * @param integer $framerateId
     * @return RediSpotSent
     */
    public function setFramerateId($framerateId)
    {
        $this->framerateId = $framerateId;

        return $this;
    }

    /**
     * Get framerateId
     *
     * @return integer 
     */
    public function getFramerateId()
    {
        return $this->framerateId;
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
     * Set rasterSizeId
     *
     * @param integer $rasterSizeId
     * @return RediSpotSent
     */
    public function setRasterSizeId($rasterSizeId)
    {
        $this->rasterSizeId = $rasterSizeId;

        return $this;
    }

    /**
     * Get rasterSizeId
     *
     * @return integer 
     */
    public function getRasterSizeId()
    {
        return $this->rasterSizeId;
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
     * Set deliveryToClientId
     *
     * @param integer $deliveryToClientId
     * @return RediSpotSent
     */
    public function setDeliveryToClientId($deliveryToClientId)
    {
        $this->deliveryToClientId = $deliveryToClientId;

        return $this;
    }

    /**
     * Get deliveryToClientId
     *
     * @return integer 
     */
    public function getDeliveryToClientId()
    {
        return $this->deliveryToClientId;
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
