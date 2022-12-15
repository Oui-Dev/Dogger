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

    public function updateStatus(Error $error) {
        if($error->user_id !== request()->user()->id) {
            return response()->json([
                'state' => 'error',
                'message' => 'You are not allowed to access to this ressource.',
            ], 403);
        }

        $data = request()->validate([
            'status' => ['required', 'integer', 'min:0', 'max:3'],
        ]);

        $error->status = $data['status'];
        $error->save();
    }

    public function assignTo(Error $error) {
        if($error->user_id !== request()->user()->id) {
            return response()->json([
                'state' => 'error',
                'message' => 'You are not allowed to access to this ressource.',
            ], 403);
        }

        $data = request()->validate([
            'email' => ['required','email:rfc,dns,spoof','max:255'],
        ]);

        // TODO : send un email to the user to notify him that he has been assigned to this error

        $error->assigned_to = $data['email'];
        $error->save();
    }
}
