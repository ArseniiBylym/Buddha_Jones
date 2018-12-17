<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediCustomer
 *
 * @ORM\Table(name="redi_customer", indexes={@ORM\Index(name="customer_id", columns={"studio_id"}), @ORM\Index(name="cardcode", columns={"cardcode"})})
 * @ORM\Entity
 */
class RediCustomer
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
     * @var integer
     *
     * @ORM\Column(name="studio_id", type="integer", nullable=true)
     */
    private $studioId;

    /**
     * @var string
     *
     * @ORM\Column(name="cardcode", type="string", length=15, nullable=true)
     */
    private $cardcode;

    /**
     * @var string
     *
     * @ORM\Column(name="cardname", type="string", length=100, nullable=true)
     */
    private $cardname;

    /**
     * @var string
     *
     * @ORM\Column(name="customer_name", type="string", length=100, nullable=true)
     */
    private $customerName;



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
     * Set studioId
     *
     * @param integer $studioId
     * @return RediCustomer
     */
    public function setStudioId($studioId)
    {
        $this->studioId = $studioId;

        return $this;
    }

    /**
     * Get studioId
     *
     * @return integer 
     */
    public function getStudioId()
    {
        return $this->studioId;
    }

    /**
     * Set cardcode
     *
     * @param string $cardcode
     * @return RediCustomer
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
     * Set cardname
     *
     * @param string $cardname
     * @return RediCustomer
     */
    public function setCardname($cardname)
    {
        $this->cardname = $cardname;

        return $this;
    }

    /**
     * Get cardname
     *
     * @return string 
     */
    public function getCardname()
    {
        return $this->cardname;
    }

    /**
     * Set customerName
     *
     * @param string $customerName
     * @return RediCustomer
     */
    public function setCustomerName($customerName)
    {
        $this->customerName = $customerName;

        return $this;
    }

    /**
     * Get customerName
     *
     * @return string 
     */
    public function getCustomerName()
    {
        return $this->customerName;
    }
}
