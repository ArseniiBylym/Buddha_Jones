<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediBillingTimeEntry
 *
 * @ORM\Table(name="redi_billing_time_entry")
 * @ORM\Entity
 */
class RediBillingTimeEntry
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
     * @ORM\Column(name="bill_line_id", type="bigint", nullable=true)
     */
    private $billLineId;

    /**
     * @var integer
     *
     * @ORM\Column(name="time_entry_id", type="bigint", nullable=true)
     */
    private $timeEntryId;

    /**
     * @var string
     *
     * @ORM\Column(name="time_entry_hours", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $timeEntryHours;

    /**
     * @var string
     *
     * @ORM\Column(name="lost_hours", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $lostHours;

    /**
     * @var string
     *
     * @ORM\Column(name="rt", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $rt;

    /**
     * @var string
     *
     * @ORM\Column(name="ot", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $ot;

    /**
     * @var string
     *
     * @ORM\Column(name="dt", type="decimal", precision=19, scale=2, nullable=true)
     */
    private $dt;



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
     * Set billLineId
     *
     * @param integer $billLineId
     * @return RediBillingTimeEntry
     */
    public function setBillLineId($billLineId)
    {
        $this->billLineId = $billLineId;

        return $this;
    }

    /**
     * Get billLineId
     *
     * @return integer 
     */
    public function getBillLineId()
    {
        return $this->billLineId;
    }

    /**
     * Set timeEntryId
     *
     * @param integer $timeEntryId
     * @return RediBillingTimeEntry
     */
    public function setTimeEntryId($timeEntryId)
    {
        $this->timeEntryId = $timeEntryId;

        return $this;
    }

    /**
     * Get timeEntryId
     *
     * @return integer 
     */
    public function getTimeEntryId()
    {
        return $this->timeEntryId;
    }

    /**
     * Set timeEntryHours
     *
     * @param string $timeEntryHours
     * @return RediBillingTimeEntry
     */
    public function setTimeEntryHours($timeEntryHours)
    {
        $this->timeEntryHours = $timeEntryHours;

        return $this;
    }

    /**
     * Get timeEntryHours
     *
     * @return string 
     */
    public function getTimeEntryHours()
    {
        return $this->timeEntryHours;
    }

    /**
     * Set lostHours
     *
     * @param string $lostHours
     * @return RediBillingTimeEntry
     */
    public function setLostHours($lostHours)
    {
        $this->lostHours = $lostHours;

        return $this;
    }

    /**
     * Get lostHours
     *
     * @return string 
     */
    public function getLostHours()
    {
        return $this->lostHours;
    }

    /**
     * Set rt
     *
     * @param string $rt
     * @return RediBillingTimeEntry
     */
    public function setRt($rt)
    {
        $this->rt = $rt;

        return $this;
    }

    /**
     * Get rt
     *
     * @return string 
     */
    public function getRt()
    {
        return $this->rt;
    }

    /**
     * Set ot
     *
     * @param string $ot
     * @return RediBillingTimeEntry
     */
    public function setOt($ot)
    {
        $this->ot = $ot;

        return $this;
    }

    /**
     * Get ot
     *
     * @return string 
     */
    public function getOt()
    {
        return $this->ot;
    }

    /**
     * Set dt
     *
     * @param string $dt
     * @return RediBillingTimeEntry
     */
    public function setDt($dt)
    {
        $this->dt = $dt;

        return $this;
    }

    /**
     * Get dt
     *
     * @return string 
     */
    public function getDt()
    {
        return $this->dt;
    }
}
