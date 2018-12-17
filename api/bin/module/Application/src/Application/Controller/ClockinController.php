<?php

namespace Application\Controller;

use Application\Entity\RediBilling;
use Application\Entity\RediBillingActivity;
use Application\Entity\RediBillingApproval;
use Application\Entity\RediBillingEstimate;
use Application\Entity\RediEstimate;
use Application\Entity\RediEstimateToWorker;
use Application\Entity\RediTimeEntry;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;
use Application\Entity\RediUserClockin;

class ClockinController extends CustomAbstractActionController
{
  function create($data)
  {
    $now = new \DateTime('now');
    $checkUserClockinToday = $this->_usersRepo->getUserClockinByDate($this->_user_id, $now->format('Y-m-d'));

    if(!$checkUserClockinToday) {
      $now = new \DateTime('now');
      $clockin = new RediUserClockin();
      $clockin->setUserId($this->_user_id);
      $clockin->setClockin($now);

      $this->_em->persist($clockin);
      $this->_em->flush();
    }

    $response = array(
      'status' => 1,
      'message' => 'Request successful.',
    );

    return new JsonModel($response);
  }
}
