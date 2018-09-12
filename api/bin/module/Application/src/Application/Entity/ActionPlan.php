<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ActionPlan
 *
 * @ORM\Table(name="action_plan", indexes={@ORM\Index(name="company_notes_thread_id", columns={"company_notes_thread_id"}), @ORM\Index(name="author_id", columns={"author_id"}), @ORM\Index(name="resolved", columns={"resolved"})})
 * @ORM\Entity
 */
class ActionPlan
{
    /**
     * @var integer
     *
     * @ORM\Column(name="action_plan_id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $actionPlanId;

    /**
     * @var string
     *
     * @ORM\Column(name="company_notes_thread_id", type="string", length=255, nullable=false)
     */
    private $companyNotesThreadId;

    /**
     * @var integer
     *
     * @ORM\Column(name="category_id", type="integer", nullable=false)
     */
    private $categoryId;

    /**
     * @var integer
     *
     * @ORM\Column(name="sub_category_id", type="integer", nullable=false)
     */
    private $subCategoryId;

    /**
     * @var integer
     *
     * @ORM\Column(name="author_id", type="integer", nullable=false)
     */
    private $authorId;

    /**
     * @var boolean
     *
     * @ORM\Column(name="resolved", type="boolean", nullable=false)
     */
    private $resolved;

    /**
     * @var integer
     *
     * @ORM\Column(name="date_created", type="integer", nullable=false)
     */
    private $dateCreated;

    /**
     * @var integer
     *
     * @ORM\Column(name="date_resolved", type="integer", nullable=false)
     */
    private $dateResolved;

    /**
     * @var integer
     *
     * @ORM\Column(name="date_updated", type="integer", nullable=false)
     */
    private $dateUpdated;

    /**
     * @var integer
     *
     * @ORM\Column(name="date_followup", type="integer", nullable=false)
     */
    private $dateFollowup;



    /**
     * Get actionPlanId
     *
     * @return integer 
     */
    public function getActionPlanId()
    {
        return $this->actionPlanId;
    }

    /**
     * Set companyNotesThreadId
     *
     * @param string $companyNotesThreadId
     * @return ActionPlan
     */
    public function setCompanyNotesThreadId($companyNotesThreadId)
    {
        $this->companyNotesThreadId = $companyNotesThreadId;

        return $this;
    }

    /**
     * Get companyNotesThreadId
     *
     * @return string 
     */
    public function getCompanyNotesThreadId()
    {
        return $this->companyNotesThreadId;
    }

    /**
     * Set categoryId
     *
     * @param integer $categoryId
     * @return ActionPlan
     */
    public function setCategoryId($categoryId)
    {
        $this->categoryId = $categoryId;

        return $this;
    }

    /**
     * Get categoryId
     *
     * @return integer 
     */
    public function getCategoryId()
    {
        return $this->categoryId;
    }

    /**
     * Set subCategoryId
     *
     * @param integer $subCategoryId
     * @return ActionPlan
     */
    public function setSubCategoryId($subCategoryId)
    {
        $this->subCategoryId = $subCategoryId;

        return $this;
    }

    /**
     * Get subCategoryId
     *
     * @return integer 
     */
    public function getSubCategoryId()
    {
        return $this->subCategoryId;
    }

    /**
     * Set authorId
     *
     * @param integer $authorId
     * @return ActionPlan
     */
    public function setAuthorId($authorId)
    {
        $this->authorId = $authorId;

        return $this;
    }

    /**
     * Get authorId
     *
     * @return integer 
     */
    public function getAuthorId()
    {
        return $this->authorId;
    }

    /**
     * Set resolved
     *
     * @param boolean $resolved
     * @return ActionPlan
     */
    public function setResolved($resolved)
    {
        $this->resolved = $resolved;

        return $this;
    }

    /**
     * Get resolved
     *
     * @return boolean 
     */
    public function getResolved()
    {
        return $this->resolved;
    }

    /**
     * Set dateCreated
     *
     * @param integer $dateCreated
     * @return ActionPlan
     */
    public function setDateCreated($dateCreated)
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    /**
     * Get dateCreated
     *
     * @return integer 
     */
    public function getDateCreated()
    {
        return $this->dateCreated;
    }

    /**
     * Set dateResolved
     *
     * @param integer $dateResolved
     * @return ActionPlan
     */
    public function setDateResolved($dateResolved)
    {
        $this->dateResolved = $dateResolved;

        return $this;
    }

    /**
     * Get dateResolved
     *
     * @return integer 
     */
    public function getDateResolved()
    {
        return $this->dateResolved;
    }

    /**
     * Set dateUpdated
     *
     * @param integer $dateUpdated
     * @return ActionPlan
     */
    public function setDateUpdated($dateUpdated)
    {
        $this->dateUpdated = $dateUpdated;

        return $this;
    }

    /**
     * Get dateUpdated
     *
     * @return integer 
     */
    public function getDateUpdated()
    {
        return $this->dateUpdated;
    }

    /**
     * Set dateFollowup
     *
     * @param integer $dateFollowup
     * @return ActionPlan
     */
    public function setDateFollowup($dateFollowup)
    {
        $this->dateFollowup = $dateFollowup;

        return $this;
    }

    /**
     * Get dateFollowup
     *
     * @return integer 
     */
    public function getDateFollowup()
    {
        return $this->dateFollowup;
    }
}
