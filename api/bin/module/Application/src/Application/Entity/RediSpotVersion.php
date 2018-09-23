<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediSpotVersion
 *
 * @ORM\Table(name="redi_spot_version")
 * @ORM\Entity
 */
class RediSpotVersion
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
     * @ORM\Column(name="spot_id", type="integer", nullable=false)
     */
    private $spotId;

    /**
     * @var integer
     *
     * @ORM\Column(name="version_id", type="integer", nullable=false)
     */
    private $versionId;

    /**
     * @var integer
     *
     * @ORM\Column(name="version_status_id", type="integer", nullable=true)
     */
    private $versionStatusId;

    /**
     * @var string
     *
     * @ORM\Column(name="version_note", type="text", nullable=true)
     */
    private $versionNote;

    /**
     * @var string
     *
     * @ORM\Column(name="billing_type", type="string", length=10, nullable=true)
     */
    private $billingType;



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
     * Set spotId
     *
     * @param integer $spotId
     * @return RediSpotVersion
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
     * @return RediSpotVersion
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
     * Set versionStatusId
     *
     * @param integer $versionStatusId
     * @return RediSpotVersion
     */
    public function setVersionStatusId($versionStatusId)
    {
        $this->versionStatusId = $versionStatusId;

        return $this;
    }

    /**
     * Get versionStatusId
     *
     * @return integer 
     */
    public function getVersionStatusId()
    {
        return $this->versionStatusId;
    }

    /**
     * Set versionNote
     *
     * @param string $versionNote
     * @return RediSpotVersion
     */
    public function setVersionNote($versionNote)
    {
        $this->versionNote = $versionNote;

        return $this;
    }

    /**
     * Get versionNote
     *
     * @return string 
     */
    public function getVersionNote()
    {
        return $this->versionNote;
    }

    /**
     * Set billingType
     *
     * @param string $billingType
     * @return RediSpotVersion
     */
    public function setBillingType($billingType)
    {
        $this->billingType = $billingType;

        return $this;
    }

    /**
     * Get billingType
     *
     * @return string 
     */
    public function getBillingType()
    {
        return $this->billingType;
    }
}
