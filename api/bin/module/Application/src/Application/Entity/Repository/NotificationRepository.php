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

  /**
   * search notification and get list and count
   *
   * @param array $filter
   * @param integer $offset
   * @param integer $length
   * @return void
   */
  public function search($filter = array(), $offset = 0, $length = 10)
  {
    $dataColumns = " n ";
    $countColumns = " COUNT(DISTINCT n.id) AS total_count ";
    $dqlFilter = [];
    $dqlParam = [];

    $dql = "SELECT 
                %s
              FROM \Application\Entity\RediNotification n
              INNER JOIN \Application\Entity\RediNotificationMessageType nmt
                WITH nmt.id = n.messageTypeId
              LEFT JOIN \Application\Entity\RediNotificationUser nu
                WITH nu.notificationId = n.id 
              LEFT JOIN \Application\Entity\RediNotificationData nd
                WITH nd.notificationId = n.id";

    if (!empty($filter['user_type_id'])) {
      $dqlParam['user_type_id'] = $filter['user_type_id'];
      $dqlFilter[] = " nu.userTypeId = :user_type_id ";
    }

    if (!empty($filter['user_id'])) {
      $dqlParam['user_id'] = $filter['user_id'];
      $dqlFilter[] = " nu.userId = :user_id ";
    }

    if (isset($filter['confirm'])) {
      $dqlParam['confirm'] = $filter['confirm'];
      $dqlFilter[] = " n.confirm = :confirm ";
    }

    if (isset($filter['message_type_name'])) {
      $dqlParam['message_type_name'] = $filter['message_type_name'];
      $dqlFilter[] = " nmt.name = :message_type_name ";
    }

    if (isset($filter['data']) && is_array($filter['data'])) {
      foreach ($filter['data'] as $key => $value) {
        $dqlParam["data_name_" . $key] = $key;
        $dqlParam["data_value_" . $key] = $value;
        $dqlFilter[] = " (nd.name = :data_name_" . $key . " AND nd.value = :data_value_" . $key . ") ";
      }
    }

    if (count($dqlFilter)) {
      $dql .= " WHERE " . implode(" AND ", $dqlFilter);
    }

    $result = [
      'data' => null,
      'count' => null,
    ];
    if (!isset($filter['get_data']) || !empty($filter['get_data'])) {
      $dataQuery = $this->getEntityManager()->createQuery(sprintf(
        $dql . " GROUP BY n.id
        ORDER BY n.id DESC ",
        $dataColumns
      ));

      foreach ($dqlParam as $key => $value) {
        $dataQuery->setParameter($key, $value);
      }

      $result['data'] = $dataQuery->getArrayResult();

      if (!empty($filter['get_details'])) {
        $ids = array_column($result['data'], 'id');
        $notificationData = $this->getNotificationData($ids);

        $result['data'] = array_map(function ($row) use ($notificationData) {
          $row['data'] = (!empty($notificationData[$row['id']])) ? $notificationData[$row['id']] : array();
          return $row;
        }, $result['data']);
      }
    }

    if (!isset($filter['get_count']) || !empty($filter['get_count'])) {
      $countQuery = $this->getEntityManager()->createQuery(sprintf($dql, $countColumns));

      foreach ($dqlParam as $key => $value) {
        $countQuery->setParameter($key, $value);
      }

      $countResult = $countQuery->getArrayResult();
      $result['count'] = (isset($countResult[0]['total_count']) ? (int)$countResult[0]['total_count'] : 0);
    }

    return $result;
  }

  /**
   * get notification data
   *
   * @param array $ids
   * @return array
   */
  public function getNotificationData($ids)
  {
    $ids = (array($ids));

    if (!$ids) {
      return array();
    }

    $dql = "SELECT 
              nd
            FROM
              \Application\Entity\RediNotificationData nd
            WHERE nd.notificationId IN (:notification_ids) ";

    $query = $this->getEntityManager()->createQuery($dql);
    $query->setParameter('notification_ids', $ids, \Doctrine\DBAL\Connection::PARAM_INT_ARRAY);
    $data = $query->getArrayResult();

    $result = array();

    foreach ($data as $row) {
      $result[$row['notificationId']][] = $row;
    }

    return $result;
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
  public function create($key, $data, $notificationUserTypeIds, $notificationUserIds, $createdByUserId = 0)
  {
    try {
      $messageData = $this->getFullMessageData($key, $data);

      if ($messageData) {
        $now = new \DateTime('now');
        $notification = new RediNotification();
        $notification->setMessageTypeId($messageData['typeId']);
        $notification->setMessage($messageData['message']);
        $notification->setLink($messageData['link']);
        $notification->setConfirm(0);
        $notification->setCreatedby($createdByUserId);
        $notification->setCreatedAt($now);
        $this->_entityManager->persist($notification);
        $this->_entityManager->flush();

        $notificationId = $notification->getId();

        foreach ($data as $key => $value) {
          $notificationData = new RediNotificationData();
          $notificationData->setNotificationId($notificationId);
          $notificationData->setName($key);
          $notificationData->setValue($value);

          $this->_entityManager->persist($notificationData);
        }

        if ($notificationUserTypeIds) {
          foreach ($notificationUserTypeIds as $userTypeId) {
            $notificationUser = new RediNotificationUser();
            $notificationUser->setNotificationId($notificationId);
            $notificationUser->setUserTypeId($userTypeId);
            $notificationUser->setUserId(0);

            $this->_entityManager->persist($notificationUser);
          }
        }

        if ($notificationUserIds) {
          foreach ($notificationUserIds as $userId) {
            $notificationUser = new RediNotificationUser();
            $notificationUser->setNotificationId($notificationId);
            $notificationUser->setUserTypeId(0);
            $notificationUser->setUserId($userId);

            $this->_entityManager->persist($notificationUser);
          }
        }

        $this->_entityManager->flush();
      }
    } catch (\Exception $e) {
      // do something when exception occures
      // echo $e->getMessage();
      // exit;
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
            return ($param === true && empty($data[$paramKey])); //|| (!$param || !isset($data[$paramKey]));
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

  /**
   * Send spot sent notification
   * for all spot sent under a request id
   *
   * @param int $spotSentRequestId Spot sent request ID
   * @return void
   */
  public function sendSpotSentNoficationByRequestId($spotSentRequestId, $createdByUserId = 0)
  {
    // get all spot sent row id
    $dql = "SELECT 
              sc.id AS spotSentId
            FROM \Application\Entity\RediSpotSent sc
            WHERE sc.requestId = :request_id";

        $query = $this->getEntityManager()->createQuery($dql);
        $query->setParameter("request_id", $spotSentRequestId);

        $result = $query->getArrayResult();

        foreach ($result as $row) {
          $this->sendSpotSentNoficationById($row['spotSentId'], $createdByUserId);
        }
  }

  /**
   * Send spot notification for a spot sent id
   *
   * @param int $spotSentId Spot sent id
   * @return void
   */
  public function sendSpotSentNoficationById($spotSentId, $createdByUserId = 0)
  {
    $spotRepo = new SpotRepository($this->_entityManager);
    $spotSent = $spotRepo->getSpotSentTreeById($spotSentId);

    if ($spotSent && !empty($spotSent['spotLineStatusId'])) {
      $spotLineStatusId = (int)$spotSent['spotLineStatusId'];
      $spotSentId = (int)$spotSent['spotSentId'];
      $messageTypeName = null;
      $userTypeIds = array();
      $userIds = array();

      /**
       * When Ready to be sent is checked and Finish Request IS NOT CHECKED – User type 3, 23 will get an ALERT.  LineStatus = 2
       * If Finish Request is also checked, then all below user types will get Alert 3,4,9,13,18,23
       */
      if ($spotLineStatusId == 2) {
        $messageTypeName = 'spot_sent_notify_sent_to_post';

        if (!empty($spotSent['finishRequest'])) {
          $userTypeIds = array(3, 4, 9, 13, 19, 23);
        } else {
          $userTypeIds = array(3, 23);
        }
      }

      if ($messageTypeName) {
        // check if there is already any unconfirmed message
        // if not then add a message for that user
          $checkMessage = $this->search(array(
            'type_name' => $messageTypeName,
            'data' => array(
              'spotSentId' => $spotSentId,
            )
          ), 0, 1);

          if (empty($checkMessage['data'])) {
            $data = array(
              "spotSentId" => $spotSentId,
              "spotLineStatusId" => $spotLineStatusId,
              "projectId" => $spotSent["projectId"],
              "projectName" => $spotSent["projectName"],
              "campaignId" => $spotSent["campaignId"],
              "campaignName" => $spotSent["campaignName"],
              "studioId" => $spotSent["studioId"],
              "studioName" => $spotSent["studioName"],
              "spotId" => $spotSent["spotId"],
              "spotName" => $spotSent["spotName"],
              "versionId" => $spotSent["versionId"],
              "versionName" => $spotSent["versionName"]
            );

            $this->create($messageTypeName, $data, $userTypeIds, array(), $createdByUserId);
          }
      }
    }
  }
}
