<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediStudioRatecard
 *
 * @ORM\Table(name="redi_studio_ratecard")
 * @ORM\Entity
 */
class RediStudioRatecard
{
    /**
     * @var integer
     *
     * @ORM\Column(name="ratecard_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $ratecardId;

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
     * @ORM\Column(name="trt_id", type="integer", nullable=true)
     */
    private $trtId;

    /**
     * @var integer
     *
     * @ORM\Column(name="revision_inc", type="integer", nullable=true)
     */
    private $revisionInc;

    /**
     * @var string
     *
     * @ORM\Column(name="note", type="text", nullable=true)
     */
    private $note;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=1, nullable=true)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="rate", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $rate;



    /**
     * Set ratecardId
     *
     * @param integer $ratecardId
     * @return RediStudioRatecard
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
     * Set activityId
     *
     * @param integer $activityId
     * @return RediStudioRatecard
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
     * Set trtId
     *
     * @param integer $trtId
     * @return RediStudioRatecard
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

    /**
     * Set revisionInc
     *
     * @param integer $revisionInc
     * @return RediStudioRatecard
     */
    public function setRevisionInc($revisionInc)
    {
        $this->revisionInc = $revisionInc;

        return $this;
    }

    /**
     * Get revisionInc
     *
     * @return integer 
     */
    public function getRevisionInc()
    {
        return $this->revisionInc;
    }

    /**
     * Set note
     *
     * @param string $note
     * @return RediStudioRatecard
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
     * Set type
     *
     * @param string $type
     * @return RediStudioRatecard
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set rate
     *
     * @param string $rate
     * @return RediStudioRatecard
     */
    public function setRate($rate)
    {
        $this->rate = $rate;

        return $this;
    }

    /**
     * Get rate
     *
     * @return string 
     */
    public function getRate()
    {
        return $this->rate;
    }
}
