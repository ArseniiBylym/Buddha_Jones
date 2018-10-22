<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediCampaignChannel
 *
 * @ORM\Table(name="redi_campaign_channel")
 * @ORM\Entity
 */
class RediCampaignChannel
{
    /**
     * @var integer
     *
     * @ORM\Column(name="campaign_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $campaignId;

    /**
     * @var integer
     *
     * @ORM\Column(name="channel_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $channelId;



    /**
     * Set campaignId
     *
     * @param integer $campaignId
     * @return RediCampaignChannel
     */
    public function setCampaignId($campaignId)
    {
        $this->campaignId = $campaignId;

        return $this;
    }

    /**
     * Get campaignId
     *
     * @return integer 
     */
    public function getCampaignId()
    {
        return $this->campaignId;
    }

    /**
     * Set channelId
     *
     * @param integer $channelId
     * @return RediCampaignChannel
     */
    public function setChannelId($channelId)
    {
        $this->channelId = $channelId;

        return $this;
    }

    /**
     * Get channelId
     *
     * @return integer 
     */
    public function getChannelId()
    {
        return $this->channelId;
    }
}
