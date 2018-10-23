<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediProject
 *
 * @ORM\Table(name="redi_project", indexes={@ORM\Index(name="project_name", columns={"project_name"}), @ORM\Index(name="project_code", columns={"project_code"})})
 * @ORM\Entity
 */
class RediProject
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
     * @ORM\Column(name="project_name", type="string", length=200, nullable=true)
     */
    private $projectName;

    /**
     * @var string
     *
     * @ORM\Column(name="project_code", type="string", length=100, nullable=true)
     */
    private $projectCode;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="project_release", type="datetime", nullable=true)
     */
    private $projectRelease;

    /**
     * @var integer
     *
     * @ORM\Column(name="studio_id", type="integer", nullable=true)
     */
    private $studioId;

    /**
     * @var string
     *
     * @ORM\Column(name="notes", type="text", nullable=true)
     */
    private $notes;

    /**
     * @var integer
     *
     * @ORM\Column(name="created_by_user_id", type="integer", nullable=true)
     */
    private $createdByUserId;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=1, nullable=true)
     */
    private $type;



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
     * Set projectName
     *
     * @param string $projectName
     * @return RediProject
     */
    public function setProjectName($projectName)
    {
        $this->projectName = $projectName;

        return $this;
    }

    /**
     * Get projectName
     *
     * @return string 
     */
    public function getProjectName()
    {
        return $this->projectName;
    }

    /**
     * Set projectCode
     *
     * @param string $projectCode
     * @return RediProject
     */
    public function setProjectCode($projectCode)
    {
        $this->projectCode = $projectCode;

        return $this;
    }

    /**
     * Get projectCode
     *
     * @return string 
     */
    public function getProjectCode()
    {
        return $this->projectCode;
    }

    /**
     * Set projectRelease
     *
     * @param \DateTime $projectRelease
     * @return RediProject
     */
    public function setProjectRelease($projectRelease)
    {
        $this->projectRelease = $projectRelease;

        return $this;
    }

    /**
     * Get projectRelease
     *
     * @return \DateTime 
     */
    public function getProjectRelease()
    {
        return $this->projectRelease;
    }

    /**
     * Set studioId
     *
     * @param integer $studioId
     * @return RediProject
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
     * Set notes
     *
     * @param string $notes
     * @return RediProject
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
     * Set createdByUserId
     *
     * @param integer $createdByUserId
     * @return RediProject
     */
    public function setCreatedByUserId($createdByUserId)
    {
        $this->createdByUserId = $createdByUserId;

        return $this;
    }

    /**
     * Get createdByUserId
     *
     * @return integer 
     */
    public function getCreatedByUserId()
    {
        return $this->createdByUserId;
    }

    /**
     * Set type
     *
     * @param string $type
     * @return RediProject
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
}
