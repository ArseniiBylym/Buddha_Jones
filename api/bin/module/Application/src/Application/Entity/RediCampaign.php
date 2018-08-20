<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediCampaign
 *
 * @ORM\Table(name="redi_campaign")
 * @ORM\Entity
 */
class RediCampaign
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
     * @var string
     *
     * @ORM\Column(name="campaign_name", type="string", length=22, nullable=true)
     */
    private $campaignName;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="editor_req", type="text", nullable=true)
     */
    private $editorReq;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="material_received", type="datetime", nullable=true)
     */
    private $materialReceived;

    /**
     * @var integer
     *
     * @ORM\Column(name="created_by_user_id", type="integer", nullable=true)
     */
    private $createdByUserId;



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
     * Set campaignName
     *
     * @param string $campaignName
     * @return RediCampaign
     */
    public function setCampaignName($campaignName)
    {
        $this->campaignName = $campaignName;

        return $this;
    }

    /**
     * Get campaignName
     *
     * @return string 
     */
    public function getCampaignName()
    {
        return $this->campaignName;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return RediCampaign
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set editorReq
     *
     * @param string $editorReq
     * @return RediCampaign
     */
    public function setEditorReq($editorReq)
    {
        $this->editorReq = $editorReq;

        return $this;
    }

    /**
     * Get editorReq
     *
     * @return string 
     */
    public function getEditorReq()
    {
        return $this->editorReq;
    }

    /**
     * Set materialReceived
     *
     * @param \DateTime $materialReceived
     * @return RediCampaign
     */
    public function setMaterialReceived($materialReceived)
    {
        $this->materialReceived = $materialReceived;

        return $this;
    }

    /**
     * Get materialReceived
     *
     * @return \DateTime 
     */
    public function getMaterialReceived()
    {
        return $this->materialReceived;
    }

    /**
     * Set createdByUserId
     *
     * @param integer $createdByUserId
     * @return RediCampaign
     */
    public function setCreatedByUserId($createdByUserId)
    {
        $this->createdByUserId = $createdByUserId;

        return $this;
    }

    /**
     * Get createdByUserId
     *
     * @return integer 
     */
    public function getCreatedByUserId()
    {
        return $this->createdByUserId;
    }
}
