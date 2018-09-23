<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediSpotVersionEditor
 *
 * @ORM\Table(name="redi_spot_version_editor")
 * @ORM\Entity
 */
class RediSpotVersionEditor
{
    /**
     * @var integer
     *
     * @ORM\Column(name="spot_version_id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $spotVersionId;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $userId;



    /**
     * Set spotVersionId
     *
     * @param integer $spotVersionId
     * @return RediSpotVersionEditor
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

    /**
     * Set userId
     *
     * @param integer $userId
     * @return RediSpotVersionEditor
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer 
     */
    public function getUserId()
    {
        return $this->userId;
    }
}
