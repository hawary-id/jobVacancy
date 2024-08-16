<?php

namespace App\Http\Controllers;

use App\Models\JobVacancy;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class HomeController extends Controller
{

    public function index()
    {
        $jobs = JobVacancy::orderBy('id','DESC')->get();
        return Inertia::render('Welcome',[
            'jobs' => $jobs
        ]);
    }

    public function apply(string $slug)
    {
        try {
            $job = JobVacancy::where('slug', $slug)->first();
    
            return Inertia::render('Apply', [
                'job' => $job
            ]);

        } catch (Throwable $th) {
            Log::error('Failed to get job vacancy: ' . $th->getMessage());
    
            return redirect()->route('home')->with([
                'type' => 'error',
                'message' => 'Failed to get the job vacancy. Please try again.'
            ]);
        }
    }
}
