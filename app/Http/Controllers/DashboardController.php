<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\JobVacancy;
use App\Services\JobService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class DashboardController extends Controller
{
    public function index()
    {
        $jobs = JobVacancy::count();
        $applications = Application::count();

        return Inertia::render('Dashboard',[
            'jobs' => $jobs,
            'applications' => $applications,
        ]);
    }

    
}
