<?php

use App\Http\Controllers\API\ErrorsController;
use App\Http\Controllers\API\ProjectsController;
use App\Http\Controllers\API\UsersController;
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

Route::group(['middleware' => ['auth:sanctum']], function () {
    // Projects
    Route::group([
        'prefix' => 'projects',
        'controller' => ProjectsController::class
    ], function () {
        Route::get('/', 'list');
        Route::post('/create', 'create');
        Route::put('/edit/{project}', 'update');
        Route::delete('/delete/{project}', 'delete');
    });

    // Errors
    Route::group([
        'prefix' => 'errors',
        'controller' => ErrorsController::class
    ], function () {
        Route::get('/', 'list');
        Route::post('/create', 'create');
        Route::put('/status/{error}', 'updateStatus');
        Route::put('/assign/{error}', 'assignTo');
    });

    // Users
    Route::group([
        'prefix' => 'users',
        'controller' => UsersController::class
    ], function () {
        Route::get('/current', 'current');
        Route::post('/create', 'create');
        Route::put('/edit', 'update');
        Route::delete('/delete', 'delete');
    });
});