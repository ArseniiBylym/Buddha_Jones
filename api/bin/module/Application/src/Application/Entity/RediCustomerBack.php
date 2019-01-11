<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediCustomerBack
 *
 * @ORM\Table(name="redi_customer_back", indexes={@ORM\Index(name="cardcode", columns={"cardcode"})})
 * @ORM\Entity
 */
class RediCustomerBack
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
     * @ORM\Column(name="cardcode", type="string", length=255, nullable=true)
     */
    private $cardcode;

    /**
     * @var string
     *
     * @ORM\Column(name="customer_name", type="string", length=255, nullable=true)
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
     * Set cardcode
     *
     * @param string $cardcode
     * @return RediCustomerBack
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
     * Set customerName
     *
     * @param string $customerName
     * @return RediCustomerBack
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
