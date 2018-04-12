<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediProject
 *
 * @ORM\Table(name="redi_project")
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
     * @var integer
     *
     * @ORM\Column(name="customer_id", type="integer", nullable=true)
     */
    private $customerId;

    /**
     * @var string
     *
     * @ORM\Column(name="notes", type="text", nullable=true)
     */
    private $notes;

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
     * Set customerId
     *
     * @param integer $customerId
     * @return RediProject
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
}
