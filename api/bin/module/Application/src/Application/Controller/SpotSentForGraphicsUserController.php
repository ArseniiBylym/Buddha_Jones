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

  public function update($id, $data)
  {

    $spotLineStatusId = $this->_commonRepo->filterPostData($data, 'line_status_id', 'int');
    $graphicsStatusId = $this->_commonRepo->filterPostData($data, 'graphics_status_id', 'int');
    $noGraphics = $this->_commonRepo->filterPostData($data, 'no_graphics', 'boolean', null);
    $graphicsFiles = $this->_commonRepo->filterPostData($data, 'graphics_file', 'array', null);

    if ($graphicsFiles) {
      $graphicsFiles = array_map(function ($file) {
        $file['file_name'] = (!empty($file['file_name'])) ? $file['file_name'] : null;
        $file['file_description'] = (!empty($file['file_description'])) ? $file['file_description'] : null;
        $file['resend'] = (!empty($file['resend'])) ? $file['resend'] : null;

        return $file;
      }, $graphicsFiles);
    }


    $spotSent = $this->_spotSentRepository->find($id);

    if ($spotSent) {
      if ($spotLineStatusId) {
        $spotSent->setLineStatusId($spotLineStatusId);
      }

      if ($graphicsStatusId) {
        $spotSent->setLineStatusId($graphicsStatusId);
      }

      if ($noGraphics !== null) {
        $spotSent->setLineStatusId($noGraphics);
      }

      $this->_em->persist($spotSent);
      $this->_em->flush();

      if ($graphicsFiles !== null) {
        $existingFiles = $this->_rediSpotSentFile->findBy(array('spotSentId' => $id));

        foreach ($existingFiles as $existingFile) {
          $this->_em->remove($existingFile);
        }

        $this->_em->flush();

        foreach ($graphicsFiles as $file) {
          if (empty($file['file_name'])) {
            continue;
          }

          $spotSentFile = new RediSpotSentFile();
          $spotSentFile->setSpotSentId($id);
          $spotSentFile->setFileName($file['file_name']);
          $spotSentFile->setFileDescription($file['file_description']);
          $spotSentFile->setResend($file['resend']);
          $this->_em->persist($spotSentFile);
        }

        $this->_em->flush();
      }

      $response = array(
        'status' => 1,
        'message' => 'Project updated successfully.',
      );
    } else {
      $response = array(
        'status' => 0,
        'message' => 'Spot sent not found.',
      );
    }

    if (!$response['status']) {
      $this->getResponse()->setStatusCode(400);
    }

    return new JsonModel($response);
  }
}