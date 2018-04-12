<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediGraphicsRequestDesign
 *
 * @ORM\Table(name="redi_graphics_request_design")
 * @ORM\Entity
 */
class RediGraphicsRequestDesign
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
     * @var string
     *
     * @ORM\Column(name="frame_rate", type="string", length=200, nullable=true)
     */
    private $frameRate;

    /**
     * @var string
     *
     * @ORM\Column(name="priority", type="string", length=100, nullable=true)
     */
    private $priority;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="priority_date", type="datetime", nullable=true)
     */
    private $priorityDate;

    /**
     * @var string
     *
     * @ORM\Column(name="burn_in", type="string", length=200, nullable=true)
     */
    private $burnIn;



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
     * @return RediGraphicsRequestDesign
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
     * Set frameRate
     *
     * @param string $frameRate
     * @return RediGraphicsRequestDesign
     */
    public function setFrameRate($frameRate)
    {
        $this->frameRate = $frameRate;

        return $this;
    }

    /**
     * Get frameRate
     *
     * @return string 
     */
    public function getFrameRate()
    {
        return $this->frameRate;
    }

    /**
     * Set priority
     *
     * @param string $priority
     * @return RediGraphicsRequestDesign
     */
    public function setPriority($priority)
    {
        $this->priority = $priority;

        return $this;
    }

    /**
     * Get priority
     *
     * @return string 
     */
    public function getPriority()
    {
        return $this->priority;
    }

    /**
     * Set priorityDate
     *
     * @param \DateTime $priorityDate
     * @return RediGraphicsRequestDesign
     */
    public function setPriorityDate($priorityDate)
    {
        $this->priorityDate = $priorityDate;

        return $this;
    }

    /**
     * Get priorityDate
     *
     * @return \DateTime 
     */
    public function getPriorityDate()
    {
        return $this->priorityDate;
    }

    /**
     * Set burnIn
     *
     * @param string $burnIn
     * @return RediGraphicsRequestDesign
     */
    public function setBurnIn($burnIn)
    {
        $this->burnIn = $burnIn;

        return $this;
    }

    /**
     * Get burnIn
     *
     * @return string 
     */
    public function getBurnIn()
    {
        return $this->burnIn;
    }
}
