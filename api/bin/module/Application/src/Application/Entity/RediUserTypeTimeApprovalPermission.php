<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediUserTypeTimeApprovalPermission
 *
 * @ORM\Table(name="redi_user_type_time_approval_permission")
 * @ORM\Entity
 */
class RediUserTypeTimeApprovalPermission
{
    /**
     * @var integer
     *
     * @ORM\Column(name="approver_user_type_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $approverUserTypeId;

    /**
     * @var integer
     *
     * @ORM\Column(name="submitting_user_type_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $submittingUserTypeId;



    /**
     * Set approverUserTypeId
     *
     * @param integer $approverUserTypeId
     * @return RediUserTypeTimeApprovalPermission
     */
    public function setApproverUserTypeId($approverUserTypeId)
    {
        $this->approverUserTypeId = $approverUserTypeId;

        return $this;
    }

    /**
     * Get approverUserTypeId
     *
     * @return integer 
     */
    public function getApproverUserTypeId()
    {
        return $this->approverUserTypeId;
    }

    /**
     * Set submittingUserTypeId
     *
     * @param integer $submittingUserTypeId
     * @return RediUserTypeTimeApprovalPermission
     */
    public function setSubmittingUserTypeId($submittingUserTypeId)
    {
        $this->submittingUserTypeId = $submittingUserTypeId;

        return $this;
    }

    /**
     * Get submittingUserTypeId
     *
     * @return integer 
     */
    public function getSubmittingUserTypeId()
    {
        return $this->submittingUserTypeId;
    }
}
