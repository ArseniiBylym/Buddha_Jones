<?php

namespace Application\Controller;

use Zend\View\Model\JsonModel;

class SpotSentValidateController extends CustomAbstractActionController
{
    public function create($data)
    {
        $filter['request_id'] = $this->_commonRepo->filterPostData($data, 'request_id', 'int', null);
        $filter['project_campaign_id'] = $this->_commonRepo->filterPostData($data, 'project_campaign_id', 'int', null);
        $filter['spot_id'] = $this->_commonRepo->filterPostData($data, 'spot_id', 'int', null);
        $filter['version_id'] = $this->_commonRepo->filterPostData($data, 'version_id', 'int', null);
        $filter['spot_sent_type'] = $this->_commonRepo->filterPostData($data, 'spot_sent_type', 'int', null);

        $check = $this->validateData($filter);

        if ($check['result']) {
            $response = array(
                'status' => 1,
                'message' => 'No existing spot sent found.',
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Existing spot sent found.',
                'data' => $check['data'],
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    private function validateData($filter)
    {
        $checkData = array(
            'projectCampaignId' => $filter['project_campaign_id'],
            'spotId' => $filter['spot_id'],
            'versionId' => $filter['version_id'],
        );

        if ($filter['spot_sent_type']) {
            $checkData['spotSentType'] = $filter['spot_sent_type'];
        }

        $check = $this->_spotSentRepository->findOneBy($checkData);

        if ($check && (!$filter['request_id'] || $filter['request_id'] !== $check->getRequestId())) {

            $editors = array();
            $editorIds = $check->getEditor();
            if (!empty($editorIds)) {
                $editorIds = explode(',', $editorIds);

                if (count($editorIds)) {
                    $editorIds = array_map('trim', $editorIds);
                    $editors = $this->_usersRepo->getUsersById($editorIds);
                }
            }

            $existingData = array(
                'requestId' => $check->getRequestId(),
                'spotSentId' => $check->getId(),
                'editors' => $editors,
                'createdAt' => $check->getCreatedAt(),
                'createdBy' => $this->_usersRepo->getUser($check->getCreatedBy()),
            );

            return array(
                "result" => false,
                "data" => $existingData,
            );
        }

        return array(
            "result" => true,
        );
    }
}
