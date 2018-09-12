<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ActionPlanHistory
 *
 * @ORM\Table(name="action_plan_history", indexes={@ORM\Index(name="action_plan_id", columns={"action_plan_id"}), @ORM\Index(name="user_id", columns={"user_id"}), @ORM\Index(name="action", columns={"action"})})
 * @ORM\Entity
 */
class ActionPlanHistory
{
    /**
     * @var integer
     *
     * @ORM\Column(name="action_plan_history_id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $actionPlanHistoryId;

    /**
     * @var integer
     *
     * @ORM\Column(name="action_plan_id", type="bigint", nullable=false)
     */
    private $actionPlanId;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     */
    private $userId;

    /**
     * @var string
     *
     * @ORM\Column(name="action", type="string", length=150, nullable=false)
     */
    private $action;

    /**
     * @var string
     *
     * @ORM\Column(name="action_value", type="string", length=255, nullable=false)
     */
    private $actionValue;

    /**
     * @var integer
     *
     * @ORM\Column(name="date_performed", type="integer", nullable=false)
     */
    private $datePerformed;



    /**
     * Get actionPlanHistoryId
     *
     * @return integer 
     */
    public function getActionPlanHistoryId()
    {
        return $this->actionPlanHistoryId;
    }

    /**
     * Set actionPlanId
     *
     * @param integer $actionPlanId
     * @return ActionPlanHistory
     */
    public function setActionPlanId($actionPlanId)
    {
        $this->actionPlanId = $actionPlanId;

        return $this;
    }

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
     * Set userId
     *
     * @param integer $userId
     * @return ActionPlanHistory
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
     * Set action
     *
     * @param string $action
     * @return ActionPlanHistory
     */
    public function setAction($action)
    {
        $this->action = $action;

        return $this;
    }

    /**
     * Get action
     *
     * @return string 
     */
    public function getAction()
    {
        return $this->action;
    }

    /**
     * Set actionValue
     *
     * @param string $actionValue
     * @return ActionPlanHistory
     */
    public function setActionValue($actionValue)
    {
        $this->actionValue = $actionValue;

        return $this;
    }

    /**
     * Get actionValue
     *
     * @return string 
     */
    public function getActionValue()
    {
        return $this->actionValue;
    }

    /**
     * Set datePerformed
     *
     * @param integer $datePerformed
     * @return ActionPlanHistory
     */
    public function setDatePerformed($datePerformed)
    {
        $this->datePerformed = $datePerformed;

        return $this;
    }

    /**
     * Get datePerformed
     *
     * @return integer 
     */
    public function getDatePerformed()
    {
        return $this->datePerformed;
    }
}
