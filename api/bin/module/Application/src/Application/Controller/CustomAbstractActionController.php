<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\Mvc\MvcEvent;
use Zend\View\Model\JsonModel;

use Application\Entity\Users;
use Application\Entity\RediOrders;
use Application\Entity\RediOrderLines;
use Application\Entity\RediPendingReason;
use Application\Entity\RediOrderPendingReason;
use Application\Entity\RediUserCart;
use Application\Entity\RediUserCartInfo;
use Namshi\JOSE\SimpleJWS;
use Namshi\JOSE\Base64\Base64UrlSafeEncoder;
use \Firebase\JWT\JWT;

class CustomAbstractActionController extends AbstractRestfulController
{
    protected $_identity;
    protected $_jwt_public_key_path;
    protected $_user_id;
    protected $_user_type_id;
    protected $_profileImagePath;
    protected $_tempProfileImagePath;
    protected $_siteUrl;
    protected $_user_permission;
    protected $_config;

    protected $_em;
    protected $_conn;

    protected $_userRepository;
    protected $_activityRepository;
    protected $_activityToUserTypeRepository;
    protected $_billingRepository;
    protected $_billingApprovalRepository;
    protected $_campaignRepository;
    protected $_commentRepository;
    protected $_commentTypeRepository;
    protected $_customerRepository;
    // protected $_customerPriceRepository;
    protected $_customerContactRepository;
    protected $_customerNewRepository;
    protected $_projectToCamapignCC;
    protected $_editorToSpotRepository;
    protected $_estimateRepository;
    protected $_estimateToOutsideCostRepository;
    protected $_estimateTypeRepository;
    protected $_estimateToWorkerRepository;
    protected $_estimateToStaffRepository;
    protected $_estimateTemporaryStaffRepository;
    protected $_finishingHouseRepository;
    protected $_graphicsRequestRepository;
    protected $_graphicsRequestAssignRepository;
    protected $_graphicsRequestDesignRepository;
    protected $_graphicsRequestFileRepository;
    protected $_graphicsRequestFinishingRepository;
    protected $_graphicsRequestStatusRepository;
    protected $_outsideCostRepository;
    protected $_notificationRepository;
    protected $_notificationUserRepository;
    protected $_projectRepository;
    protected $_projectEditorProgressRepository;
    protected $_projectToCampaignRepository;
    protected $_projectToCampaignUserRepository;
    protected $_projectToCampaignBillingUserRepository;
    protected $_projectToCampaignEditorRepository;
    protected $_projectToCampaignDesignerRepository;
    protected $_projectPermissionsRepository;
    protected $_spotRepository;
    protected $_spotSentRepository;
    protected $_spotSentOptionRepository;
    // protected $_spotSentToWorkStage;
    // protected $_spotSentToSpotVersionRepository;
    protected $_spotVersionRepository;
    protected $_spotVersionEditorRepository;
    protected $_staffRepository;
    protected $_statusRepository;
    protected $_studioRepository;
    protected $_timeEntryRepository;
    protected $_timeEntryFileRepository;
    protected $_timeEntryStatusRepository;
    // protected $_timeEntryBillStatusRepository;
    protected $_versionRepository;
    protected $_versionStatusRepository;
    protected $_userTypeRepository;
    protected $_userAccessRepository;
    protected $_userRoleRepository;
    protected $_workTypeRepository;
    protected $_workStageRepository;
    protected $_userTypeProjectPermissionRepository;

    protected $_activityRepo;
    protected $_billingRepo;
    protected $_campaignRepo;
    protected $_commentRepo;
    protected $_commonRepo;
    protected $_customerRepo;
    protected $_estimateRepo;
    protected $_graphicsRequestRepo;
    protected $_notificationRepo;
    protected $_projectRepo;
    protected $_projectCampaignRepo;
    protected $_spotRepo;
    protected $_timeEntryRepo;
    protected $_usersRepo;
    protected $_versionRepo;

