<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediGraphicsRequestFile
 *
 * @ORM\Table(name="redi_graphics_request_file")
 * @ORM\Entity
 */
class RediGraphicsRequestFile
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
     * @ORM\Column(name="graphics_request_id", type="bigint", nullable=true)
     */
    private $graphicsRequestId;

    /**
     * @var string
     *
     * @ORM\Column(name="file_name", type="string", length=300, nullable=true)
     */
    private $fileName;



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
     * Set graphicsRequestId
     *
     * @param integer $graphicsRequestId
     * @return RediGraphicsRequestFile
     */
    public function setGraphicsRequestId($graphicsRequestId)
    {
        $this->graphicsRequestId = $graphicsRequestId;

        return $this;
    }

    /**
     * Get graphicsRequestId
     *
     * @return integer 
     */
    public function getGraphicsRequestId()
    {
        return $this->graphicsRequestId;
    }

    /**
     * Set fileName
     *
     * @param string $fileName
     * @return RediGraphicsRequestFile
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
}
