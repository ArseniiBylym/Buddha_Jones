<?php

namespace Application\Controller;

use Application\Entity\RediProjectHistory;
use Application\Entity\RediSpot;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class SpotSentListController extends CustomAbstractActionController
{
    public function getList()
    {
        $subModuleId = (int)trim($this->getRequest()->getQuery('sub_module_id', 0));

        $filter['current_user_id'] = $this->_user_id;
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));

        $checkSubModuleAccess = $this->_moduleRepo->checkUserSubModule($this->_user_type_id, $subModuleId);

        if ($checkSubModuleAccess) {
            if ($subModuleId == 1) { // initiate
                $filter['line_status_id'] = array(1);
            } else if ($subModuleId == 2) { // post spot sent
                $filter['line_status_id'] = array(2);
            } else if ($subModuleId == 3) { // Spot sent for finish
                $filter['line_status_id'] = array(3);
            } else if ($subModuleId == 4) { // Spots for Graphics
                $filter['graphics_status_id'] = array(1, 3);
            } else if ($subModuleId == 5) { // Spots for EDL
                $filter['graphics_status_id'] = array(2);
            } else if ($subModuleId == 6) { // Spot for Billing
                $filter['line_status_id'] = array(4);
                $filter['graphics_status_id'] = array(4);
            }

            $data = $this->_spotRepo->getSpotSentListTree($filter);

            $response = array(
                'status' => 1,
                'message' => 'Request Successful',
                'data' => $data,
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Permission denied. (Check if required param are sent (sub_module_id))',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function get($spotSentId)
    {
        $responseData = $this->_spotRepo->getSpotSentTreeById($spotSentId);

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

        if ($spotLineStatusId && $spotLineStatusId < 4) {
            $graphicsStatusId = null;
        } else if ($spotLineStatusId == 4 && !$graphicsStatusId) {
            $graphicsStatusId = 1;
        }

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
                $spotSent->setGraphicsStatusId($graphicsStatusId);
            }

            if ($noGraphics !== null) {
                $spotSent->setNoGraphics($noGraphics);
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
                'message' => 'Spot sent updated successfully.',
                'data' => $this->_spotRepo->getSpotSentTreeById($id),
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

    public function spotSentSubmissionPostProcess($spotSentId)
    {
        $spotSent = $this->_spotSentRepository->find($spotSentId);

        if (!$spotSent) {
            return;
        }

        // update all graphics resend field
        $checkIfNotResend = $this->_spotSentFileRepository->findOneBy(array('spotSentId' => $spotSentId, 'resend' => array(0, null)));

        if (!$checkIfNotResend) {
            $spotSent->setAllGraphicsResend(1);
            $this->_em->persist($spotSent);
        }

        $this->_em->flush();
    }
}