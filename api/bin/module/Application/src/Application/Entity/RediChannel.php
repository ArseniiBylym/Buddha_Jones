<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediChannel
 *
 * @ORM\Table(name="redi_channel")
 * @ORM\Entity
 */
class RediChannel
{
    /**
     * @var integer
     *
     * @ORM\Column(name="channel_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $channelId;

    /**
     * @var string
     *
     * @ORM\Column(name="channel_name", type="string", length=100, nullable=true)
     */
    private $channelName;



    /**
     * Get channelId
     *
     * @return integer 
     */
    public function getChannelId()
    {
        return $this->channelId;
    }

    /**
     * Set channelName
     *
     * @param string $channelName
     * @return RediChannel
     */
    public function setChannelName($channelName)
    {
        $this->channelName = $channelName;

        return $this;
    }

    /**
     * Get channelName
     *
     * @return string 
     */
    public function getChannelName()
    {
        return $this->channelName;
    }
}
