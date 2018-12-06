<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediBillingLine
 *
 * @ORM\Table(name="redi_billing_line")
 * @ORM\Entity
 */
class RediBillingLine
{
    /**
     * @var integer
     *
     * @ORM\Column(name="line_id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $lineId;

    /**
     * @var integer
     *
     * @ORM\Column(name="bill_id", type="bigint", nullable=true)
     */
    private $billId;

    /**
     * @var integer
     *
     * @ORM\Column(name="spot_id", type="bigint", nullable=true)
     */
    private $spotId;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="rate_type", type="string", length=1, nullable=true)
     */
    private $rateType;

    /**
     * @var string
     *
     * @ORM\Column(name="hours", type="string", length=45, nullable=true)
     */
    private $hours;

    /**
     * @var string
     *
     * @ORM\Column(name="rate", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $rate;

    /**
     * @var string
     *
     * @ORM\Column(name="total_before_discount", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $totalBeforeDiscount;

    /**
     * @var string
     *
     * @ORM\Column(name="discount", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $discount;

    /**
     * @var string
     *
     * @ORM\Column(name="total", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $total;



    /**
     * Get lineId
     *
     * @return integer 
     */
    public function getLineId()
    {
        return $this->lineId;
    }

    /**
     * Set billId
     *
     * @param integer $billId
     * @return RediBillingLine
     */
    public function setBillId($billId)
    {
        $this->billId = $billId;

        return $this;
    }

    /**
     * Get billId
     *
     * @return integer 
     */
    public function getBillId()
    {
        return $this->billId;
    }

    /**
     * Set spotId
     *
     * @param integer $spotId
     * @return RediBillingLine
     */
    public function setSpotId($spotId)
    {
        $this->spotId = $spotId;

        return $this;
    }

    /**
     * Get spotId
     *
     * @return integer 
     */
    public function getSpotId()
    {
        return $this->spotId;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return RediBillingLine
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
     * Set rateType
     *
     * @param string $rateType
     * @return RediBillingLine
     */
    public function setRateType($rateType)
    {
        $this->rateType = $rateType;

        return $this;
    }

    /**
     * Get rateType
     *
     * @return string 
     */
    public function getRateType()
    {
        return $this->rateType;
    }

    /**
     * Set hours
     *
     * @param string $hours
     * @return RediBillingLine
     */
    public function setHours($hours)
    {
        $this->hours = $hours;

        return $this;
    }

    /**
     * Get hours
     *
     * @return string 
     */
    public function getHours()
    {
        return $this->hours;
    }

    /**
     * Set rate
     *
     * @param string $rate
     * @return RediBillingLine
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
     * Set totalBeforeDiscount
     *
     * @param string $totalBeforeDiscount
     * @return RediBillingLine
     */
    public function setTotalBeforeDiscount($totalBeforeDiscount)
    {
        $this->totalBeforeDiscount = $totalBeforeDiscount;

        return $this;
    }

    /**
     * Get totalBeforeDiscount
     *
     * @return string 
     */
    public function getTotalBeforeDiscount()
    {
        return $this->totalBeforeDiscount;
    }

    /**
     * Set discount
     *
     * @param string $discount
     * @return RediBillingLine
     */
    public function setDiscount($discount)
    {
        $this->discount = $discount;

        return $this;
    }

    /**
     * Get discount
     *
     * @return string 
     */
    public function getDiscount()
    {
        return $this->discount;
    }

    /**
     * Set total
     *
     * @param string $total
     * @return RediBillingLine
     */
    public function setTotal($total)
    {
        $this->total = $total;

        return $this;
    }

    /**
     * Get total
     *
     * @return string 
     */
    public function getTotal()
    {
        return $this->total;
    }
}
