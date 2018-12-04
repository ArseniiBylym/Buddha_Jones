<?php

namespace Application\Controller;

use Application\Entity\RediProjectHistory;
use Application\Entity\RediSpot;
use Zend\View\Model\JsonModel;
use League\Csv\Reader;

use Application\Entity\RediCcStatement;
use Application\Entity\RediCcStatementLine;

class SpotBillingController extends CustomAbstractActionController
{
    public function get($spotId)
    {

        $isBillingUser = $this->_usersRepo->isBillingUser($this->_user_id);

        if ($isBillingUser) {
            $spotInfo = $this->getSpotInfo($spotId);

            if ($spotInfo) {
                $projectCampaign = $this->_projectToCampaignRepository->find($spotInfo['projectCampaignId']);

                // get non billable project time
                $spotInfo['nonBillableProjectActivity'] = $this->_timeEntryRepo->getNonBillableTimeEntryOfProject($projectCampaign->getProjectId());
                
                // get non billable campaign time                
                $spotInfo['nonBillableCamapignActivity'] = $this->_timeEntryRepo->getNonBillableTimeEntryOfCampaign($projectCampaign->getCampaignId());


                // list of time entries
                $spotInfo['timeEntry'] = array();
                $timeEntry = $this->_timeEntryRepo->getTimeEntryForBillingBySpotId($spotId);

                foreach ($timeEntry as $row) {
                    $spotInfo['timeEntry'][$row['date']][] = $row;
                }

                $response = array(
                    'status' => 1,
                    'message' => 'Request successful',
                    'data' => $spotInfo
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
                'message' => 'Permission denied.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    private function getSpotInfo($spotId)
    {
        $data = $this->_spotRepo->getById($spotId);

        if ($data) {
            $projectCampaign = $this->_projectToCampaignRepository->find($data['projectCampaignId']);

            if (isset($data['id'])) {
                $data['id'] = (int)$data['id'];
            }

            if ($projectCampaign) {
                $data['projectId'] = $projectCampaign->getProjectId();
                $data['campaignId'] = $projectCampaign->getCampaignId();
            }

            if (!empty($data['projectId'])) {
                $projectName = $this->_projectRepo->getProjectName($data['projectId'], $this->_user_type_id, true);
                $data = array_merge($data, $projectName);

                // studio data
                $project = $this->_projectRepository->find($data['projectId']);
                
                if ($project) {
                    $data['studioId'] = $project->getStudioId();

                    $studio = $this->_studioRepository->find($project->getStudioId());

                    if($studio) {
                        $data['studioName'] = $studio->getStudioName();
                    }
                }
            }

            if (!empty($data['campaignId'])) {
                $campaign = $this->_campaignRepository->find($data['campaignId']);

                if ($campaign) {
                    $data['campaignName'] = $campaign->getCampaignName();
                }
            }

                // if(!$canViewFirstRevisionCost) {
                //     unset($data['firstRevisionCost']);
                //     unset($data['billingType']);
                //     unset($data['billingNote']);
                // }

                // if(!$canViewInternalDeadline) {
                //     unset($data['internalDeadline']);
                // }

                // if(!$canViewClientDeadline) {
                //     unset($data['clientDeadline']);
                // }

                // if(!$canViewSpotRevision) {
                //     unset($data['revisions']);
                // }

                // if(!$canViewSpotGraphicsRevision) {
                //     unset($data['graphicsRevisions']);
                // }
        }

        return $data;
    }
}
