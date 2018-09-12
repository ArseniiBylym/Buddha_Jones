<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AccountDataView
 *
 * @ORM\Table(name="account_data_view")
 * @ORM\Entity
 */
class AccountDataView
{
    /**
     * @var integer
     *
     * @ORM\Column(name="auto_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $autoId;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     */
    private $userId;

    /**
     * @var string
     *
     * @ORM\Column(name="tech_name", type="string", length=33, nullable=false)
     */
    private $techName;

    /**
     * @var string
     *
     * @ORM\Column(name="user_address1", type="string", length=128, nullable=false)
     */
    private $userAddress1;

    /**
     * @var string
     *
     * @ORM\Column(name="user_city", type="string", length=64, nullable=false)
     */
    private $userCity;

    /**
     * @var string
     *
     * @ORM\Column(name="user_state", type="string", length=3, nullable=false)
     */
    private $userState;

    /**
     * @var string
     *
     * @ORM\Column(name="user_zip", type="string", length=5, nullable=false)
     */
    private $userZip;

    /**
     * @var string
     *
     * @ORM\Column(name="user_phone", type="string", length=12, nullable=false)
     */
    private $userPhone;

    /**
     * @var string
     *
     * @ORM\Column(name="user_email", type="string", length=128, nullable=false)
     */
    private $userEmail;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_company_id", type="integer", nullable=false)
     */
    private $userCompanyId;

    /**
     * @var string
     *
     * @ORM\Column(name="user_company", type="string", length=64, nullable=false)
     */
    private $userCompany;

    /**
     * @var boolean
     *
     * @ORM\Column(name="pay_company", type="boolean", nullable=false)
     */
    private $payCompany;

    /**
     * @var integer
     *
     * @ORM\Column(name="technician_eca", type="integer", nullable=false)
     */
    private $technicianEca;

    /**
     * @var integer
     *
     * @ORM\Column(name="technician_w9", type="integer", nullable=false)
     */
    private $technicianW9;

    /**
     * @var integer
     *
     * @ORM\Column(name="company_id", type="integer", nullable=false)
     */
    private $companyId;

    /**
     * @var string
     *
     * @ORM\Column(name="company_name", type="string", length=64, nullable=false)
     */
    private $companyName;

    /**
     * @var string
     *
     * @ORM\Column(name="company_address1", type="string", length=64, nullable=true)
     */
    private $companyAddress1;

    /**
     * @var string
     *
     * @ORM\Column(name="company_address2", type="string", length=64, nullable=true)
     */
    private $companyAddress2;

    /**
     * @var string
     *
     * @ORM\Column(name="company_city", type="string", length=64, nullable=true)
     */
    private $companyCity;

    /**
     * @var string
     *
     * @ORM\Column(name="company_state", type="string", length=3, nullable=true)
     */
    private $companyState;

    /**
     * @var string
     *
     * @ORM\Column(name="company_zip", type="string", length=10, nullable=true)
     */
    private $companyZip;

    /**
     * @var string
     *
     * @ORM\Column(name="company_contact_name", type="string", length=64, nullable=true)
     */
    private $companyContactName;

    /**
     * @var string
     *
     * @ORM\Column(name="company_contact_phone", type="string", length=32, nullable=true)
     */
    private $companyContactPhone;

