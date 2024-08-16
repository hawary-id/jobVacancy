<?php

namespace App\Services;

use App\Models\Application;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ApplicationService
{
    public function createApplication(array $data): Application
    {
        if (isset($data['resume']) && $data['resume']->isValid()) {
            $resume = $data['resume'];
            $path = Storage::putFile('public/resumes', $resume);
            $url = Storage::url($path);
            $data['resume'] = $url;
        } else {
            Log::error('Invalid resume file.');
            throw new Exception('Invalid resume file.');
        }
        return Application::create($data);
    }

    public function findApplicationById(string $id): ?Application
    {
        return Application::with('jobVacancy')->find($id);
    }

    public function deleteApplication(Application $application): void
    {
        if (!empty($application->resume)) {
            $path = public_path($application->resume);
            if(file_exists($path)){
                unlink($path);
            }
        }
        $application->delete();
    }

}
