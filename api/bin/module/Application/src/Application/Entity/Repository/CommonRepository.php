<?php
namespace Application\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Zend\Config\Config;

// before called Table now Repository Table Data Gateway
// In Bug Entity add  @Entity(repositoryClass="BugRepository")
// To be able to use this query logic through
// $this->getEntityManager()->getRepository('Bug') we have to adjust the metadata slightly.
// http://stackoverflow.com/questions/10481916/the-method-name-must-start-with-either-findby-or-findoneby-uncaught-exception

class CommonRepository extends EntityRepository
{
    public $mimeToExtension = array(
        "image/bmp" => ".bmp",
        "image/x-windows-bmp" => ".bmp",
        "application/msword" => ".doc",
        "image/gif" => ".gif",
        "image/x-icon" => ".ico",
        "image/pjpeg" => ".jpeg",
        "image/jpeg" => ".jpg",
        "application/pdf" => ".pdf",
        "application/mspowerpoint" => ".ppt",
        "application/powerpoint" => ".ppt",
        "application/vnd.ms-powerpoint" => ".ppt",
        "application/x-mspowerpoint" => ".ppt",
        "application/octet-stream" => ".psd",
        "application/rtf" => ".rtf",
        "application/x-rtf" => ".rtf",
        "text/richtext" => ".rtf"
    );

    private $_className = "\Application\Entity\RediActivity";

    private $_config;

    public function __construct(EntityManager $entityManager)
    {
        $classMetaData = $entityManager->getClassMetadata($this->_className);
        parent::__construct($entityManager, $classMetaData);

        $this->_config = new Config(include 'config/autoload/global.php');
    }

//    public function callSync($type)
//    {
//        $url = $this->_config->sync_data->url;
//
//        $post = [
//            'token1' => $this->_config->sync_data->token1,
//            'token2' => $this->_config->sync_data->token2,
//            'type' => $type,
//        ];
//
//        $ch = curl_init($url);
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch,CURLOPT_POST, count($post));
//        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
//
//        $response = curl_exec($ch);
//
//        // var_dump($response);
//        curl_close($ch);
//    }

    public function generateRandomString($minLength = 10, $maxLength = 100)
    {
        $length = rand($minLength, $maxLength);
        $str = "";
        $characters = array_merge(range('A', 'Z'), range('a', 'z'), range('0', '9'));
        $max = count($characters) - 1;
        for ($i = 0; $i < $length; $i++) {
            $rand = mt_rand(0, $max);
            $str .= $characters[$rand];
        }
        return $str;
    }

    /**
     * Convert date string to DateTime object
     * return null if can not be converted
     *
     * This function is used to avoid any date conversion related exception
     *
     * @param $dateString String
     * @return \DateTime
     */
    public function formatDateForInsert($dateString)
    {
        if ($dateString) {
            try {
                $date = new \DateTime($dateString);
            } catch (\Exception $err) {
                $date = null;
            }
        } else {
            $date = null;
        }

        return $date;
    }

    public function formatDateForDisplay($dateObject, $format = 'Y-m-d')
    {
        if ($dateObject instanceof DateTime) {
            try {
                $dateString = $dateObject->format('Y-m-d');

                return $dateString;
            } catch (\Exception $e) {
            // some message if requried
            }
        }

        return null;
    }

    public function base64DecodeFile($data)
    {
        if (preg_match('/^data\:([a-zA-Z]+\/[a-zA-Z]+);base64\,([a-zA-Z0-9\+\/]+\=*)$/', $data, $matches)) {
            return [
                'mime' => $matches[1],
                "extension" => (!empty($this->mimeToExtension[$matches[1]])) ? $this->mimeToExtension[$matches[1]] : null,
                'data' => base64_decode($matches[2]),
            ];
        }
        return false;
    }

    public function filterPostData($data, $key, $type = 'string', $defaultVal = null)
    {
        $type = strtolower($type);
        // $value = $defaultVal;

        if (!empty($data[$key])) {
            $value = $data[$key];

            switch ($type) {
                case 'decimal':
                case 'float':
                case 'double':
                    $value = (float)$value;
                    break;
                case 'int':
                case 'integer':
                case 'intval':
                    $value = (int)$value;
                    break;
                case 'bool':
                case 'boolean':
                    $value = $value ? 1 : 0;
                    break;
                case 'date':
                case 'datetime': // for converting datetime string to object
                    $value = $this->formatDateForInsert($value);
                    break;
                case 'datetimeObj': // for converting datetime Object to datetime string
                    $value = $this->formatDateForDisplay($value, 'Y-m-d H:i:s');
                    break;
                case 'array':
                    $value = is_array($value) ? $value : array();
                    break;
                case 'string':
                    $value = trim($value);
                    break;
                default:
                    $value = $value;
            }

            if ($value && $type === 'json') {
                $value = (array)json_decode($value, true);
            }
        }

        if (empty($value)) {
            $value = $defaultVal;
        }

        return $value;
    }

    public function convertArrayKey($data, $convertTo) {
        $result = array();

        foreach($data as $key => $row) {

        }
    }
}
