<?php

namespace App\Http\Controllers\API;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Job\CreateRequest;
use App\Models\JobVacancy;
use App\Services\JobService;
use Exception;

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
            $jobs = JobVacancy::all();
            return ResponseFormatter::success([
                'jobs' => $jobs
            ], 'Successfully get all jobs');
        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Failed Get Data jobs', 500);
        }

    }

    public function store(CreateRequest $request)
    {
        try {
            $job = $this->jobService->createJob($request->validated());
            return ResponseFormatter::success([
                'job' => $job
            ], 'Successfully created a job');

        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Failed create a job', 500);
        }
    }

    public function edit(string $id)
    {
        try {
            $job = $this->jobService->findJobById($id);
            return ResponseFormatter::success([
                'job' => $job
            ], 'Successfully get a job');
        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Failed get a job', 500);
        }
    }

    public function update(CreateRequest $request, string $id)
    {
        try {
            $job = JobVacancy::find($id);
            $job = $this->jobService->updateJob($job,$request->validated());

            return ResponseFormatter::success([
                'job' => $job
            ], 'Successfully updated a job');
        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Failed to update the job vacancy', 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $job = JobVacancy::find($id);
            $this->jobService->deleteJob($job);
            return response()->json([
                'type' => 'success',
                'message' => 'Successfully deleted a job',
            ]);
            return ResponseFormatter::success('Successfully deleted a job');
        } catch (Exception $error) {
            return ResponseFormatter::error([
                'message' => 'Something went wrong',
                'error' => $error
            ], 'Failed to delete the job vacancy', 500);
        }
    }
}
