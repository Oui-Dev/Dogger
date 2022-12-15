<?php

namespace App\Http\Controllers;

use App\Traits\ApiErrorTrait;
use App\Models\Project;

class ProjectsController extends Controller
{
    use ApiErrorTrait;

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
        $this->hasAccess($project->user_id);

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
        $this->hasAccess($project->user_id);

        $project->delete();

        return response()->json([
            'state' => 'success',
        ]);
    }
}
