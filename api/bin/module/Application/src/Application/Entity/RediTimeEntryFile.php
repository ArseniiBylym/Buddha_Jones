<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediTimeEntryFile
 *
 * @ORM\Table(name="redi_time_entry_file")
 * @ORM\Entity
 */
class RediTimeEntryFile
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
     * @ORM\Column(name="time_entry_id", type="bigint", nullable=false)
     */
    private $timeEntryId;

    /**
     * @var string
     *
     * @ORM\Column(name="file_name", type="string", length=200, nullable=true)
     */
    private $fileName;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="duration", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $duration;



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
     * Set timeEntryId
     *
     * @param integer $timeEntryId
     * @return RediTimeEntryFile
     */
    public function setTimeEntryId($timeEntryId)
    {
        $this->timeEntryId = $timeEntryId;

        return $this;
    }

    /**
     * Get timeEntryId
     *
     * @return integer 
     */
    public function getTimeEntryId()
    {
        return $this->timeEntryId;
    }

    /**
     * Set fileName
     *
     * @param string $fileName
     * @return RediTimeEntryFile
     */
    public function setFileName($fileName)
    {
        $this->fileName = $fileName;

        return $this;
    }

    /**
     * Get fileName
     *
     * @return string 
     */
    public function getFileName()
    {
        return $this->fileName;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return RediTimeEntryFile
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set duration
     *
     * @param string $duration
     * @return RediTimeEntryFile
     */
    public function setDuration($duration)
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * Get duration
     *
     * @return string 
     */
    public function getDuration()
    {
        return $this->duration;
    }
}
