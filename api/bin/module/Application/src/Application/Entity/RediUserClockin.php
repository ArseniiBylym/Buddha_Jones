<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediUserClockin
 *
 * @ORM\Table(name="redi_user_clockin", indexes={@ORM\Index(name=" clockin", columns={"clockin"})})
 * @ORM\Entity
 */
class RediUserClockin
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
     * @ORM\Column(name="user_id", type="integer", nullable=true)
     */
    private $userId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="clockin", type="datetime", nullable=true)
     */
    private $clockin;



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
     * Set userId
     *
     * @param integer $userId
     * @return RediUserClockin
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

    /**
     * Set clockin
     *
     * @param \DateTime $clockin
     * @return RediUserClockin
     */
    public function setClockin($clockin)
    {
        $this->clockin = $clockin;

        return $this;
    }

    /**
     * Get clockin
     *
     * @return \DateTime 
     */
    public function getClockin()
    {
        return $this->clockin;
    }
}
