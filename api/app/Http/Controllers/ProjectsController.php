<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;

class ProjectsController extends Controller
{
    public function list() {
        $currentUser = request()->user();
        $projects = Project::where('user_id', $currentUser->id)->get();

        return response()->json([
            'state' => 'success',
            'projects' => $projects,
        ]);
    }

    public function create() {
        
    }

    public function update() {
        
    }

    public function delete() {
        
    }
}
