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

  public function create($key, $data, $notificationUserIds, $createdByUserId)
  {
    $messageData = $this->getFullMessageData($key, $data);

    if ($messageData) {
      $now = new \DateTime('now');
      $notification = new RediNotification();
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

      foreach($notificationUserIds as $userId) {
        $notificationUser = new RediNotificationUser();
        $notificationUser->setNotificationId($notificationId);
        $notificationUser->setUserId($userId);

        $this->_entityManager->persist($notificationUser);
      }

      $this->_entityManager->flush();
    }
  }

  public function getFullMessageData($name, $data)
  {
    $messageData = $this->getNotificationMessageByName($name);

    if ($messageData) {
      return array(
        "message" => $messageData['message'],
        "link" => $messageData['link'],
      );
    }

    return null;
  }

  public function getNotificationMessageByName($name)
  {
    $dql = "SELECT 
              nm
            FROM
              \Application\Entity\RediNotificationMessage nm
            WHERE nm.name = :name ";

    $query = $this->getEntityManager()->createQuery($dql);
    $query->setMaxResults(1);
    $query->setParameter('name', $name);
    $data = $query->getArrayResult();

    return (!empty($data[0])) ? $data[0] : null;
  }
}
