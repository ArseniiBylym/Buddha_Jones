<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;
use Application\Entity\RediNotification;
use Application\Entity\RediNotificationData;
use Application\Entity\RediNotificationUser;

class NotificationRepository extends EntityRepository
{
  private $_className = "\Application\Entity\RediNotification";
  private $_entityManager;

  public function __construct(EntityManager $entityManager)
  {
    $this->_entityManager = $entityManager;
    $classMetaData = $entityManager->getClassMetadata($this->_className);
    parent::__construct($entityManager, $classMetaData);
  }

  public function searchNotification($filter = array())
  {

  }

  public function searchNotificationCount($filter = array())
  {

  }

  /**
   * Create notification
   *
   * @param string $key
   * @param array $data
   * @param array $notificationUserIds
   * @param int $createdByUserId
   * @return void
   */
  public function create($key, $data, $notificationUserIds, $createdByUserId)
  {
    try {
      $messageData = $this->getFullMessageData($key, $data);

      if ($messageData) {
        $now = new \DateTime('now');
        $notification = new RediNotification();
        $notification->setMessageTypeId($messageData['typeId']);
        $notification->setMessage($messageData['message']);
        $notification->setLink($messageData['link']);
        $notification->setComplete(0);
        $notification->setCreatedby($createdByUserId);
        $notification->setCreatedAt($now);
        $this->_entityManager->persist($notification);
        $this->_entityManager->flush();

        $notificationId = $notification->getId();

        foreach ($data as $key => $value) {
          $notificationData = new RediNotificationData();
          $notificationData->setNotificatonId($notificationId);
          $notificationData->setName($key);
          $notificationData->setValue($value);

          $this->_entityManager->persist($notificationData);
        }

        foreach ($notificationUserIds as $userId) {
          $notificationUser = new RediNotificationUser();
          $notificationUser->setNotificationId($notificationId);
          $notificationUser->setUserId($userId);

          $this->_entityManager->persist($notificationUser);
        }

        $this->_entityManager->flush();
      }
    } catch (\Exception $e) {
      // do something when exception occures
      echo $e->getMessage(); exit;
    }
  }

  /**
   * Get full message and link from general structured message
   *
   * @param string $name
   * @param array $data
   * @return void
   */
  public function getFullMessageData($name, $data)
  {
    $messageData = $this->getNotificationMessageTypeByName($name);

    if ($messageData) {
      // check if message data valid
      $params = $messageData['params'];
      $message = $messageData['message'];
      $link = $messageData['link'];
      $typeId = $messageData['id'];

      if ($params) {
        $params = json_decode($params, true);

        if ($params) {
          $paramsNotProvided = array_filter($params, function ($param, $paramKey) use ($data) {
            return (!$param || !isset($data[$paramKey]));
          }, ARRAY_FILTER_USE_BOTH);

          if (count($paramsNotProvided)) {
            throw new \Exception('Required parameter not provided for notification message type: ' . json_encode($paramsNotProvided));
          }
        }
      }
      foreach ($data as $key => $value) {
        $value = trim($value);
        if ($message) {
          $message = str_replace("#{" . $key . "}", $value, $message);
        }

        if ($link) {
          $link = str_replace("#{" . $key . "}", $value, $link);
        }
      }

      return array(
        "typeId" => $typeId,
        "message" => $message,
        "link" => $link,
      );
    }

    return null;
  }

  public function getNotificationMessageTypeByName($name)
  {
    $dql = "SELECT 
              nm
            FROM
              \Application\Entity\RediNotificationMessageType nm
            WHERE nm.name = :name ";

    $query = $this->getEntityManager()->createQuery($dql);
    $query->setMaxResults(1);
    $query->setParameter('name', $name);
    $data = $query->getArrayResult();

    return (!empty($data[0])) ? $data[0] : null;
  }
}
