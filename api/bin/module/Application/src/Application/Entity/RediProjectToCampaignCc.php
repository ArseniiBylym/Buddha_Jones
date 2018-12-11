<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediProjectToCampaignCc
 *
 * @ORM\Table(name="redi_project_to_campaign_cc")
 * @ORM\Entity
 */
class RediProjectToCampaignCc
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
     * @ORM\Column(name="customer_contact_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $customerContactId;



    /**
     * Set projectCampaignId
     *
     * @param integer $projectCampaignId
     * @return RediProjectToCampaignCc
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
     * Set customerContactId
     *
     * @param integer $customerContactId
     * @return RediProjectToCampaignCc
     */
    public function setCustomerContactId($customerContactId)
    {
        $this->customerContactId = $customerContactId;

        return $this;
    }

    /**
     * Get customerContactId
     *
     * @return integer 
     */
    public function getCustomerContactId()
    {
        return $this->customerContactId;
    }
}
