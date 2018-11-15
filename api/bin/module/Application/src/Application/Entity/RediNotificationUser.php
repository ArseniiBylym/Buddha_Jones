<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediNotificationUser
 *
 * @ORM\Table(name="redi_notification_user")
 * @ORM\Entity
 */
class RediNotificationUser
{
    /**
     * @var integer
     *
     * @ORM\Column(name="notification_id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $notificationId;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $userId;



    /**
     * Set notificationId
     *
     * @param integer $notificationId
     * @return RediNotificationUser
     */
    public function setNotificationId($notificationId)
    {
        $this->notificationId = $notificationId;

        return $this;
    }

    /**
     * Get notificationId
     *
     * @return integer 
     */
    public function getNotificationId()
    {
        return $this->notificationId;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     * @return RediNotificationUser
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
}
