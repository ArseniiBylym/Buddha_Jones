<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediGraphicsRequestFinishing
 *
 * @ORM\Table(name="redi_graphics_request_finishing")
 * @ORM\Entity
 */
class RediGraphicsRequestFinishing
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
     * @ORM\Column(name="finisher_id", type="bigint", nullable=true)
     */
    private $finisherId;

    /**
     * @var string
     *
     * @ORM\Column(name="format_comped", type="string", length=200, nullable=true)
     */
    private $formatComped;

    /**
     * @var string
     *
     * @ORM\Column(name="format_textless", type="string", length=200, nullable=true)
     */
    private $formatTextless;

    /**
     * @var string
     *
     * @ORM\Column(name="format_keyable", type="string", length=200, nullable=true)
     */
    private $formatKeyable;

    /**
     * @var string
     *
     * @ORM\Column(name="checker_due", type="string", length=100, nullable=true)
     */
    private $checkerDue;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="checker_due_date", type="datetime", nullable=true)
     */
    private $checkerDueDate;

    /**
     * @var string
     *
     * @ORM\Column(name="final_renders_due", type="string", length=100, nullable=true)
     */
    private $finalRendersDue;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="final_renders_due_date", type="datetime", nullable=true)
     */
    private $finalRendersDueDate;

    /**
     * @var string
     *
     * @ORM\Column(name="finishing_at", type="string", length=100, nullable=true)
     */
    private $finishingAt;

    /**
     * @var string
     *
     * @ORM\Column(name="finishing_contact", type="string", length=200, nullable=true)
     */
    private $finishingContact;

    /**
     * @var integer
     *
     * @ORM\Column(name="project_collect", type="smallint", nullable=true)
     */
    private $projectCollect;

    /**
     * @var string
     *
     * @ORM\Column(name="project_collect_note", type="text", nullable=true)
     */
    private $projectCollectNote;

    /**
     * @var integer
     *
     * @ORM\Column(name="stereo_finish", type="smallint", nullable=true)
     */
    private $stereoFinish;

    /**
     * @var string
     *
     * @ORM\Column(name="stereo_finish_note", type="text", nullable=true)
     */
    private $stereoFinishNote;



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
     * @return RediGraphicsRequestFinishing
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
     * Set finisherId
     *
     * @param integer $finisherId
     * @return RediGraphicsRequestFinishing
     */
    public function setFinisherId($finisherId)
    {
        $this->finisherId = $finisherId;

        return $this;
    }

    /**
     * Get finisherId
     *
     * @return integer 
     */
    public function getFinisherId()
    {
        return $this->finisherId;
    }

    /**
     * Set formatComped
     *
     * @param string $formatComped
     * @return RediGraphicsRequestFinishing
     */
    public function setFormatComped($formatComped)
    {
        $this->formatComped = $formatComped;

        return $this;
    }

    /**
     * Get formatComped
     *
     * @return string 
     */
    public function getFormatComped()
    {
        return $this->formatComped;
    }

    /**
     * Set formatTextless
     *
     * @param string $formatTextless
     * @return RediGraphicsRequestFinishing
     */
    public function setFormatTextless($formatTextless)
    {
        $this->formatTextless = $formatTextless;

        return $this;
    }

    /**
     * Get formatTextless
     *
     * @return string 
     */
    public function getFormatTextless()
    {
        return $this->formatTextless;
    }

    /**
     * Set formatKeyable
     *
     * @param string $formatKeyable
     * @return RediGraphicsRequestFinishing
     */
    public function setFormatKeyable($formatKeyable)
    {
        $this->formatKeyable = $formatKeyable;

        return $this;
    }

    /**
     * Get formatKeyable
     *
     * @return string 
     */
    public function getFormatKeyable()
    {
        return $this->formatKeyable;
    }

    /**
     * Set checkerDue
     *
     * @param string $checkerDue
     * @return RediGraphicsRequestFinishing
     */
    public function setCheckerDue($checkerDue)
    {
        $this->checkerDue = $checkerDue;

        return $this;
    }

    /**
     * Get checkerDue
     *
     * @return string 
     */
    public function getCheckerDue()
    {
        return $this->checkerDue;
    }

    /**
     * Set checkerDueDate
     *
     * @param \DateTime $checkerDueDate
     * @return RediGraphicsRequestFinishing
     */
    public function setCheckerDueDate($checkerDueDate)
    {
        $this->checkerDueDate = $checkerDueDate;

        return $this;
    }

    /**
     * Get checkerDueDate
     *
     * @return \DateTime 
     */
    public function getCheckerDueDate()
    {
        return $this->checkerDueDate;
    }

    /**
     * Set finalRendersDue
     *
     * @param string $finalRendersDue
     * @return RediGraphicsRequestFinishing
     */
    public function setFinalRendersDue($finalRendersDue)
    {
        $this->finalRendersDue = $finalRendersDue;

        return $this;
    }

    /**
     * Get finalRendersDue
     *
     * @return string 
     */
    public function getFinalRendersDue()
    {
        return $this->finalRendersDue;
    }

    /**
     * Set finalRendersDueDate
     *
     * @param \DateTime $finalRendersDueDate
     * @return RediGraphicsRequestFinishing
     */
    public function setFinalRendersDueDate($finalRendersDueDate)
    {
        $this->finalRendersDueDate = $finalRendersDueDate;

        return $this;
    }

    /**
     * Get finalRendersDueDate
     *
     * @return \DateTime 
     */
    public function getFinalRendersDueDate()
    {
        return $this->finalRendersDueDate;
    }

    /**
     * Set finishingAt
     *
     * @param string $finishingAt
     * @return RediGraphicsRequestFinishing
     */
    public function setFinishingAt($finishingAt)
    {
        $this->finishingAt = $finishingAt;

        return $this;
    }

    /**
     * Get finishingAt
     *
     * @return string 
     */
    public function getFinishingAt()
    {
        return $this->finishingAt;
    }

    /**
     * Set finishingContact
     *
     * @param string $finishingContact
     * @return RediGraphicsRequestFinishing
     */
    public function setFinishingContact($finishingContact)
    {
        $this->finishingContact = $finishingContact;

        return $this;
    }

    /**
     * Get finishingContact
     *
     * @return string 
     */
    public function getFinishingContact()
    {
        return $this->finishingContact;
    }

    /**
     * Set projectCollect
     *
     * @param integer $projectCollect
     * @return RediGraphicsRequestFinishing
     */
    public function setProjectCollect($projectCollect)
    {
        $this->projectCollect = $projectCollect;

        return $this;
    }

    /**
     * Get projectCollect
     *
     * @return integer 
     */
    public function getProjectCollect()
    {
        return $this->projectCollect;
    }

    /**
     * Set projectCollectNote
     *
     * @param string $projectCollectNote
     * @return RediGraphicsRequestFinishing
     */
    public function setProjectCollectNote($projectCollectNote)
    {
        $this->projectCollectNote = $projectCollectNote;

        return $this;
    }

    /**
     * Get projectCollectNote
     *
     * @return string 
     */
    public function getProjectCollectNote()
    {
        return $this->projectCollectNote;
    }

    /**
     * Set stereoFinish
     *
     * @param integer $stereoFinish
     * @return RediGraphicsRequestFinishing
     */
    public function setStereoFinish($stereoFinish)
    {
        $this->stereoFinish = $stereoFinish;

        return $this;
    }

    /**
     * Get stereoFinish
     *
     * @return integer 
     */
    public function getStereoFinish()
    {
        return $this->stereoFinish;
    }

    /**
     * Set stereoFinishNote
     *
     * @param string $stereoFinishNote
     * @return RediGraphicsRequestFinishing
     */
    public function setStereoFinishNote($stereoFinishNote)
    {
        $this->stereoFinishNote = $stereoFinishNote;

        return $this;
    }

    /**
     * Get stereoFinishNote
     *
     * @return string 
     */
    public function getStereoFinishNote()
    {
        return $this->stereoFinishNote;
    }
}
