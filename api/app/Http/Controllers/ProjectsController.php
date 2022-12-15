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
        $currentUser = request()->user();

        $data = request()->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        Project::create([
            'user_id' => $currentUser->id,
            'name' => $data['name'],
        ]);

        return response()->json([
            'state' => 'success',
        ]);
    }

    public function update(Project $project) {
        if($project->user_id !== request()->user()->id) {
            return response()->json([
                'state' => 'error',
                'message' => 'You are not allowed to access to this ressource.',
            ], 403);
        }

        $data = request()->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $project->name = $data['name'];
        $project->save();

        return response()->json([
            'state' => 'success',
        ]);
    }

    public function delete(Project $project) {
        if($project->user_id !== request()->user()->id) {
            return response()->json([
                'state' => 'error',
                'message' => 'You are not allowed to access to this ressource.',
            ], 403);
        }

        $project->delete();

        return response()->json([
            'state' => 'success',
        ]);
    }
}
