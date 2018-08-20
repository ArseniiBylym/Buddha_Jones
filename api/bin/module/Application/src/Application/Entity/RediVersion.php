<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediVersion
 *
 * @ORM\Table(name="redi_version")
 * @ORM\Entity
 */
class RediVersion
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
     * @ORM\Column(name="version_name", type="string", length=100, nullable=true)
     */
    private $versionName;

    /**
     * @var integer
     *
     * @ORM\Column(name="seq", type="smallint", nullable=true)
     */
    private $seq;

    /**
     * @var integer
     *
     * @ORM\Column(name="custom", type="smallint", nullable=true)
     */
    private $custom;

    /**
     * @var integer
     *
     * @ORM\Column(name="active", type="smallint", nullable=true)
     */
    private $active;

    /**
     * @var integer
     *
     * @ORM\Column(name="created_user_id", type="integer", nullable=true)
     */
    private $createdUserId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @var integer
     *
     * @ORM\Column(name="updated_user_id", type="integer", nullable=true)
     */
    private $updatedUserId;

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
     * Set versionName
     *
     * @param string $versionName
     * @return RediVersion
     */
    public function setVersionName($versionName)
    {
        $this->versionName = $versionName;

        return $this;
    }

    /**
     * Get versionName
     *
     * @return string 
     */
    public function getVersionName()
    {
        return $this->versionName;
    }

    /**
     * Set seq
     *
     * @param integer $seq
     * @return RediVersion
     */
    public function setSeq($seq)
    {
        $this->seq = $seq;

        return $this;
    }

    /**
     * Get seq
     *
     * @return integer 
     */
    public function getSeq()
    {
        return $this->seq;
    }

    /**
     * Set custom
     *
     * @param integer $custom
     * @return RediVersion
     */
    public function setCustom($custom)
    {
        $this->custom = $custom;

        return $this;
    }

    /**
     * Get custom
     *
     * @return integer 
     */
    public function getCustom()
    {
        return $this->custom;
    }

    /**
     * Set active
     *
     * @param integer $active
     * @return RediVersion
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return integer 
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set createdUserId
     *
     * @param integer $createdUserId
     * @return RediVersion
     */
    public function setCreatedUserId($createdUserId)
    {
        $this->createdUserId = $createdUserId;

        return $this;
    }

    /**
     * Get createdUserId
     *
     * @return integer 
     */
    public function getCreatedUserId()
    {
        return $this->createdUserId;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return RediVersion
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
     * Set updatedUserId
     *
     * @param integer $updatedUserId
     * @return RediVersion
     */
    public function setUpdatedUserId($updatedUserId)
    {
        $this->updatedUserId = $updatedUserId;

        return $this;
    }

    /**
     * Get updatedUserId
     *
     * @return integer 
     */
    public function getUpdatedUserId()
    {
        return $this->updatedUserId;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     * @return RediVersion
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
