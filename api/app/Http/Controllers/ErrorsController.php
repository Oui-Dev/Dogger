<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Error;

class ErrorsController extends Controller
{
    public function list() {
        $currentUser = request()->user();
        $errors = Error::where('user_id', $currentUser->id)->get();

        return response()->json([
            'state' => 'success',
            'errors' => $errors,
        ]);
    }

    public function create() {
        
    }

    public function updateStatus() {
        
    }

    public function assignTo() {
        
    }
}
