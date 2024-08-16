<?php

namespace Database\Factories;

use App\Models\JobVacancy;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobVacancy>
 */
class JobVacancyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = JobVacancy::class;

    protected $cities = [
        'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Yogyakarta', 'Denpasar', 'Makassar', 'Palembang', 'Batam',
        'Malang', 'Balikpapan', 'Bandar Lampung', 'Pontianak', 'Jambi', 'Banjarmasin', 'Mataram', 'Ambon', 'Kupang', 'Manado'
    ];

    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(),
            'location' => $this->faker->randomElement($this->cities),
            'type' => $this->faker->randomElement(['full-time', 'part-time', 'contract']),
            'salary_min' => $this->faker->numberBetween(5000000, 10000000),
            'salary_max' => $this->faker->numberBetween(10000000, 20000000),
        ];
    }
}
