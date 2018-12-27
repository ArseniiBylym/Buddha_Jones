<?php
namespace Application\Controller;

use Zend\View\Model\JsonModel;

class SpotSentForGraphicsUserController extends CustomAbstractActionController
{
  public function get($spotSentId)
  {
    $responseData = $this->_spotRepo->getSpotSentForGraphicsById($spotSentId);

    if (count($responseData)) {
      $response = array(
        'status' => 1,
        'message' => "Request successful",
        'data' => $responseData
      );
    } else {
      $response = array(
        'status' => 0,
        'message' => 'Spot sent not found'
      );
    }


    if ($response['status'] == 0) {
      $this->getResponse()->setStatusCode(400);
    }

    return new JsonModel($response);
  }
}