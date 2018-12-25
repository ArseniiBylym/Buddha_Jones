<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediRatecardType
 *
 * @ORM\Table(name="redi_ratecard_type")
 * @ORM\Entity
 */
class RediRatecardType
{
    /**
     * @var integer
     *
     * @ORM\Column(name="ratecard_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $ratecardId;

    /**
     * @var integer
     *
     * @ORM\Column(name="studio_id", type="integer", nullable=true)
     */
    private $studioId;

    /**
     * @var string
     *
     * @ORM\Column(name="ratecard_name", type="string", length=50, nullable=true)
     */
    private $ratecardName;

    /**
     * @var string
     *
     * @ORM\Column(name="ratecard_note", type="text", nullable=true)
     */
    private $ratecardNote;

    /**
     * @var string
     *
     * @ORM\Column(name="file", type="string", length=150, nullable=true)
     */
    private $file;



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
     * Set studioId
     *
     * @param integer $studioId
     * @return RediRatecardType
     */
    public function setStudioId($studioId)
    {
        $this->studioId = $studioId;

        return $this;
    }

    /**
     * Get studioId
     *
     * @return integer 
     */
    public function getStudioId()
    {
        return $this->studioId;
    }

    /**
     * Set ratecardName
     *
     * @param string $ratecardName
     * @return RediRatecardType
     */
    public function setRatecardName($ratecardName)
    {
        $this->ratecardName = $ratecardName;

        return $this;
    }

    /**
     * Get ratecardName
     *
     * @return string 
     */
    public function getRatecardName()
    {
        return $this->ratecardName;
    }

    /**
     * Set ratecardNote
     *
     * @param string $ratecardNote
     * @return RediRatecardType
     */
    public function setRatecardNote($ratecardNote)
    {
        $this->ratecardNote = $ratecardNote;

        return $this;
    }

    /**
     * Get ratecardNote
     *
     * @return string 
     */
    public function getRatecardNote()
    {
        return $this->ratecardNote;
    }

    /**
     * Set file
     *
     * @param string $file
     * @return RediRatecardType
     */
    public function setFile($file)
    {
        $this->file = $file;

        return $this;
    }

    /**
     * Get file
     *
     * @return string 
     */
    public function getFile()
    {
        return $this->file;
    }
}
