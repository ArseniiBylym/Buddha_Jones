<?php

namespace Application\Controller;

use Application\Entity\RediBilling;
use Application\Entity\RediBillingLine;
use Application\Entity\RediBillingTimeEntry;
use Zend\View\Model\JsonModel;

class BillingController extends CustomAbstractActionController
{
    public function getList()
    {
        $offset = (int) trim($this->getRequest()->getQuery('offset', 0));
        $length = (int) trim($this->getRequest()->getQuery('length', 10));

        $filter['sort'] = trim($this->getRequest()->getQuery('sort', ''));
        $filter['search'] = trim($this->getRequest()->getQuery('search', ''));
        $filter['project_id'] = (int) trim($this->getRequest()->getQuery('project_id', 0));
        $filter['campaign_id'] = (int) trim($this->getRequest()->getQuery('campaign_id', 0));
        $filter['status_id'] = (int) trim($this->getRequest()->getQuery('status_id', 0));
        $filter['customer_id'] = (int) trim($this->getRequest()->getQuery('customer_id', 0));
        $filter['approver_id'] = (int) trim($this->getRequest()->getQuery('approver_id', 0));
        $filter['approver_status'] = $this->getRequest()->getQuery('approver_status', null);

        $data = $this->_billingRepo->search($offset, $length, $filter);
        $totalCount = $this->_billingRepo->searchCount($filter);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'total_count' => $totalCount,
            'object_count' => count($data),
            'data' => $data,
        );

        return new JsonModel($response);
    }

    public function get($billId)
    {
        $data = $this->getSingle($billId);

        $response = array(
            'status' => 1,
            'message' => 'Request successful',
            'data' => $data,
        );

        return new JsonModel($response);
    }

    public function create($data)
    {
        $projectCampaignId = (int) trim(isset($data['project_campaign_id']) ? $data['project_campaign_id'] : 0);

        // project campaign
        $projectCampaign = $this->_projectToCampaignRepository->find($projectCampaignId);

        if ($projectCampaign) {
            $billId = $this->_billingRepo->getUnusedBillingId($this->_user_id, $projectCampaignId);

            if (!$billId) {
                $now = new \DateTime('now');

                // get customerId
                // $customerId = $projectCampaign->getCustomerId();

                $billing = new RediBilling();
                $billing->setStatus(1); // set status to in bill
                $billing->setProjectCampaignId($projectCampaignId);
                // $billing->setCustomerId($customerId);
                $billing->setCreatedBy($this->_user_id);
                $billing->setCreatedAt($now);

                $this->_em->persist($billing);
                $this->_em->flush();

                $billId = $billing->getId();
            }

            $response = array(
                'status' => 1,
                'message' => 'Request successful.',
                'data' => array(
                    'billId' => $billId,
                ),
            );
        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide valid required data (project_campaign_id).',
            );
        }

        if ($response['status'] == 0) {
            $this->getResponse()->setStatusCode(400);
        }

        return new JsonModel($response);
    }

    public function update($billId, $data)
    {
        // $timeEntryIds = $this->_commonRepo->filterPostData($data, 'time_entry_id', 'json', null);
        $status = $this->_commonRepo->filterPostData($data, 'status', 'int', null);
        $ratecardId = $this->_commonRepo->filterPostData($data, 'ratecard_id', 'int', null);
        $ratecardTemplateId = $this->_commonRepo->filterPostData($data, 'ratecard_template_id', 'int', null);
        $status = $this->_commonRepo->filterPostData($data, 'status', 'int', null);
        $billingLines = $this->_commonRepo->filterPostData($data, 'billing_line', 'json', null);

        $bill = $this->_billingRepository->find($billId);

        if ($bill && $bill->getCreatedBy() === $this->_user_id) {
            // set status if provided
            if ($status) {
                $bill->setStatus($status);
            }

            if ($ratecardId) {
                $bill->setRatecardId($ratecardId);
            }

            if ($ratecardTemplateId) {
                $bill->setRatecardTemplateId($ratecardTemplateId);
            }

            $this->_em->persist($bill);
            $this->_em->flush();

            if ($billingLines) {
                $this->_billingRepo->deleteExistingBillingLine($billId);

                foreach ($billingLines as $line) {
                    $description = $this->_commonRepo->filterPostData($line, 'line_desc', 'string', null);
                    $lineType = $this->_commonRepo->filterPostData($line, 'line_type', 'string', null);
                    $hours = $this->_commonRepo->filterPostData($line, 'hours', 'float', null);
                    $rate = $this->_commonRepo->filterPostData($line, 'rate', 'float', null);
                    $discPercent = $this->_commonRepo->filterPostData($line, 'disc_perc', 'float', null);
                    $discAmount = $this->_commonRepo->filterPostData($line, 'disc_amt', 'float', null);
                    $totalDisc = $this->_commonRepo->filterPostData($line, 'total_disc', 'float', null);
                    $totalBefDisc = $this->_commonRepo->filterPostData($line, 'total_bef_disc', 'float', null);
                    $netAmount = $this->_commonRepo->filterPostData($line, 'net_amount', 'float', null);
                    $billingTimeEntry = $this->_commonRepo->filterPostData($line, 'time_entry', 'array', null);

                    $bLine = new RediBillingLine();
                    $bLine->setBillId($billId);
                    $bLine->setLineDesc($description);
                    $bLine->setLineType($lineType);
                    $bLine->setHours($hours);
                    $bLine->setRate($rate);
                    $bLine->setTotalBefDisc($totalBefDisc);
                    $bLine->setDiscAmt($discAmount);
                    $bLine->setDiscPerc($discPercent);
                    $bLine->setTotalDisc($totalDisc);
                    $bLine->setNetAmount($netAmount);

                    $this->_em->persist($bLine);
                    $this->_em->flush();

                    $lineId = $bLine->getId();

                    if ($lineId && $billingTimeEntry) {
                        foreach ($billingTimeEntry as $timeEntry) {
                            $timeEntryId = $this->_commonRepo->filterPostData($timeEntry, 'time_entry_id', 'int', null);
                            $timeEntryHours = $this->_commonRepo->filterPostData($timeEntry, 'time_entry_hours', 'float', null);
                            $lostHours = $this->_commonRepo->filterPostData($timeEntry, 'lost_hours', 'float', null);
                            $nonBillableHours = $this->_commonRepo->filterPostData($timeEntry, 'non_billable_hours', 'float', null);
                            $rt = $this->_commonRepo->filterPostData($timeEntry, 'rt', 'float', null);
                            $ot = $this->_commonRepo->filterPostData($timeEntry, 'ot', 'float', null);
                            $dt = $this->_commonRepo->filterPostData($timeEntry, 'dt', 'float', null);

                            if ($timeEntryId) {
                                $billingTimeEntry = new RediBillingTimeEntry();

                                $billingTimeEntry->setBillLineId($lineId);
                                $billingTimeEntry->setTimeEntryId($timeEntryId);
                                $billingTimeEntry->setTimeEntryHours($timeEntryHours);
                                $billingTimeEntry->setNonBillableHours($nonBillableHours);
                                $billingTimeEntry->setTimeEntryHours($timeEntryHours);
                                $billingTimeEntry->setLostHours($lostHours);
                                $billingTimeEntry->setRt($rt);
                                $billingTimeEntry->setOt($ot);
                                $billingTimeEntry->setDt($dt);

                                $this->_em->persist($billingTimeEntry);
                            }
                        }

                        $this->_em->flush();

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
                'message' => 'Bill information not found for current user.',
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
