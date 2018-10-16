<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediStudio
 *
 * @ORM\Table(name="redi_studio", indexes={@ORM\Index(name="cardcode", columns={"cardcode"})})
 * @ORM\Entity
 */
class RediStudio
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="cardcode", type="string", length=15, nullable=true)
     */
    private $cardcode;

    /**
     * @var string
     *
     * @ORM\Column(name="studio_name", type="string", length=100, nullable=true)
     */
    private $studioName;



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
     * Set cardcode
     *
     * @param string $cardcode
     * @return RediStudio
     */
    public function setCardcode($cardcode)
    {
        $this->cardcode = $cardcode;

        return $this;
    }

    /**
     * Get cardcode
     *
     * @return string 
     */
    public function getCardcode()
    {
        return $this->cardcode;
    }

    /**
     * Set studioName
     *
     * @param string $studioName
     * @return RediStudio
     */
    public function setStudioName($studioName)
    {
        $this->studioName = $studioName;

        return $this;
    }

    /**
     * Get studioName
     *
     * @return string 
     */
    public function getStudioName()
    {
        return $this->studioName;
    }
}
