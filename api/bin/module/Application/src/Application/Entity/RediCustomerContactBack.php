<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediCustomerContactBack
 *
 * @ORM\Table(name="redi_customer_contact_back", indexes={@ORM\Index(name="customer_id", columns={"customer_id"}), @ORM\Index(name="cardcode", columns={"cardcode"})})
 * @ORM\Entity
 */
class RediCustomerContactBack
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
     * @ORM\Column(name="customer_id", type="integer", nullable=true)
     */
    private $customerId;

    /**
     * @var string
     *
     * @ORM\Column(name="cardcode", type="string", length=255, nullable=true)
     */
    private $cardcode;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="mobile_phone", type="string", length=255, nullable=true)
     */
    private $mobilePhone;

    /**
     * @var string
     *
     * @ORM\Column(name="office_phone", type="string", length=255, nullable=true)
     */
    private $officePhone;

    /**
     * @var string
     *
     * @ORM\Column(name="postal_address", type="text", nullable=true)
     */
    private $postalAddress;



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
     * Set customerId
     *
     * @param integer $customerId
     * @return RediCustomerContactBack
     */
    public function setCustomerId($customerId)
    {
        $this->customerId = $customerId;

        return $this;
    }

    /**
     * Get customerId
     *
     * @return integer 
     */
    public function getCustomerId()
    {
        return $this->customerId;
    }

    /**
     * Set cardcode
     *
     * @param string $cardcode
     * @return RediCustomerContactBack
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
     * Set name
     *
     * @param string $name
     * @return RediCustomerContactBack
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return RediCustomerContactBack
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set mobilePhone
     *
     * @param string $mobilePhone
     * @return RediCustomerContactBack
     */
    public function setMobilePhone($mobilePhone)
    {
        $this->mobilePhone = $mobilePhone;

        return $this;
    }

    /**
     * Get mobilePhone
     *
     * @return string 
     */
    public function getMobilePhone()
    {
        return $this->mobilePhone;
    }

    /**
     * Set officePhone
     *
     * @param string $officePhone
     * @return RediCustomerContactBack
     */
    public function setOfficePhone($officePhone)
    {
        $this->officePhone = $officePhone;

        return $this;
    }

    /**
     * Get officePhone
     *
     * @return string 
     */
    public function getOfficePhone()
    {
        return $this->officePhone;
    }

    /**
     * Set postalAddress
     *
     * @param string $postalAddress
     * @return RediCustomerContactBack
     */
    public function setPostalAddress($postalAddress)
    {
        $this->postalAddress = $postalAddress;

        return $this;
    }

    /**
     * Get postalAddress
     *
     * @return string 
     */
    public function getPostalAddress()
    {
        return $this->postalAddress;
    }
}