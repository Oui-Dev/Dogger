<?php

use App\Http\Controllers\StatsController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\ErrorsController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::group([
    'controller' => TokenController::class
], function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
});

// Project Keys routes
Route::post('/errors/new', [ErrorsController::class, 'create'])->middleware('project_key');

// Authenticated routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/stats', [StatsController::class, 'create']);
    Route::get('/users/devices', [TokenController::class, 'devices']);
    Route::delete('/logout/{token}', [TokenController::class, 'revoke']);

    // Projects
    Route::group([
        'prefix' => 'projects',
        'controller' => ProjectsController::class
    ], function () {
        Route::get('/', 'list');
        Route::post('/new', 'create');
        Route::put('/edit/{project}', 'update');
        Route::delete('/delete/{project}', 'delete');
    });

    // Errors
    Route::group([
        'prefix' => 'errors',
        'controller' => ErrorsController::class
    ], function () {
        Route::get('/', 'list');
        Route::put('/status/{error}', 'updateStatus');
        Route::put('/assign/{error}', 'assignTo');
    });

    // Users
    Route::group([
        'prefix' => 'users',
        'controller' => UserController::class
    ], function () {
        Route::get('/current', 'get');
        Route::put('/edit', 'update');
        Route::delete('/delete', 'delete');
    });
});