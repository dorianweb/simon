<?php

namespace App\Entity;

use App\Repository\SchemaRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;


/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=SchemaRepository::class)
 * @ORM\Table(name="`schema`")
 */
class Schema
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="array")
     */
    private $motif = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMotif(): ?array
    {
        return $this->motif;
    }

    public function setMotif(array $motif): self
    {
        $this->motif = $motif;

        return $this;
    }
}
