<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediNotificationData
 *
 * @ORM\Table(name="redi_notification_data")
 * @ORM\Entity
 */
class RediNotificationData
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="string", length=100, nullable=true)
     */
    private $value;



    /**
     * Set notificationId
     *
     * @param integer $notificationId
     * @return RediNotificationData
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
     * Set name
     *
     * @param string $name
     * @return RediNotificationData
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set value
     *
     * @param string $value
     * @return RediNotificationData
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return string 
     */
    public function getValue()
    {
        return $this->value;
    }
}