    public function onDispatch(MvcEvent $e)
    {
        $auth = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');

        // get configuration values
        $config = $this->getServiceLocator()->get('Config');
        $this->_config = $config;
        $this->_profileImagePath = $config['directory_path']['profile_image'];
        $this->_tempProfileImagePath = $config['directory_path']['temp_profile_image'];
        $this->_siteUrl = $config['site_url'];
        $jwtSecret = $config['jwt_config']['jwt_secret'];

//        $this->_conn = $this->getServiceManager()->get('doctrine.entitymanager.orm_default')->getConnection();
        $this->_em = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
        $this->_userRepository = $this->_em->getRepository('Application\Entity\RediUser');
        $this->_billingRepository = $this->_em->getRepository('Application\Entity\RediBilling');
        $this->_billingApprovalRepository = $this->_em->getRepository('Application\Entity\RediBillingApproval');
        $this->_activityRepository = $this->_em->getRepository('Application\Entity\RediActivity');
        $this->_activityToUserTypeRepository = $this->_em->getRepository('Application\Entity\RediActivityToUserType');
        $this->_campaignRepository = $this->_em->getRepository('Application\Entity\RediCampaign');
        $this->_commentRepository = $this->_em->getRepository('Application\Entity\RediComment');
        $this->_commentTypeRepository = $this->_em->getRepository('Application\Entity\RediCommentType');
        $this->_customerRepository = $this->_em->getRepository('Application\Entity\RediCustomer');
        $this->_customerContactRepository = $this->_em->getRepository('Application\Entity\RediCustomerContact');
        $this->_customerNewRepository = $this->_em->getRepository('Application\Entity\RediCustomerNew');
        $this->_projectToCamapignCC = $this->_em->getRepository('Application\Entity\RediProjectToCampaignCc');
        // $this->_customerPriceRepository = $this->_em->getRepository('Application\Entity\RediCustomerPrice');
        $this->_editorToSpotRepository = $this->_em->getRepository('Application\Entity\RediEditorToSpot');
        $this->_estimateToOutsideCostRepository = $this->_em->getRepository('Application\Entity\RediEstimateToOutsideCost');
        $this->_estimateRepository = $this->_em->getRepository('Application\Entity\RediEstimate');
        $this->_estimateTemporaryStaffRepository = $this->_em->getRepository('Application\Entity\RediEstimateTemporaryStaff');
        $this->_estimateTypeRepository = $this->_em->getRepository('Application\Entity\RediEstimateType');
        $this->_estimateToWorkerRepository = $this->_em->getRepository('Application\Entity\RediEstimateToWorker');
        $this->_estimateToStaffRepository = $this->_em->getRepository('Application\Entity\RediEstimateToStaff');
        $this->_finishingHouseRepository = $this->_em->getRepository('Application\Entity\RediFinishingHouse');
        $this->_graphicsRequestRepository = $this->_em->getRepository('Application\Entity\RediGraphicsRequest');
        $this->_graphicsRequestAssignRepository = $this->_em->getRepository('Application\Entity\RediGraphicsRequestAssign');
        $this->_graphicsRequestDesignRepository = $this->_em->getRepository('Application\Entity\RediGraphicsRequestDesign');
        $this->_graphicsRequestFileRepository = $this->_em->getRepository('Application\Entity\RediGraphicsRequestFile');
        $this->_graphicsRequestFinishingRepository = $this->_em->getRepository('Application\Entity\RediGraphicsRequestFinishing');
        $this->_graphicsRequestStatusRepository = $this->_em->getRepository('Application\Entity\RediGraphicsRequestStatus');
        $this->_outsideCostRepository = $this->_em->getRepository('Application\Entity\RediOutsideCost');
        $this->_notificationRepository = $this->_em->getRepository('Application\Entity\RediNotification');
        $this->_notificationUserRepository = $this->_em->getRepository('Application\Entity\RediNotificationUser');
        $this->_projectRepository = $this->_em->getRepository('Application\Entity\RediProject');
        $this->_projectEditorProgressRepository = $this->_em->getRepository('Application\Entity\RediProjectEditorProgress');
        $this->_projectToCampaignRepository = $this->_em->getRepository('Application\Entity\RediProjectToCampaign');
        $this->_projectToCampaignBillingUserRepository = $this->_em->getRepository('Application\Entity\RediProjectToCampaignBilling');
        $this->_projectToCampaignDesignerRepository = $this->_em->getRepository('Application\Entity\RediProjectToCampaignDesigner');
        $this->_projectToCampaignEditorRepository = $this->_em->getRepository('Application\Entity\RediProjectToCampaignEditor');
        $this->_projectToCampaignUserRepository = $this->_em->getRepository('Application\Entity\RediProjectToCampaignUser');
        $this->_projectPermissionsRepository = $this->_em->getRepository('Application\Entity\RediProjectPermissions');
        $this->_spotRepository = $this->_em->getRepository('Application\Entity\RediSpot');
        $this->_spotVersionRepository = $this->_em->getRepository('Application\Entity\RediSpotVersion');
        $this->_spotVersionEditorRepository = $this->_em->getRepository('Application\Entity\RediSpotVersionEditor');
        // $this->_spotSentToSpotVersionRepository = $this->_em->getRepository('Application\Entity\RediSpotSentToSpotVersion');
        $this->_spotSentOptionRepository = $this->_em->getRepository('Application\Entity\RediSpotSentOption');
        $this->_spotSentRepository = $this->_em->getRepository('Application\Entity\RediSpotSent');
        // $this->_spotSentToWorkStage = $this->_em->getRepository('Application\Entity\RediSpotSentToWorkStage');
        $this->_staffRepository = $this->_em->getRepository('Application\Entity\RediStaff');
        $this->_statusRepository = $this->_em->getRepository('Application\Entity\RediStatus');
        $this->_studioRepository = $this->_em->getRepository('Application\Entity\RediStudio');
        $this->_timeEntryRepository = $this->_em->getRepository('Application\Entity\RediTimeEntry');
        $this->_timeEntryStatusRepository = $this->_em->getRepository('Application\Entity\RediTimeEntryStatus');
        // $this->_timeEntryBillStatusRepository = $this->_em->getRepository('Application\Entity\RediTimeEntryBillStatus');
        $this->_timeEntryFileRepository = $this->_em->getRepository('Application\Entity\RediTimeEntryFile');
        $this->_versionRepository = $this->_em->getRepository('Application\Entity\RediVersion');
        $this->_versionStatusRepository = $this->_em->getRepository('Application\Entity\RediVersionStatus');
        $this->_userTypeRepository = $this->_em->getRepository('Application\Entity\RediUserType');
        $this->_userAccessRepository = $this->_em->getRepository('Application\Entity\RediUserAccess');
        $this->_userRoleRepository = $this->_em->getRepository('Application\Entity\RediUserRole');
        $this->_workTypeRepository = $this->_em->getRepository('Application\Entity\RediWorkType');
        $this->_workStageRepository = $this->_em->getRepository('Application\Entity\RediWorkStage');
        $this->_userTypeProjectPermissionRepository = $this->_em->getRepository('Application\Entity\RediUserTypeProjectPermission');


        $this->_activityRepo = $this->getServiceLocator()->get('Application\Entity\Repository\ActivityRepository');
        $this->_billingRepo = $this->getServiceLocator()->get('Application\Entity\Repository\BillingRepository');
        $this->_campaignRepo = $this->getServiceLocator()->get('Application\Entity\Repository\CampaignRepository');
        $this->_commentRepo = $this->getServiceLocator()->get('Application\Entity\Repository\CommentRepository');
        $this->_commonRepo = $this->getServiceLocator()->get('Application\Entity\Repository\CommonRepository');
        $this->_customerRepo = $this->getServiceLocator()->get('Application\Entity\Repository\CustomerRepository');
        $this->_estimateRepo = $this->getServiceLocator()->get('Application\Entity\Repository\EstimateRepository');
        $this->_graphicsRequestRepo = $this->getServiceLocator()->get('Application\Entity\Repository\GraphicsRequestRepository');
        $this->_notificationRepo = $this->getServiceLocator()->get('Application\Entity\Repository\NotificationRepository');
        $this->_projectRepo = $this->getServiceLocator()->get('Application\Entity\Repository\ProjectRepository');
        $this->_projectCampaignRepo = $this->getServiceLocator()->get('Application\Entity\Repository\ProjectCampaignRepository');
        $this->_spotRepo = $this->getServiceLocator()->get('Application\Entity\Repository\SpotRepository');
        $this->_timeEntryRepo = $this->getServiceLocator()->get('Application\Entity\Repository\TimeEntryRepository');
        $this->_usersRepo = $this->getServiceLocator()->get('Application\Entity\Repository\UsersRepository');
        $this->_versionRepo = $this->getServiceLocator()->get('Application\Entity\Repository\VersionRepository');

        $this->getResponse()->getHeaders()
            // can be accessed by origin
            ->addHeaderLine('Access-Control-Allow-Origin', '*')
            // set allow methods
            ->addHeaderLine('Access-Control-Allow-Methods', 'POST,PUT,DELETE,GET,OPTIONS')
            // set allow headers
            ->addHeaderLine('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
            // allow credentials
            ->addHeaderLine('Access-Control-Allow-Credential', 'true');

        if ($this->getRequest()->getMethod() != 'OPTIONS') {

            $auth = $this->getRequest()->getHeaders('Authorization');
            if ($auth) {
                $authFailed = false;
                $token = str_replace('Bearer ', '', $auth->getFieldValue());

                if ($this->_checkTokenFormat($token)) {
                    try {
                        $payload = JWT::decode($token, $jwtSecret, array('HS256'));

                        if ($payload) {
                            $this->_user_id = (int)$payload->userId;
                            $user = $this->_userRepository->find($this->_user_id);
                            $this->_user_type_id = $user->getTypeId();
                        } else {
                            $authFailed = true;
                        }
                    } catch(\Exception $ex) {
                        $authFailed = true;
                    }
                } else {
                    $authFailed = true;
                }

                if ($authFailed) {
                    $response = new JsonModel(array(
                        'status' => 0,
                        'message' => "User authentication failed",
                        'auth_error' => 1
                    ));
                    $e->stopPropagation(true);
                    $e->setViewModel($response);

                    $this->getResponse()->setStatusCode(401);
                    return $response;
                } else {
                    $this->_user_permission = $this->_usersRepo->getUserPermission($this->_user_type_id, true);
                }

            } else {
                $response = new JsonModel(array(
                    'status' => 0,
                    'message' => "User authentication failed",
                    'auth_error' => 1
                ));
                $e->stopPropagation(true);
                $e->setViewModel($response);

                $this->getResponse()->setStatusCode(401);
                return $response;
            }

            return parent::onDispatch($e);
        }

        return parent::onDispatch($e);

    }

    public function options()
    {
        $response = $this->getResponse();
        $headers = $response->getHeaders();

        $headers->addHeaderLine('Allow', implode(',', array(
            'GET',
            'POST',
            'PUT',
            'OPTIONS'
        )));
        return $response;
    }

    private function _checkTokenFormat($jwsTokenString)
    {
        $parts = explode('.', $jwsTokenString);

        if (count($parts) === 3) {
            return true;
        }
        return false;
    }

    public function processAmount($amount) {
        $amountValue = (float)preg_replace('/[^0-9\.-]+/i', '', $amount);

        if (preg_match("/\(.+\)/i", $amount, $match)) {
            $value = -$amountValue;
        } else {
            $value = $amountValue;
        }

        return $value;
    }
}
