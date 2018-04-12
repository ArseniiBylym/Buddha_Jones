<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediProjectToCampaignMgt
 *
 * @ORM\Table(name="redi_project_to_campaign_mgt")
 * @ORM\Entity
 */
class RediProjectToCampaignMgt
{
    /**
     * @var integer
     *
     * @ORM\Column(name="project_campaign_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $projectCampaignId;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $userId;



    /**
     * Set projectCampaignId
     *
     * @param integer $projectCampaignId
     * @return RediProjectToCampaignMgt
     */
    public function setProjectCampaignId($projectCampaignId)
    {
        $this->projectCampaignId = $projectCampaignId;

        return $this;
    }

    /**
     * Get projectCampaignId
     *
     * @return integer 
     */
    public function getProjectCampaignId()
    {
        return $this->projectCampaignId;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     * @return RediProjectToCampaignMgt
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
