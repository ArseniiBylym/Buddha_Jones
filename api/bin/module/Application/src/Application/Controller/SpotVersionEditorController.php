<?php

namespace Application\Controller;

use Application\Entity\RediCampaign;
use Application\Entity\RediProjectCampaignManager;
use Application\Entity\RediProjectCampaignProducer;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediProjectToCampaign;
use Application\Entity\RediProjectToCampaignEditor;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class SpotVersionEditorController extends CustomAbstractActionController
{
  public function get($spotId)
  {
    $versionId = $this->params()->fromRoute('param1', 0);

    $canView = $this->_usersRepo->extractPermission($this->_user_permission, 12, 'view_or_edit');

    if ($canView) {
      $data = $this->_spotRepo->getSpotVersionEditorBySpotAndVersion($spotId, $versionId);

      $count = count($data);

      $response = array(
        'status' => 1,
        'message' => 'Request successful',
        'total_count' => $count,
        'object_count' => $count,
        'data' => $data
      );
    } else {
      $response = array(
        'status' => 0,
        'message' => 'Permission denied.'
      );
    }

    if ($response['status'] == 0) {
      $this->getResponse()->setStatusCode(400);
    }

    return new JsonModel($response);
  }
}
