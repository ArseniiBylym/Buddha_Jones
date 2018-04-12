<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediProjectToCampaignUser
 *
 * @ORM\Table(name="redi_project_to_campaign_user")
 * @ORM\Entity
 */
class RediProjectToCampaignUser
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
     * @var integer
     *
     * @ORM\Column(name="role_id", type="integer", nullable=true)
     */
    private $roleId;



    /**
     * Set projectCampaignId
     *
     * @param integer $projectCampaignId
     * @return RediProjectToCampaignUser
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
     * @return RediProjectToCampaignUser
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
     * Set roleId
     *
     * @param integer $roleId
     * @return RediProjectToCampaignUser
     */
    public function setRoleId($roleId)
    {
        $this->roleId = $roleId;

        return $this;
    }

    /**
     * Get roleId
     *
     * @return integer 
     */
    public function getRoleId()
    {
        return $this->roleId;
    }
}
