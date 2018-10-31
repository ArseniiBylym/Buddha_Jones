<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\Mvc\MvcEvent;
use Zend\View\Model\JsonModel;
use Zend\Mail;
// use Namshi\JOSE\SimpleJWS;
use Namshi\JOSE\Base64\Base64UrlSafeEncoder;
use \Firebase\JWT\JWT;

class LoginController extends AbstractRestfulController
{
    protected $_em;

    protected $_userRepository;
    protected $_userTypeRepository;

    private $_config;

    public function onDispatch(MvcEvent $e)
    {
        $this->_em = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
        $this->_userRepository = $this->_em->getRepository('Application\Entity\RediUser');
        $this->_userTypeRepository = $this->_em->getRepository('Application\Entity\RediUserType');

        $this->_userRepo = $this->getServiceLocator()->get('Application\Entity\Repository\UsersRepository');

        $this->_config = $this->getServiceLocator()->get('Config');

        $this->getResponse()->getHeaders()
            // can be accessed by origin
            ->addHeaderLine('Access-Control-Allow-Origin', '*')
            // set allow methods
            ->addHeaderLine('Access-Control-Allow-Methods', 'POST,PUT,DELETE,GET,OPTIONS')
            // set allow headers
            ->addHeaderLine('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
            // allow credentials
            ->addHeaderLine('Access-Control-Allow-Credential', 'true');


        return parent::onDispatch($e);
    }

    /**
     * check user logged in or not
     *
     * @return mixed|JsonModel
     */
    public function getList()
    {
        $config = $this->getServiceLocator()->get('Config');
        $authFailed = false;

        $auth = $this->getRequest()->getHeaders('Authorization');

        if ($auth) {
            $authFailed = false;
            $token = str_replace('Bearer ', '', $auth->getFieldValue());

            if ($this->_checkTokenFormat($token)) {
                $jwtSecret = $this->_config['jwt_config']['jwt_secret'];

                try {
                    $payload = JWT::decode($token, $jwtSecret, array('HS256'));

                    if ($payload) {
                        $userId = (int)$payload->userId;
                        $user = $this->_userRepository->find($userId);
                        $userType = $this->_userTypeRepository->find($user->getTypeId());

                        $userData = $this->_userRepo->getUser($identity->getId());

                        $data = array_merge($userData, array(
                            'pageAccess' => $this->_userRepo->getPageAccessOfUser($userType->getId()),
                            'projectPermissions' => $this->_userRepo->getUserTypeProjectPermission($userType->getId()),
                        ));

                        $response = array(
                            'status' => 1,
                            'message' => "User already logged in",
                            'data' => $data,
                        );
                    }
                } catch (\Exception $e) {
                    $authFailed = true;
                }
            } else {
                $authFailed = true;
            }

        }

        if (!$auth || $authFailed) {
            $response = array(
                'status' => 0,
                'message' => "User authentication failed",
                'auth_error' => 1
            );

            $this->getResponse()->setStatusCode(401);
        }

        return new JsonModel($response);
    }

    public function get($id)
    {
        $this->getResponse()->setStatusCode(404);
        return new JsonModel(array('status' => 0, 'message' => 'no response'));
    }

    public function update($id, $data)
    {
        $this->getResponse()->setStatusCode(404);
        return new JsonModel(array('status' => 0, 'message' => 'no response'));
    }

    public function delete($id)
    {
        $this->getResponse()->setStatusCode(404);
        return new JsonModel(array('status' => 0, 'message' => 'no response'));
    }

    public function create($data)
    {
        $authService = $this->getServiceLocator()->get('Zend\Authentication\AuthenticationService');

        $username = isset($data['username']) ? $data['username'] : '';
        $password = isset($data['password']) ? $data['password'] : '';
        $authFailed = 0;

        if ($username && $password) {
            $adapter = $authService->getAdapter();

            $adapter->setIdentity($username);
            $adapter->setCredential($password);
            $authResult = $authService->authenticate();

            if ($authResult->isValid()) {
                $identity = $authResult->getIdentity();
                $authService->getStorage()->write($identity);

                if ($identity->getStatus()) {
                    $jwtSecret = $this->_config['jwt_config']['jwt_secret'];
                    $token = array(
                        'iss' => $this->_config['jwt_config']['issuer'],
                        'aud' => $this->_config['jwt_config']['audience'],
                        'algorithm' => 'HS256',
                        'iat' => time(),
                        'exp' => time() + 86400,
                        'userId' => $identity->getId(),
                    );

                    $jwtToken = JWT::encode($token, $jwtSecret);
                    $userType = $this->_userTypeRepository->find($identity->getTypeId());
                    $userData = $this->_userRepo->getUser($identity->getId());

                    $data = array_merge($userData, array(
                        'token' => $jwtToken,
                        'pageAccess' => $this->_userRepo->getPageAccessOfUser($userType->getId()),
                        'projectPermissions' => $this->_userRepo->getUserTypeProjectPermission($userType->getId()),
                    ));

                    // update last login
                    $userInfo = $this->_userRepository->find($identity->getId());
                    $userInfo->setLastLoginDate(new \DateTime('now'));
                    $this->_em->persist($userInfo);
                    $this->_em->flush();

                    $response = array(
                        'status' => 1,
                        'message' => 'Login successful',
                        'data' => $data
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'User is inactive',
                    );
                }
            } else {
                $authFailed = 1;
                $checkUserName = $this->_userRepository->findOneBy(array('username' => $username));

                if ($checkUserName) {
                    $response = array(
                        'status' => 0,
                        'message' => 'User name and password does not match'
                    );
                } else {
                    $response = array(
                        'status' => 0,
                        'message' => 'User does not exist'
                    );
                }
            }

        } else {
            $response = array(
                'status' => 0,
                'message' => 'Please provide required data'
            );
        }


        if ($response['status'] == 0) {
            if ($authFailed == 1) {
                $this->getResponse()->setStatusCode(401);
            } else {
                $this->getResponse()->setStatusCode(400);
            }
        }

        return new JsonModel($response);
    }

    public function options()
    {
        $response = $this->getResponse();
        $headers = $response->getHeaders();

        $headers->addHeaderLine('Allow', implode(',', array(
            'GET',
            'POST',
            'PUT'
        )));
        return $response;
    }

    private function _generateToken($length = 50)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    private function _checkTokenFormat($jwsTokenString, $encoder = null)
    {
        if ($encoder === null) {
            $encoder = strpbrk($jwsTokenString, '+/=') ? new Base64Encoder() : new Base64UrlSafeEncoder();
        }

        $parts = explode('.', $jwsTokenString);

        if (count($parts) === 3) {
            $header = json_decode($encoder->decode($parts[0]), true);
            $payload = json_decode($encoder->decode($parts[1]), true);

            if (is_array($header) && is_array($payload)) {
                return true;
            }
        }
        return false;
    }

}
