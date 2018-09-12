<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ActionPlanCategory
 *
 * @ORM\Table(name="action_plan_category", indexes={@ORM\Index(name="parent_category_id", columns={"parent_category_id"})})
 * @ORM\Entity
 */
class ActionPlanCategory
{
    /**
     * @var integer
     *
     * @ORM\Column(name="action_plan_category_id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $actionPlanCategoryId;

    /**
     * @var integer
     *
     * @ORM\Column(name="parent_category_id", type="bigint", nullable=false)
     */
    private $parentCategoryId;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=false)
     */
    private $title;



    /**
     * Get actionPlanCategoryId
     *
     * @return integer 
     */
    public function getActionPlanCategoryId()
    {
        return $this->actionPlanCategoryId;
    }

    /**
     * Set parentCategoryId
     *
     * @param integer $parentCategoryId
     * @return ActionPlanCategory
     */
    public function setParentCategoryId($parentCategoryId)
    {
        $this->parentCategoryId = $parentCategoryId;

        return $this;
    }

    /**
     * Get parentCategoryId
     *
     * @return integer 
     */
    public function getParentCategoryId()
    {
        return $this->parentCategoryId;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return ActionPlanCategory
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }
}
