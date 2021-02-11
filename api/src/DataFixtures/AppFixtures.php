<?php

namespace App\DataFixtures;

use App\Entity\Schema;
use App\Entity\Score;
use Faker\Factory;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;


class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for ($i = 0; $i < 50; $i++) {
            $schema = new Schema();
            $schema->setMotif($faker->randomElements([1, 2, 3, 4, 5, 6, 7, 8, 9], 5));
            $manager->persist($schema);
        }
        $manager->flush();

        for ($i = 0; $i < 10; $i++) {
            $score = new Score();
            $score->setScore((string)$faker->numberBetween(60, 600));
            $score->setUsername($faker->lastName('user'));
            $manager->persist($score);
        }
        $manager->flush();
    }
}
