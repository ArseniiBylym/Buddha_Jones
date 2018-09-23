<?php

namespace Application\Controller;

use Application\Entity\RediProjectHistory;
use Application\Entity\RediSpotVersion;
use Application\Entity\RediVersion;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class VersionController extends CustomAbstractActionController
{
    public function getList()
    {
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $filter['spot_id'] = (int)trim($this->getRequest()->getQuery('spot_id', 0));
        $filter['custom'] = trim($this->getRequest()->getQuery('custom', ''));
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));

        if($filter['custom']=='') {
            $filter['custom'] = null;
        } else {
            $filter['custom'] = (int)$filter['custom'];
        }

        if ($filter['spot_id']) {
            $data = $this->_versionRepo->searchWithSpot($filter, $offset, $length);
            $totalCount = $this->_versionRepo->searchCountWithSpot($filter);
        } else {
            $data = $this->_versionRepo->search($filter, $offset, $length);
            $totalCount = $this->_versionRepo->searchCount($filter);
        }

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data
        );


        return new JsonModel($response);
    }

    public function create($data)
    {
        $name = trim(isset($data['name']) ? $data['name'] : '');
        $billType = isset($data['billing_type']) ? $data['billing_type'] : null;
        $spotId = isset($data['spot_id']) ? $data['spot_id'] : null;
        $custom = isset($data['custom']) ? $data['custom'] : null;

        // if user is super user then it will be standard
        // if user is not super user then it will be custom
        $custom = ($this->_user_type_id == 100 && $custom!==null)?(int)$custom:1;

        $spotId = (array)json_decode($spotId, true);

        if ($name) {
            // check for unique name
            $existingVersion = $this->_versionRepository->findOneBy(array('versionName' => $name));

            if($existingVersion) {
                $response = array(
                    'status' => 1,
                    'message' => 'Version with the same name already exists, returning existing version.',
                    'data' => array(
                        'version' => array(
                            'id' => $existingVersion->getId(),
                            'versionName' => $existingVersion->getVersionName(),
                            'custom' => $existingVersion->getCustom(),
                        )
                    )
                );
            } else {
                $version = new RediVersion();
                $version->setVersionName($name);
                $version->setCustom($custom);
                $version->setActive(1);
                $version->setCreatedUserId($this->_user_id);
                $version->setCreatedAt(new \DateTime('now'));
                $this->_em->persist($version);
                $this->_em->flush();

                $versionId = $version->getId();

                foreach ($spotId as $sId) {
                    $spot = $this->_spotRepository->find($sId);

                    if ($spot) {
                        $spotVersion = new RediSpotVersion();
                        $spotVersion->setSpotId($sId);
                        $spotVersion->setVersionId($versionId);
                        $spotVersion->setBillingType($billType);

                        $this->_em->persist($spotVersion);

                        // project history
                        $campaign = $this->_campaignRepository->find($spot->getCampaignId());
                        $historyMessage = 'Version "' . $name . '" was added to spot"' . $spot->getSpotName() . '" from "' . $campaign->getCampaignName() . '" campaign';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($spot->getProjectId());
                        $projectHistory->setUserId($this->_user_id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);
                    }
                }

                $this->_em->flush();

                $data = array_merge($this->getSingle($versionId), array(
                    'id' => $versionId,
                    'versionName' => $name,
                    'custom' => $custom,
                ));

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $data,
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(name).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($id, $data)
    {
        $name = trim(isset($data['name']) ? $data['name'] : '');
        $billType = isset($data['billing_type']) ? $data['billing_type'] : null;
        $spotId = isset($data['spot_id']) ? $data['spot_id'] : null;
        $custom = isset($data['custom']) ? $data['custom'] : null;

        // if user is super user then it will be standard
        // if user is not super user then it will be custom
        $custom = ($this->_user_type_id == 100 && $custom!==null)?(int)$custom:null;

        $spotId = (array)json_decode($spotId, true);

        if ($id) {
            $version = $this->_versionRepository->find($id);

            if($version) {
                if($name) {
                    // check for unique name
                    $existingVersion = $this->_versionRepository->findOneBy(array('versionName' => $name));

                    if(!$existingVersion || $existingVersion->getId() != $id) {
                        // check if version is already used for any time entry or not
                        $versionExistsInTimeEntry = $this->_timeEntryFileRepository->findOneBy(array('id' => $id));

                        if(!$versionExistsInTimeEntry) {
                            $version->setVersionName($name);
                        }
                    }
                }

                if($custom !== null) {
                    $version->setCustom($custom);
                }

                $version->setUpdatedUserId($this->_user_id);
                $version->setUpdatedAt(new \DateTime('now'));
                $this->_em->persist($version);
                $this->_em->flush();

                $versionId = $version->getId();

                foreach ($spotId as $sId) {
                    $spot = $this->_spotRepository->find($sId);

                    if ($spot) {
                        $spotVersion = new RediSpotVersion();
                        $spotVersion->setSpotId($sId);
                        $spotVersion->setVersionId($versionId);
                        $spotVersion->setBillingType($billType);

                        $this->_em->persist($spotVersion);

                        // project history
                        $campaign = $this->_campaignRepository->find($spot->getCampaignId());
                        $historyMessage = 'Version "' . $name . '" was added to spot"' . $spot->getSpotName() . '" from "' . $campaign->getCampaignName() . '" campaign';
                        $projectHistory = new RediProjectHistory();
                        $projectHistory->setProjectId($spot->getProjectId());
                        $projectHistory->setUserId($this->_user_id);
                        $projectHistory->setMessage($historyMessage);
                        $projectHistory->setCreatedAt(new \DateTime('now'));
                        $this->_em->persist($projectHistory);
                    }
                }

                $this->_em->flush();

                $data = array_merge($this->getSingle($id), array(
                    'version_id' => (int)$id,
                ));

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful.',
                    'data' => $data,
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Version does not exist.'
                );
            }
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data(id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function delete($id)
    {
        $version = $this->_versionRepository->find($id);

        if($version) {
            // check if version exist in time entry
            $versionExistsInTimeEntry = $this->_timeEntryRepository->findOneBy(array('versionId' => $id));

            if(!$versionExistsInTimeEntry) {
                $spotVersions = $this->_spotVersionRepository->findBy(array('versionId' => $id));

                foreach($spotVersions as $spotVersion) {
                    $this->_em->remove($spotVersion);
                }

                $this->_em->remove($version);

                $this->_em->flush();

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful',
                );
            } else {
                $response = array(
                    'status' => 0,
                    'message' => 'Can not delete version as it is already used in time entry',
                );
            }

        } else {
            $response = array(
                'status' => 0,
                'message' => 'Version does not exist',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    private function getSingle($id) {
        $filter = array(
            'id' => $id,
        );

        $data = $this->_versionRepo->search($filter, 0, 1);

        return (count($data)) ? $data[0] : null;
    }
}
