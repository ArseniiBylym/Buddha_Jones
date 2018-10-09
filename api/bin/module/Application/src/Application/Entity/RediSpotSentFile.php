<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediSpotSentFile
 *
 * @ORM\Table(name="redi_spot_sent_file")
 * @ORM\Entity
 */
class RediSpotSentFile
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="request_id", type="bigint", nullable=true)
     */
    private $requestId;

    /**
     * @var string
     *
     * @ORM\Column(name="file_name", type="string", length=200, nullable=true)
     */
    private $fileName;

    /**
     * @var string
     *
     * @ORM\Column(name="file_description", type="text", nullable=true)
     */
    private $fileDescription;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set requestId
     *
     * @param integer $requestId
     * @return RediSpotSentFile
     */
    public function setRequestId($requestId)
    {
        $this->requestId = $requestId;

        return $this;
    }

    /**
     * Get requestId
     *
     * @return integer 
     */
    public function getRequestId()
    {
        return $this->requestId;
    }

    /**
     * Set fileName
     *
     * @param string $fileName
     * @return RediSpotSentFile
     */
    public function setFileName($fileName)
    {
        $this->fileName = $fileName;

        return $this;
    }

    /**
     * Get fileName
     *
     * @return string 
     */
    public function getFileName()
    {
        return $this->fileName;
    }

    /**
     * Set fileDescription
     *
     * @param string $fileDescription
     * @return RediSpotSentFile
     */
    public function setFileDescription($fileDescription)
    {
        $this->fileDescription = $fileDescription;

        return $this;
    }

    /**
     * Get fileDescription
     *
     * @return string 
     */
    public function getFileDescription()
    {
        return $this->fileDescription;
    }
}
