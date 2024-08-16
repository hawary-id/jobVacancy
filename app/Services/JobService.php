<?php

namespace App\Services;

use App\Models\JobVacancy;
use Exception;

class JobService
{
    public function createJob(array $data): JobVacancy
    {
        return JobVacancy::create($data);
    }

    public function findJobById(string $id): ?JobVacancy
    {
        return JobVacancy::find($id);
    }

    public function updateJob(JobVacancy $jobVacancy, array $data): JobVacancy
    {
        $jobVacancy->update($data);
        return $jobVacancy;
    }

    public function deleteJob(JobVacancy $jobVacancy): void
    {
        $jobVacancy->delete();
    }
}
