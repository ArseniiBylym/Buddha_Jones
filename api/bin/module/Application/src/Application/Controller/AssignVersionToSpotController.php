<?php

namespace Application\Controller;

use Application\Entity\RediProject;
use Application\Entity\RediProjectHistory;
use Application\Entity\RediSpotVersion;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;
use Application\Entity\RediSpotVersionEditor;

class AssignVersionToSpotController extends CustomAbstractActionController
{
    public function create($data)
    {
        $canEditSpotVersionStatus = $this->_usersRepo->extractPermission($this->_user_permission, 29, 'edit');
        $canEditSpotVersionNote = $this->_usersRepo->extractPermission($this->_user_permission, 30, 'edit');

        $versionId = (int)(isset($data['version_id']) ? trim($data['version_id']) : 0);
        $spotId = (int)(isset($data['spot_id']) ? trim($data['spot_id']) : 0);
        $versionStatusId = isset($data['version_status_id']) ? trim($data['version_status_id']) : null;
        $versionNote = isset($data['version_note']) ? trim($data['version_note']) : null;
        $editors = isset($data['editors']) ? trim($data['editors']) : null;
        $editors = array_unique((array)json_decode($editors, true));

        if ($versionId && $spotId) {
            $version = $this->_versionRepository->find($versionId);

            if ($version) {
                $spot = $this->_spotRepository->find($spotId);

                if ($spot) {
                    $existingSpotVersion = $this->_spotVersionRepository->findOneBy(array('spotId' => $spotId, 'versionId' => $versionId));

                    if(!$existingSpotVersion) {
                        $existingSpotVersion = new RediSpotVersion();
                        $existingSpotVersion->setVersionId($versionId);
                        $existingSpotVersion->setSpotId($spotId);

                        if($spot->getProjectCampaignId()) {
                            // project history
                            $projectCampaign = $this->_projectToCampaignRepository->find($spot->getProjectCampaignId());
                            $historyMessage = 'Version "' . $version->getVersionName() . '" was added to spot "' . $spot->getSpotName() . '"';
                            $projectHistory = new RediProjectHistory();
                            $projectHistory->setProjectId($projectCampaign->getProjectId());
                            $projectHistory->setCampaignId($projectCampaign->getCampaignId());
                            $projectHistory->setUserId($this->_user_id);
                            $projectHistory->setMessage($historyMessage);
                            $projectHistory->setCreatedAt(new \DateTime('now'));
                            $this->_em->persist($projectHistory);
                        }
                    }

                    if($canEditSpotVersionStatus && $versionStatusId !== null) {
                        $existingSpotVersion->setVersionStatusId($versionStatusId);
                    }

                    if($canEditSpotVersionNote && $versionNote !== null) {
                        $existingSpotVersion->setVersionNote($versionNote);
                    }

                    $this->_em->persist($existingSpotVersion);
                    $this->_em->flush();

                    $spotVersionId = $existingSpotVersion->getId();

                    if (count($editors)) {
                        $spotVersionEditors = $this->_spotVersionEditorRepository->findBy(array('spotVersionId' => $spotVersionId));

                        foreach ($spotVersionEditors as $spotVersionEditor) {
                            $this->_em->remove($spotVersionEditor);
                        }

                        $this->_em->flush();
                        
                        foreach($editors as $editorId) {
                            $spotVersionEditor = new RediSpotVersionEditor();
                            $spotVersionEditor->setSpotVersionId($spotVersionId);
                            $spotVersionEditor->setUserId($editorId);
                            $this->_em->persist($spotVersionEditor);
                        }

                        $this->_em->flush();
                    }

                    $response = array(
                        'status' => 1,
                        'message' => 'Request successful.'
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Spot not found.'
                    );
                }
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Version not found.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(version_id, spot_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function delete($versionId)
    {
        $spotId = $this->params()->fromRoute('param1', 0);

        if ($versionId && $spotId) {
            $version = $this->_versionRepository->find($versionId);

            if ($version) {
                $spot = $this->_spotRepository->find($spotId);

                if ($spot) {
                    $existingSpotVersion = $this->_spotVersionRepository->findOneBy(array('spotId' => $spotId, 'versionId' => $versionId));
                    
                    if($existingSpotVersion) {
                        $spotVersionId = $existingSpotVersion->getId();
                        $this->_em->remove($existingSpotVersion);

                        // project history
                        $projectCampaign = $this->_projectToCampaignRepository->find($spot->getProjectCampaignId());
                        $historyMessage = 'Version "' . $version->getVersionName() . '" was removed from spot "' . $spot->getSpotName(). '"';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($projectCampaign->getProjectId());
                        $projectHistory->setCampaignId($projectCampaign->getCampaignId());
                        $projectHistory->setUserId($this->_user_id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);

                        $spotVersionEditors = $this->_spotVersionEditorRepository->findBy(array('spotVersionId' => $spotVersionId));

                        foreach ($spotVersionEditors as $spotVersionEditor) {
                            $this->_em->remove($spotVersionEditor);
                        }

                        $this->_em->flush();
                    }

                    $response = array(
                        'status' => 1,
                        'message' => 'Request successful.'
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'Spot not found.'
                    );
                }
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Version not found.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(version_id, spot_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

}
