<?php

use App\Http\Controllers\API\ApplicationController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\JobController;
use Illuminate\Support\Facades\Route;

Route::get('/job', [JobController::class,'index']);
Route::get('/job/apply/{slug}', [ApplicationController::class,'apply']);
Route::post('/application', [ApplicationController::class,'store']);

Route::post('login', [AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/job', [JobController::class,'store']);
    Route::get('/job/{id}', [JobController::class,'edit']);
    Route::put('/job/{id}', [JobController::class,'update']);
    Route::delete('/job/{id}', [JobController::class,'destroy']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/application', [ApplicationController::class,'index']);
    Route::get('/application/{id}', [ApplicationController::class,'show']);
    Route::delete('/application/{id}', [ApplicationController::class, 'destroy']);
});