    /**
     * @var string
     *
     * @ORM\Column(name="company_contact_email", type="string", length=64, nullable=true)
     */
    private $companyContactEmail;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=2, nullable=false)
     */
    private $type;

    /**
     * @var integer
     *
     * @ORM\Column(name="site_or_wo_id", type="integer", nullable=false)
     */
    private $siteOrWoId;

    /**
     * @var string
     *
     * @ORM\Column(name="site_wo_name", type="string", length=128, nullable=true)
     */
    private $siteWoName;

    /**
     * @var integer
     *
     * @ORM\Column(name="status_id", type="integer", nullable=false)
     */
    private $statusId;

    /**
     * @var string
     *
     * @ORM\Column(name="workorder_number", type="string", length=32, nullable=true)
     */
    private $workorderNumber;

    /**
     * @var string
     *
     * @ORM\Column(name="po_number", type="string", length=32, nullable=true)
     */
    private $poNumber;

    /**
     * @var string
     *
     * @ORM\Column(name="address1", type="string", length=64, nullable=false)
     */
    private $address1;

    /**
     * @var string
     *
     * @ORM\Column(name="city", type="string", length=64, nullable=false)
     */
    private $city;

    /**
     * @var string
     *
     * @ORM\Column(name="state", type="string", length=3, nullable=false)
     */
    private $state;

    /**
     * @var string
     *
     * @ORM\Column(name="zip", type="string", length=11, nullable=false)
     */
    private $zip;

    /**
     * @var integer
     *
     * @ORM\Column(name="num_device", type="integer", nullable=true)
     */
    private $numDevice;

    /**
     * @var integer
     *
     * @ORM\Column(name="st_wo_technicians_id", type="integer", nullable=false)
     */
    private $stWoTechniciansId;

    /**
     * @var integer
     *
     * @ORM\Column(name="tech_position", type="bigint", nullable=false)
     */
    private $techPosition;

    /**
     * @var integer
     *
     * @ORM\Column(name="actual_enddate", type="integer", nullable=true)
     */
    private $actualEnddate;

    /**
     * @var float
     *
     * @ORM\Column(name="total_work_hours", type="float", precision=10, scale=0, nullable=true)
     */
    private $totalWorkHours;

    /**
     * @var integer
     *
     * @ORM\Column(name="work_complete", type="integer", nullable=false)
     */
    private $workComplete;

    /**
     * @var integer
     *
     * @ORM\Column(name="approved", type="integer", nullable=false)
     */
    private $approved;

    /**
     * @var integer
     *
     * @ORM\Column(name="paid", type="integer", nullable=false)
     */
    private $paid;

    /**
     * @var integer
     *
     * @ORM\Column(name="paid_date", type="integer", nullable=true)
     */
    private $paidDate;

    /**
     * @var float
     *
     * @ORM\Column(name="total_m_cost", type="float", precision=12, scale=2, nullable=true)
     */
    private $totalMCost;

    /**
     * @var float
     *
     * @ORM\Column(name="total_a_cost", type="float", precision=12, scale=2, nullable=true)
     */
    private $totalACost;

    /**
     * @var float
     *
     * @ORM\Column(name="work_amount", type="float", precision=7, scale=2, nullable=false)
     */
    private $workAmount;

    /**
     * @var float
     *
     * @ORM\Column(name="paid_amount", type="float", precision=12, scale=2, nullable=true)
     */
    private $paidAmount;



    /**
     * Get autoId
     *
     * @return integer 
     */
    public function getAutoId()
    {
        return $this->autoId;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     * @return AccountDataView
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer 
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set techName
     *
     * @param string $techName
     * @return AccountDataView
     */
    public function setTechName($techName)
    {
        $this->techName = $techName;

        return $this;
    }

    /**
     * Get techName
     *
     * @return string 
     */
    public function getTechName()
    {
        return $this->techName;
    }

    /**
     * Set userAddress1
     *
     * @param string $userAddress1
     * @return AccountDataView
     */
    public function setUserAddress1($userAddress1)
    {
        $this->userAddress1 = $userAddress1;

        return $this;
    }

    /**
     * Get userAddress1
     *
     * @return string 
     */
    public function getUserAddress1()
    {
        return $this->userAddress1;
    }

    /**
     * Set userCity
     *
     * @param string $userCity
     * @return AccountDataView
     */
    public function setUserCity($userCity)
    {
        $this->userCity = $userCity;

        return $this;
    }

    /**
     * Get userCity
     *
     * @return string 
     */
    public function getUserCity()
    {
        return $this->userCity;
    }

    /**
     * Set userState
     *
     * @param string $userState
     * @return AccountDataView
     */
    public function setUserState($userState)
    {
        $this->userState = $userState;

        return $this;
    }

    /**
     * Get userState
     *
     * @return string 
     */
    public function getUserState()
    {
        return $this->userState;
    }

    /**
     * Set userZip
     *
     * @param string $userZip
     * @return AccountDataView
     */
    public function setUserZip($userZip)
    {
        $this->userZip = $userZip;

        return $this;
    }

    /**
     * Get userZip
     *
     * @return string 
     */
    public function getUserZip()
    {
        return $this->userZip;
    }

    /**
     * Set userPhone
     *
     * @param string $userPhone
     * @return AccountDataView
     */
    public function setUserPhone($userPhone)
    {
        $this->userPhone = $userPhone;

        return $this;
    }

    /**
     * Get userPhone
     *
     * @return string 
     */
    public function getUserPhone()
    {
        return $this->userPhone;
    }

    /**
     * Set userEmail
     *
     * @param string $userEmail
     * @return AccountDataView
     */
    public function setUserEmail($userEmail)
    {
        $this->userEmail = $userEmail;

        return $this;
    }

    /**
     * Get userEmail
     *
     * @return string 
     */
    public function getUserEmail()
    {
        return $this->userEmail;
    }

    /**
     * Set userCompanyId
     *
     * @param integer $userCompanyId
     * @return AccountDataView
     */
    public function setUserCompanyId($userCompanyId)
    {
        $this->userCompanyId = $userCompanyId;

        return $this;
    }

    /**
     * Get userCompanyId
     *
     * @return integer 
     */
    public function getUserCompanyId()
    {
        return $this->userCompanyId;
    }

    /**
     * Set userCompany
     *
     * @param string $userCompany
     * @return AccountDataView
     */
    public function setUserCompany($userCompany)
    {
        $this->userCompany = $userCompany;

        return $this;
    }

    /**
     * Get userCompany
     *
     * @return string 
     */
    public function getUserCompany()
    {
        return $this->userCompany;
    }

    /**
     * Set payCompany
     *
     * @param boolean $payCompany
     * @return AccountDataView
     */
    public function setPayCompany($payCompany)
    {
        $this->payCompany = $payCompany;

        return $this;
    }

    /**
     * Get payCompany
     *
     * @return boolean 
     */
    public function getPayCompany()
    {
        return $this->payCompany;
    }

    /**
     * Set technicianEca
     *
     * @param integer $technicianEca
     * @return AccountDataView
     */
    public function setTechnicianEca($technicianEca)
    {
        $this->technicianEca = $technicianEca;

        return $this;
    }

    /**
     * Get technicianEca
     *
     * @return integer 
     */
    public function getTechnicianEca()
    {
        return $this->technicianEca;
    }

    /**
     * Set technicianW9
     *
     * @param integer $technicianW9
     * @return AccountDataView
     */
    public function setTechnicianW9($technicianW9)
    {
        $this->technicianW9 = $technicianW9;

        return $this;
    }

    /**
     * Get technicianW9
     *
     * @return integer 
     */
    public function getTechnicianW9()
    {
        return $this->technicianW9;
    }

    /**
     * Set companyId
     *
     * @param integer $companyId
     * @return AccountDataView
     */
    public function setCompanyId($companyId)
    {
        $this->companyId = $companyId;

        return $this;
    }

    /**
     * Get companyId
     *
     * @return integer 
     */
    public function getCompanyId()
    {
        return $this->companyId;
    }

    /**
     * Set companyName
     *
     * @param string $companyName
     * @return AccountDataView
     */
    public function setCompanyName($companyName)
    {
        $this->companyName = $companyName;

        return $this;
    }

    /**
     * Get companyName
     *
     * @return string 
     */
    public function getCompanyName()
    {
        return $this->companyName;
    }

    /**
     * Set companyAddress1
     *
     * @param string $companyAddress1
     * @return AccountDataView
     */
    public function setCompanyAddress1($companyAddress1)
    {
        $this->companyAddress1 = $companyAddress1;

        return $this;
    }

    /**
     * Get companyAddress1
     *
     * @return string 
     */
    public function getCompanyAddress1()
    {
        return $this->companyAddress1;
    }

    /**
     * Set companyAddress2
     *
     * @param string $companyAddress2
     * @return AccountDataView
     */
    public function setCompanyAddress2($companyAddress2)
    {
        $this->companyAddress2 = $companyAddress2;

        return $this;
    }

    /**
     * Get companyAddress2
     *
     * @return string 
     */
    public function getCompanyAddress2()
    {
        return $this->companyAddress2;
    }

    /**
     * Set companyCity
     *
     * @param string $companyCity
     * @return AccountDataView
     */
    public function setCompanyCity($companyCity)
    {
        $this->companyCity = $companyCity;

        return $this;
    }

    /**
     * Get companyCity
     *
     * @return string 
     */
    public function getCompanyCity()
    {
        return $this->companyCity;
    }

    /**
     * Set companyState
     *
     * @param string $companyState
     * @return AccountDataView
     */
    public function setCompanyState($companyState)
    {
        $this->companyState = $companyState;

        return $this;
    }

    /**
     * Get companyState
     *
     * @return string 
     */
    public function getCompanyState()
    {
        return $this->companyState;
    }

    /**
     * Set companyZip
     *
     * @param string $companyZip
     * @return AccountDataView
     */
    public function setCompanyZip($companyZip)
    {
        $this->companyZip = $companyZip;

        return $this;
    }

    /**
     * Get companyZip
     *
     * @return string 
     */
    public function getCompanyZip()
    {
        return $this->companyZip;
    }

    /**
     * Set companyContactName
     *
     * @param string $companyContactName
     * @return AccountDataView
     */
    public function setCompanyContactName($companyContactName)
    {
        $this->companyContactName = $companyContactName;

        return $this;
    }

    /**
     * Get companyContactName
     *
     * @return string 
     */
    public function getCompanyContactName()
    {
        return $this->companyContactName;
    }

    /**
     * Set companyContactPhone
     *
     * @param string $companyContactPhone
     * @return AccountDataView
     */
    public function setCompanyContactPhone($companyContactPhone)
    {
        $this->companyContactPhone = $companyContactPhone;

        return $this;
    }

    /**
     * Get companyContactPhone
     *
     * @return string 
     */
    public function getCompanyContactPhone()
    {
        return $this->companyContactPhone;
    }

    /**
     * Set companyContactEmail
     *
     * @param string $companyContactEmail
     * @return AccountDataView
     */
    public function setCompanyContactEmail($companyContactEmail)
    {
        $this->companyContactEmail = $companyContactEmail;

        return $this;
    }

    /**
     * Get companyContactEmail
     *
     * @return string 
     */
    public function getCompanyContactEmail()
    {
        return $this->companyContactEmail;
    }

    /**
     * Set type
     *
     * @param string $type
     * @return AccountDataView
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set siteOrWoId
     *
     * @param integer $siteOrWoId
     * @return AccountDataView
     */
    public function setSiteOrWoId($siteOrWoId)
    {
        $this->siteOrWoId = $siteOrWoId;

        return $this;
    }

    /**
     * Get siteOrWoId
     *
     * @return integer 
     */
    public function getSiteOrWoId()
    {
        return $this->siteOrWoId;
    }

    /**
     * Set siteWoName
     *
     * @param string $siteWoName
     * @return AccountDataView
     */
    public function setSiteWoName($siteWoName)
    {
        $this->siteWoName = $siteWoName;

        return $this;
    }

    /**
     * Get siteWoName
     *
     * @return string 
     */
    public function getSiteWoName()
    {
        return $this->siteWoName;
    }

    /**
     * Set statusId
     *
     * @param integer $statusId
     * @return AccountDataView
     */
    public function setStatusId($statusId)
    {
        $this->statusId = $statusId;

        return $this;
    }

    /**
     * Get statusId
     *
     * @return integer 
     */
    public function getStatusId()
    {
        return $this->statusId;
    }

    /**
     * Set workorderNumber
     *
     * @param string $workorderNumber
     * @return AccountDataView
     */
    public function setWorkorderNumber($workorderNumber)
    {
        $this->workorderNumber = $workorderNumber;

        return $this;
    }

    /**
     * Get workorderNumber
     *
     * @return string 
     */
    public function getWorkorderNumber()
    {
        return $this->workorderNumber;
    }

    /**
     * Set poNumber
     *
     * @param string $poNumber
     * @return AccountDataView
     */
    public function setPoNumber($poNumber)
    {
        $this->poNumber = $poNumber;

        return $this;
    }

    /**
     * Get poNumber
     *
     * @return string 
     */
    public function getPoNumber()
    {
        return $this->poNumber;
    }

    /**
     * Set address1
     *
     * @param string $address1
     * @return AccountDataView
     */
    public function setAddress1($address1)
    {
        $this->address1 = $address1;

        return $this;
    }

    /**
     * Get address1
     *
     * @return string 
     */
    public function getAddress1()
    {
        return $this->address1;
    }

    /**
     * Set city
     *
     * @param string $city
     * @return AccountDataView
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
     * @return AccountDataView
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
     * @return AccountDataView
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
     * Set numDevice
     *
     * @param integer $numDevice
     * @return AccountDataView
     */
    public function setNumDevice($numDevice)
    {
        $this->numDevice = $numDevice;

        return $this;
    }

    /**
     * Get numDevice
     *
     * @return integer 
     */
    public function getNumDevice()
    {
        return $this->numDevice;
    }

    /**
     * Set stWoTechniciansId
     *
     * @param integer $stWoTechniciansId
     * @return AccountDataView
     */
    public function setStWoTechniciansId($stWoTechniciansId)
    {
        $this->stWoTechniciansId = $stWoTechniciansId;

        return $this;
    }

    /**
     * Get stWoTechniciansId
     *
     * @return integer 
     */
    public function getStWoTechniciansId()
    {
        return $this->stWoTechniciansId;
    }

    /**
     * Set techPosition
     *
     * @param integer $techPosition
     * @return AccountDataView
     */
    public function setTechPosition($techPosition)
    {
        $this->techPosition = $techPosition;

        return $this;
    }

    /**
     * Get techPosition
     *
     * @return integer 
     */
    public function getTechPosition()
    {
        return $this->techPosition;
    }

    /**
     * Set actualEnddate
     *
     * @param integer $actualEnddate
     * @return AccountDataView
     */
    public function setActualEnddate($actualEnddate)
    {
        $this->actualEnddate = $actualEnddate;

        return $this;
    }

    /**
     * Get actualEnddate
     *
     * @return integer 
     */
    public function getActualEnddate()
    {
        return $this->actualEnddate;
    }

    /**
     * Set totalWorkHours
     *
     * @param float $totalWorkHours
     * @return AccountDataView
     */
    public function setTotalWorkHours($totalWorkHours)
    {
        $this->totalWorkHours = $totalWorkHours;

        return $this;
    }

    /**
     * Get totalWorkHours
     *
     * @return float 
     */
    public function getTotalWorkHours()
    {
        return $this->totalWorkHours;
    }

    /**
     * Set workComplete
     *
     * @param integer $workComplete
     * @return AccountDataView
     */
    public function setWorkComplete($workComplete)
    {
        $this->workComplete = $workComplete;

        return $this;
    }

    /**
     * Get workComplete
     *
     * @return integer 
     */
    public function getWorkComplete()
    {
        return $this->workComplete;
    }

    /**
     * Set approved
     *
     * @param integer $approved
     * @return AccountDataView
     */
    public function setApproved($approved)
    {
        $this->approved = $approved;

        return $this;
    }

    /**
     * Get approved
     *
     * @return integer 
     */
    public function getApproved()
    {
        return $this->approved;
    }

    /**
     * Set paid
     *
     * @param integer $paid
     * @return AccountDataView
     */
    public function setPaid($paid)
    {
        $this->paid = $paid;

        return $this;
    }

    /**
     * Get paid
     *
     * @return integer 
     */
    public function getPaid()
    {
        return $this->paid;
    }

    /**
     * Set paidDate
     *
     * @param integer $paidDate
     * @return AccountDataView
     */
    public function setPaidDate($paidDate)
    {
        $this->paidDate = $paidDate;

        return $this;
    }

    /**
     * Get paidDate
     *
     * @return integer 
     */
    public function getPaidDate()
    {
        return $this->paidDate;
    }

    /**
     * Set totalMCost
     *
     * @param float $totalMCost
     * @return AccountDataView
     */
    public function setTotalMCost($totalMCost)
    {
        $this->totalMCost = $totalMCost;

        return $this;
    }

    /**
     * Get totalMCost
     *
     * @return float 
     */
    public function getTotalMCost()
    {
        return $this->totalMCost;
    }

    /**
     * Set totalACost
     *
     * @param float $totalACost
     * @return AccountDataView
     */
    public function setTotalACost($totalACost)
    {
        $this->totalACost = $totalACost;

        return $this;
    }

    /**
     * Get totalACost
     *
     * @return float 
     */
    public function getTotalACost()
    {
        return $this->totalACost;
    }

    /**
     * Set workAmount
     *
     * @param float $workAmount
     * @return AccountDataView
     */
    public function setWorkAmount($workAmount)
    {
        $this->workAmount = $workAmount;

        return $this;
    }

    /**
     * Get workAmount
     *
     * @return float 
     */
    public function getWorkAmount()
    {
        return $this->workAmount;
    }

    /**
     * Set paidAmount
     *
     * @param float $paidAmount
     * @return AccountDataView
     */
    public function setPaidAmount($paidAmount)
    {
        $this->paidAmount = $paidAmount;

        return $this;
    }

    /**
     * Get paidAmount
     *
     * @return float 
     */
    public function getPaidAmount()
    {
        return $this->paidAmount;
    }
}
