<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediCustomerNew
 *
 * @ORM\Table(name="redi_customer_new")
 * @ORM\Entity
 */
class RediCustomerNew
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
     * @ORM\Column(name="studio_name", type="string", length=100, nullable=true)
     */
    private $studioName;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=45, nullable=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="street", type="string", length=45, nullable=true)
     */
    private $street;

    /**
     * @var string
     *
     * @ORM\Column(name="city", type="string", length=45, nullable=true)
     */
    private $city;

    /**
     * @var string
     *
     * @ORM\Column(name="state", type="string", length=45, nullable=true)
     */
    private $state;

    /**
     * @var string
     *
     * @ORM\Column(name="zip", type="string", length=8, nullable=true)
     */
    private $zip;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=100, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=45, nullable=true)
     */
    private $phone;

    /**
     * @var string
     *
     * @ORM\Column(name="billing_contact", type="string", length=100, nullable=true)
     */
    private $billingContact;

    /**
     * @var string
     *
     * @ORM\Column(name="billing_email", type="string", length=100, nullable=true)
     */
    private $billingEmail;

    /**
     * @var string
     *
     * @ORM\Column(name="billing_phone", type="string", length=45, nullable=true)
     */
    private $billingPhone;

    /**
     * @var integer
     *
     * @ORM\Column(name="created_by", type="integer", nullable=true)
     */
    private $createdBy;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;



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
     * @return RediCustomerNew
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
     * Set studioName
     *
     * @param string $studioName
     * @return RediCustomerNew
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

    /**
     * Set name
     *
     * @param string $name
     * @return RediCustomerNew
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
     * Set street
     *
     * @param string $street
     * @return RediCustomerNew
     */
    public function setStreet($street)
    {
        $this->street = $street;

        return $this;
    }

    /**
     * Get street
     *
     * @return string 
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * Set city
     *
     * @param string $city
     * @return RediCustomerNew
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string 
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set state
     *
     * @param string $state
     * @return RediCustomerNew
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return string 
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set zip
     *
     * @param string $zip
     * @return RediCustomerNew
     */
    public function setZip($zip)
    {
        $this->zip = $zip;

        return $this;
    }

    /**
     * Get zip
     *
     * @return string 
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return RediCustomerNew
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
     * Set phone
     *
     * @param string $phone
     * @return RediCustomerNew
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string 
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set billingContact
     *
     * @param string $billingContact
     * @return RediCustomerNew
     */
    public function setBillingContact($billingContact)
    {
        $this->billingContact = $billingContact;

        return $this;
    }

    /**
     * Get billingContact
     *
     * @return string 
     */
    public function getBillingContact()
    {
        return $this->billingContact;
    }

    /**
     * Set billingEmail
     *
     * @param string $billingEmail
     * @return RediCustomerNew
     */
    public function setBillingEmail($billingEmail)
    {
        $this->billingEmail = $billingEmail;

        return $this;
    }

    /**
     * Get billingEmail
     *
     * @return string 
     */
    public function getBillingEmail()
    {
        return $this->billingEmail;
    }

    /**
     * Set billingPhone
     *
     * @param string $billingPhone
     * @return RediCustomerNew
     */
    public function setBillingPhone($billingPhone)
    {
        $this->billingPhone = $billingPhone;

        return $this;
    }

    /**
     * Get billingPhone
     *
     * @return string 
     */
    public function getBillingPhone()
    {
        return $this->billingPhone;
    }

    /**
     * Set createdBy
     *
     * @param integer $createdBy
     * @return RediCustomerNew
     */
    public function setCreatedBy($createdBy)
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    /**
     * Get createdBy
     *
     * @return integer 
     */
    public function getCreatedBy()
    {
        return $this->createdBy;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return RediCustomerNew
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }
}
