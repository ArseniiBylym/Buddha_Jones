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
     * @ORM\Column(name="id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="bill_id", type="bigint", nullable=true)
     */
    private $billId;

    /**
     * @var string
     *
     * @ORM\Column(name="line_type", type="string", length=2, nullable=true)
     */
    private $lineType;

    /**
     * @var string
     *
     * @ORM\Column(name="line_desc", type="text", nullable=true)
     */
    private $lineDesc;

    /**
     * @var string
     *
     * @ORM\Column(name="rate", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $rate;

    /**
     * @var string
     *
     * @ORM\Column(name="hours", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $hours;

    /**
     * @var string
     *
     * @ORM\Column(name="disc_perc", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $discPerc;

    /**
     * @var string
     *
     * @ORM\Column(name="disc_amt", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $discAmt;

    /**
     * @var string
     *
     * @ORM\Column(name="total_disc", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $totalDisc;

    /**
     * @var string
     *
     * @ORM\Column(name="total_bef_disc", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $totalBefDisc;

    /**
     * @var string
     *
     * @ORM\Column(name="net_amount", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $netAmount;



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
     * Set lineType
     *
     * @param string $lineType
     * @return RediBillingLine
     */
    public function setLineType($lineType)
    {
        $this->lineType = $lineType;

        return $this;
    }

    /**
     * Get lineType
     *
     * @return string 
     */
    public function getLineType()
    {
        return $this->lineType;
    }

    /**
     * Set lineDesc
     *
     * @param string $lineDesc
     * @return RediBillingLine
     */
    public function setLineDesc($lineDesc)
    {
        $this->lineDesc = $lineDesc;

        return $this;
    }

    /**
     * Get lineDesc
     *
     * @return string 
     */
    public function getLineDesc()
    {
        return $this->lineDesc;
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
     * Set discPerc
     *
     * @param string $discPerc
     * @return RediBillingLine
     */
    public function setDiscPerc($discPerc)
    {
        $this->discPerc = $discPerc;

        return $this;
    }

    /**
     * Get discPerc
     *
     * @return string 
     */
    public function getDiscPerc()
    {
        return $this->discPerc;
    }

    /**
     * Set discAmt
     *
     * @param string $discAmt
     * @return RediBillingLine
     */
    public function setDiscAmt($discAmt)
    {
        $this->discAmt = $discAmt;

        return $this;
    }

    /**
     * Get discAmt
     *
     * @return string 
     */
    public function getDiscAmt()
    {
        return $this->discAmt;
    }

    /**
     * Set totalDisc
     *
     * @param string $totalDisc
     * @return RediBillingLine
     */
    public function setTotalDisc($totalDisc)
    {
        $this->totalDisc = $totalDisc;

        return $this;
    }

    /**
     * Get totalDisc
     *
     * @return string 
     */
    public function getTotalDisc()
    {
        return $this->totalDisc;
    }

    /**
     * Set totalBefDisc
     *
     * @param string $totalBefDisc
     * @return RediBillingLine
     */
    public function setTotalBefDisc($totalBefDisc)
    {
        $this->totalBefDisc = $totalBefDisc;

        return $this;
    }

    /**
     * Get totalBefDisc
     *
     * @return string 
     */
    public function getTotalBefDisc()
    {
        return $this->totalBefDisc;
    }

    /**
     * Set netAmount
     *
     * @param string $netAmount
     * @return RediBillingLine
     */
    public function setNetAmount($netAmount)
    {
        $this->netAmount = $netAmount;

        return $this;
    }

    /**
     * Get netAmount
     *
     * @return string 
     */
    public function getNetAmount()
    {
        return $this->netAmount;
    }
}
