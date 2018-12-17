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
use Application\Entity\RediBillingLine;

class BillingController extends CustomAbstractActionController
{
    public function getList()
    {
        $offset = (int)trim($this->getRequest()->getQuery('offset', 0));
        $length = (int)trim($this->getRequest()->getQuery('length', 10));

        $filter['sort'] = trim($this->getRequest()->getQuery('sort', ''));
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $filter['project_id'] = (int)trim($this->getRequest()->getQuery('project_id', 0));
        $filter['campaign_id'] = (int)trim($this->getRequest()->getQuery('campaign_id', 0));
        $filter['status_id'] = (int)trim($this->getRequest()->getQuery('status_id', 0));
        $filter['customer_id'] = (int)trim($this->getRequest()->getQuery('customer_id', 0));
        $filter['approver_id'] = (int)trim($this->getRequest()->getQuery('approver_id', 0));
        $filter['approver_status'] = $this->getRequest()->getQuery('approver_status', null);

        $data = $this->_billingRepo->search($offset, $length, $filter);
        $totalCount = $this->_billingRepo->searchCount($filter);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data
        );


        return new JsonModel($response);
    }

    public function get($billId)
    {
        $data = $this->getSingle($billId);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data
        );

        return new JsonModel($response);
    }

    function create($data)
    {
        $projectCampaignId = (int)trim(isset($data['project_campaign_id']) ? $data['project_campaign_id'] : 0);

        // project campaign
        $projectCampaign = $this->_projectCampaignRepository->find($projectCampaignId);

        if ($projectCampaign) {
            $billId = $this->_billingRepo->getUnusedBillingId($this->_user_id, $projectCampaignId);

            if (!$billId) {
                $now = new \DateTime('now');

                // get customerId
                $customerId = $projectCampaign->getCustomerId();

                $billing = new RediBilling();
                $billing->setUserId($this->_user_id);
                $billing->setStatus(1); // set status to in bill
                $billing->setProjectCampaignId($projectCampaignId);
                $billing->setCustomerId($customerId);
                $billing->setCreatedAt($now);

                $this->_em->persist($billing);
                $this->_em->flush();

                $billId = $billing->getId();
            }

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => array(
                    'billId' => $id,
                )
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide valid required data (spot_id).'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    function update($billId, $data)
    {
        $timeEntryIds = $this->_commonRepo->filterPostData($data, 'time_entry_id', 'json', null);
        $status = $this->_commonRepo->filterPostData($data, 'status', 'int', null);
        $billingLines = $this->_commonRepo->filterPostData($data, 'billing_line', 'json', null);

        $bill = $this->_billingRepository->find($billId);

        if ($bill && $bill->getUserId() === $this->_user_id) {
            // set status if provided
            if ($status) {
                $bill->setStatus($status);
                $this->_em->persist($bill);
                $this->_em->flush();
            }

            if ($timeEntryIds) {
                $timeEntryIds = array_filter(array_map('intval', $timeEntryIds));

                if ($timeEntryIds) {
                    $this->_billingRepo->updateBillIdOfTimeEntry($billId, $timeEntryIds, true);
                }
            }

            if ($billingLines) {
                $billingLines = $this->filterLines($billingLines);

                if ($billingLines) {
                    $this->_billingRepo->deleteExistingBillingLine($billId);

                    foreach ($billingLines as $line) {
                        $bLine = new RediBillingLine();
                        $bLine->setBillId($billId);
                        $bLine->setDescription($line['description']);
                        $bLine->setRateType($line['rate_type']);
                        $bLine->setHours($line['hours']);
                        $bLine->setRate($line['rate']);
                        $bLine->setTotalBeforeDiscount($line['total_before_discount']);
                        $bLine->setDiscount($line['discount']);
                        $bLine->setTotal($line['total']);

                        $this->_em->persist($bLine);
                        $this->_em->flush();

                        $lineId = $bLine->getLineId();

                        if ($lineId && $line['time_entry_id']) {

                        }
                    }
                }
            }

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => $this->getSingle($billId),
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Bill information not found for current user.'
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    private function filterLines($lines)
    {
        return array_filter(array_map(function ($line) {
            $line = array(
                'description' => $this->_commonRepo->filterPostData($line, 'description', 'string', null),
                'rate_type' => $this->_commonRepo->filterPostData($line, 'rate_type', 'string', null),
                'hours' => $this->_commonRepo->filterPostData($line, 'hours', 'float', null),
                'rate' => $this->_commonRepo->filterPostData($line, 'rate', 'float', null),
                'total_before_discount' => $this->_commonRepo->filterPostData($line, 'total_before_discount', 'float', null),
                'discount' => $this->_commonRepo->filterPostData($line, 'discount', 'float', null),
                'total' => $this->_commonRepo->filterPostData($line, 'total', 'float', null),
                'time_entry_id' => $this->_commonRepo->filterPostData($line, 'time_entry_id', 'array', null),
            );

            if (empty($line['description']) || empty($line['rate_type']) || empty($line['description']) || empty($line['total'])) {
                return null;
            }

            return $line;

        }, $lines));
    }

    private function getSingle($billId)
    {
        return $this->_billingRepo->getSingle($billId);
    }
}
