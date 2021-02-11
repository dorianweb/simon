<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ScoreRepository;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=ScoreRepository::class)
 *  
 */
class Score
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private $score;

    /**
     * @ORM\Column(type="string", length=155)
     */
    private $username;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScore(): ?string
    {
        return $this->score;
    }

    public function setScore(string $score): self
    {
        $this->score = $score;
        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }
}
