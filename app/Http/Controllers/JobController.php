<?php

namespace App\Http\Controllers;

use App\Http\Requests\Job\CreateRequest;
use App\Models\JobVacancy;
use App\Services\JobService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class JobController extends Controller
{
    protected $jobService;

    public function __construct(JobService $jobService)
    {
        $this->jobService = $jobService;
    }

    public function index()
    {
        try {
            $jobs = JobVacancy::with('applications')->withCount('applications')->get();
            
            return Inertia::render('Job/Index', [
                'jobs' => $jobs
            ]);
        } catch (Throwable $th) {
            Log::error('Failed to get job vacancy data: ' . $th->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Job/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRequest $request)
    {
        try {
            $this->jobService->createJob($request->validated());

            return redirect()->route('job.index')->with([
                'type' => 'success',
                'message' => 'Successfully created a new job'
            ]);
        } catch (Throwable $th) {
            Log::error('Failed to create job vacancy: ' . $th->getMessage());

            return redirect()->route('job.index')->with([
                'type' => 'error',
                'message' => 'Failed to create the job vacancy. Please try again.'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $job = $this->jobService->findJobById($id);
    
            if (!$job) {
                return redirect()->route('job.index')->with([
                    'type' => 'error',
                    'message' => 'Job vacancy not found.'
                ]);
            }
    
            return Inertia::render('Job/Edit', [
                'job' => $job
            ]);
        } catch (Throwable $th) {
            Log::error('Failed to edit job vacancy: ' . $th->getMessage());
    
            return redirect()->route('job.index')->with([
                'type' => 'error',
                'message' => 'Failed to edit the job vacancy. Please try again.'
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CreateRequest $request, string $id)
    {
        try {
            $job = JobVacancy::find($id);
            $this->jobService->updateJob($job,$request->validated());

            return redirect()->route('job.index')->with([
                'type' => 'success',
                'message' => 'Successfully updated a job'
            ]);
        } catch (Throwable $th) {
            Log::error('Failed to edit job vacancy: ' . $th->getMessage());

            return redirect()->route('job.index')->with([
                'type' => 'error',
                'message' => 'Failed to edit the job vacancy. Please try again.'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $job = JobVacancy::find($id);

            if (!$job) {
                return redirect()->route('job.index')->with([
                    'type' => 'error',
                    'message' => 'Job not found.'
                ]);
            }

            $this->jobService->deleteJob($job);

            return redirect()->route('job.index')->with([
                'type' => 'success',
                'message' => 'Successfully deleted a job.'
            ]);
        } catch (Throwable $th) {
            Log::error('Failed to delete job vacancy: ' . $th->getMessage());

            return redirect()->route('job.index')->with([
                'type' => 'error',
                'message' => 'Failed to delete job vacancy. Please try again later.'
            ]);
        }
    }
}