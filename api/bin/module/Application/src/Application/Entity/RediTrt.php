<?php

namespace Application\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RediTrt
 *
 * @ORM\Table(name="redi_trt")
 * @ORM\Entity
 */
class RediTrt
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="runtime", type="string", length=45, nullable=true)
     */
    private $runtime;



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
     * Set runtime
     *
     * @param string $runtime
     * @return RediTrt
     */
    public function setRuntime($runtime)
    {
        $this->runtime = $runtime;

        return $this;
    }

    /**
     * Get runtime
     *
     * @return string 
     */
    public function getRuntime()
    {
        return $this->runtime;
    }
}
