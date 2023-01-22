<?php

namespace App\Http\Controllers;

use App\Mail\ErrorAssignEmail;
use App\Traits\ApiErrorTrait;
use App\Models\Error;
use Illuminate\Support\Facades\Mail;

class ErrorsController extends Controller
{
    use ApiErrorTrait;

    public function list() {
        $currentUser = request()->user();
        $errors = Error::whereHas('project', function($query) use ($currentUser) {
            $query->where('user_id', $currentUser->id);
        })->with('project')->get();

        return response()->json([
            'state' => 'success',
            'errors' => $errors,
        ]);
    }

    public function create() {
        $data = request()->validate([
            'project_id' => ['required', 'integer'],
            'code' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string'],
            'path' => ['nullable', 'string', 'max:255'],
            'line' => ['nullable', 'string', 'max:255'],
            'timestamp' => ['nullable'],
        ]);

        Error::create([
            'project_id' => $data['project_id'],
            'code' => $data['code'],
            'message' => $data['message'],
            'path' => $data['path'],
            'line' => $data['line'],
            'timestamp' => $data['timestamp'] ?? now(),
            'status' => 0,
        ]);

        return response()->json([
            'state' => 'success',
        ]);
    }

    public function updateStatus(Error $error) {
        $this->hasAccess($error->project->user_id);

        $data = request()->validate([
            'status' => ['required', 'integer', 'min:0', 'max:3'],
        ]);

        $error->status = $data['status'];
        $error->save();

        return response()->json([
            'state' => 'success',
            'error' => $error,
            'message' => 'Error status updated !',
        ]);
    }

    public function assignTo(Error $error) {
        $this->hasAccess($error->project->user_id);

        $data = request()->validate([
            'email' => ['required','email:rfc,dns,spoof','max:255'],
        ]);

        Mail::to($data["email"])->send(new ErrorAssignEmail($error->project->name, $error->message));
        
        $error->assigned_to = $data['email'];
        $error->save();

        return response()->json([
            'state' => 'success',
            'error' => $error,
            'message' => 'Error assigned to '.$data['email'].' !',
        ]);
    }
}
