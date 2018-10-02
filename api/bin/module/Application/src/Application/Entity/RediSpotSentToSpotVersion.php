<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediSpotSentToSpotVersion
 *
 * @ORM\Table(name="redi_spot_sent_to_spot_version")
 * @ORM\Entity
 */
class RediSpotSentToSpotVersion
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
     * @ORM\Column(name="spot_sent_id", type="bigint", nullable=true)
     */
    private $spotSentId;

    /**
     * @var integer
     *
     * @ORM\Column(name="spot_version_id", type="bigint", nullable=true)
     */
    private $spotVersionId;



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
     * Set spotSentId
     *
     * @param integer $spotSentId
     * @return RediSpotSentToSpotVersion
     */
    public function setSpotSentId($spotSentId)
    {
        $this->spotSentId = $spotSentId;

        return $this;
    }

    /**
     * Get spotSentId
     *
     * @return integer 
     */
    public function getSpotSentId()
    {
        return $this->spotSentId;
    }

    /**
     * Set spotVersionId
     *
     * @param integer $spotVersionId
     * @return RediSpotSentToSpotVersion
     */
    public function setSpotVersionId($spotVersionId)
    {
        $this->spotVersionId = $spotVersionId;

        return $this;
    }

    /**
     * Get spotVersionId
     *
     * @return integer 
     */
    public function getSpotVersionId()
    {
        return $this->spotVersionId;
    }
}
