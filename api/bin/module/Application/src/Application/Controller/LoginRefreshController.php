<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\Mvc\MvcEvent;
use Zend\View\Model\JsonModel;
use Zend\Mail;
use Firebase\JWT\JWT;

class LoginRefreshController extends AbstractRestfulController
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
        $jwtSecret = $this->_config['jwt_config']['jwt_secret'];

        $authFailed = false;

        $auth = $this->getRequest()->getHeaders('Authorization');

        if ($auth) {
            $authFailed = false;
            $token = str_replace('Bearer ', '', $auth->getFieldValue());

            if ($this->_checkTokenFormat($token)) {
                try {
                    $payload = JWT::decode($token, $jwtSecret, array('HS256'));

                    if ($payload) {
                        $userId = (int)$payload->userId;
                        $user = $this->_userRepository->find($userId);
                        $userType = $this->_userTypeRepository->find($user->getTypeId());

                        $token = array(
                            'iss' => $this->_config['jwt_config']['issuer'],
                            'aud' => $this->_config['jwt_config']['audience'],
                            'algorithm' =>  'HS256',
                            'iat' => time(),
                            'exp' => time() + 86400,
                            'userId' => $user->getId(),
                        );

                        $jwtToken = JWT::encode($token, $jwtSecret);

                        $response = array(
                            'status' => 1,
                            'message' => "User login time extended",
                            'data' => array(
                                'token' => $jwtToken
                            )
                        );
                    }
                } catch(\Exception $e){
                    $authFailed = true;
                }
            } else {
                $authFailed = true;
            }
        } else {
            $authFailed = true;
        }

        if ($authFailed) {
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
        $this->getResponse()->setStatusCode(404);
        return new JsonModel(array('status' => 0, 'message' => 'no response'));
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
        $parts = explode('.', $jwsTokenString);

        if (count($parts) === 3) {
            return true;
        }

        return false;
    }
}
