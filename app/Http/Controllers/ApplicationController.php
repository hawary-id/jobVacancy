<?php

namespace App\Http\Controllers;

use App\Http\Requests\Application\CreateRequest;
use App\Models\Application;
use App\Notifications\JobAppliedNotification;
use App\Services\ApplicationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
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

            return Inertia::render('Application/Index',[
                'applications' => $applications
            ]);
        } catch (Throwable $th) {
            Log::error('Failed to get job applications data: ' . $th->getMessage());
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

            return redirect()->route('home')->with([
                'type' => 'success',
                'message' => 'Successfully apply a new job'
            ]);
        } catch (Throwable $th) {
            Log::error('Failed to apply job vacancy: ' . $th->getMessage());
            return redirect()->route('home')->with([
                'type' => 'error',
                'message' => 'Failed to apply the job vacancy. Please try again.'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $application = $this->applicationService->findApplicationById($id);
    
            if (!$application) {
                return redirect()->route('application.index')->with([
                    'type' => 'error',
                    'message' => 'application vacancy not found.'
                ]);
            }
    
            return Inertia::render('Application/Show', [
                'application' => $application
            ]);
        } catch (Throwable $th) {
            Log::error('Failed to view application: ' . $th->getMessage());
    
            return redirect()->route('application.index')->with([
                'type' => 'error',
                'message' => 'Failed to view the application. Please try again.'
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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

            if (!$application) {
                return redirect()->route('application.index')->with([
                    'type' => 'error',
                    'message' => 'application not found.'
                ]);
            }

            $this->applicationService->deleteApplication($application);

            return redirect()->route('application.index')->with([
                'type' => 'success',
                'message' => 'Successfully deleted a job.'
            ]);
        } catch (Throwable $th) {
            Log::error('Failed to delete application: ' . $th->getMessage());

            return redirect()->route('application.index')->with([
                'type' => 'error',
                'message' => 'Failed to delete application. Please try again later.'
            ]);
        }
    }
}
