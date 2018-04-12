<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediStaff
 *
 * @ORM\Table(name="redi_staff")
 * @ORM\Entity
 */
class RediStaff
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
     * @ORM\Column(name="name", type="string", length=45, nullable=true)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="rate", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $rate;

    /**
     * @var integer
     *
     * @ORM\Column(name="min_hour", type="integer", nullable=true)
     */
    private $minHour;



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
     * Set name
     *
     * @param string $name
     * @return RediStaff
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
     * Set rate
     *
     * @param string $rate
     * @return RediStaff
     */
    public function setRate($rate)
    {
        $this->rate = $rate;

        return $this;
    }

    /**
     * Get rate
     *
     * @return string 
     */
    public function getRate()
    {
        return $this->rate;
    }

    /**
     * Set minHour
     *
     * @param integer $minHour
     * @return RediStaff
     */
    public function setMinHour($minHour)
    {
        $this->minHour = $minHour;

        return $this;
    }

    /**
     * Get minHour
     *
     * @return integer 
     */
    public function getMinHour()
    {
        return $this->minHour;
    }
}
