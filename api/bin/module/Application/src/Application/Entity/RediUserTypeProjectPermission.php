<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediUserTypeProjectPermission
 *
 * @ORM\Table(name="redi_user_type_project_permission")
 * @ORM\Entity
 */
class RediUserTypeProjectPermission
{
    /**
     * @var integer
     *
     * @ORM\Column(name="user_type_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $userTypeId;

    /**
     * @var integer
     *
     * @ORM\Column(name="project_permission_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $projectPermissionId;

    /**
     * @var boolean
     *
     * @ORM\Column(name="can_view", type="boolean", nullable=true)
     */
    private $canView;

    /**
     * @var boolean
     *
     * @ORM\Column(name="can_edit", type="boolean", nullable=true)
     */
    private $canEdit;



    /**
     * Set userTypeId
     *
     * @param integer $userTypeId
     * @return RediUserTypeProjectPermission
     */
    public function setUserTypeId($userTypeId)
    {
        $this->userTypeId = $userTypeId;

        return $this;
    }

    /**
     * Get userTypeId
     *
     * @return integer 
     */
    public function getUserTypeId()
    {
        return $this->userTypeId;
    }

    /**
     * Set projectPermissionId
     *
     * @param integer $projectPermissionId
     * @return RediUserTypeProjectPermission
     */
    public function setProjectPermissionId($projectPermissionId)
    {
        $this->projectPermissionId = $projectPermissionId;

        return $this;
    }

    /**
     * Get projectPermissionId
     *
     * @return integer 
     */
    public function getProjectPermissionId()
    {
        return $this->projectPermissionId;
    }

    /**
     * Set canView
     *
     * @param boolean $canView
     * @return RediUserTypeProjectPermission
     */
    public function setCanView($canView)
    {
        $this->canView = $canView;

        return $this;
    }

    /**
     * Get canView
     *
     * @return boolean 
     */
    public function getCanView()
    {
        return $this->canView;
    }

    /**
     * Set canEdit
     *
     * @param boolean $canEdit
     * @return RediUserTypeProjectPermission
     */
    public function setCanEdit($canEdit)
    {
        $this->canEdit = $canEdit;

        return $this;
    }

    /**
     * Get canEdit
     *
     * @return boolean 
     */
    public function getCanEdit()
    {
        return $this->canEdit;
    }
}
