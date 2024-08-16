<?php

namespace App\Http\Controllers\API;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Application\CreateRequest;
use App\Models\Application;
use App\Models\JobVacancy;
use App\Notifications\JobAppliedNotification;
use App\Services\ApplicationService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class ApplicationController extends Controller
{
    protected $applicationService;

    public function __construct(ApplicationService $applicationService)
    {
        $this->applicationService = $applicationService;
    }

    public function index()
    {
        try {
            $applications = Application::with('jobVacancy')->get();
            return ResponseFormatter::success([
                'applications' => $applications
            ], 'Successfully get all applications');
        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Failed Get Data Applications', 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRequest $request)
    {
        try {
            $application = $this->applicationService->createApplication($request->validated());
            $application->load('jobVacancy');
            $application->notify(new JobAppliedNotification($application));

            return ResponseFormatter::success([
                'application' => $application
            ], 'Successfully submit application');
        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Failed submit application', 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $application = $this->applicationService->findApplicationById($id);
            return ResponseFormatter::success([
                'application' => $application
            ], 'Successfully get a application');
        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Failed get application', 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function apply(string $slug)
    {
        try {
            $job = JobVacancy::where('slug', $slug)->first();
            return ResponseFormatter::success([
                'application' => $job
            ], 'Successfully get job by slug');
        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Failed get job by slug', 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $application = Application::find($id);
            $this->applicationService->deleteApplication($application);
            return ResponseFormatter::success('Successfully deleted application');
        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Failed deleted application', 500);
        }

    }
}
