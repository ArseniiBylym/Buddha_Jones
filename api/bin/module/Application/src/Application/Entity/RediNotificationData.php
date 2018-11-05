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
     * @ORM\Column(name="notificaton_id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $notificatonId;

    /**
     * @var string
     *
     * @ORM\Column(name="key", type="string", length=50, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $key;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="string", length=100, nullable=true)
     */
    private $value;



    /**
     * Set notificatonId
     *
     * @param integer $notificatonId
     * @return RediNotificationData
     */
    public function setNotificatonId($notificatonId)
    {
        $this->notificatonId = $notificatonId;

        return $this;
    }

    /**
     * Get notificatonId
     *
     * @return integer 
     */
    public function getNotificatonId()
    {
        return $this->notificatonId;
    }

    /**
     * Set key
     *
     * @param string $key
     * @return RediNotificationData
     */
    public function setKey($key)
    {
        $this->key = $key;

        return $this;
    }

    /**
     * Get key
     *
     * @return string 
     */
    public function getKey()
    {
        return $this->key;
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
