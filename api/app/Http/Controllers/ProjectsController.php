<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
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
            'name' => ['required', 'string', 'max:255', Rule::unique('projects')],
        ]);

        $project = Project::create([
            'user_id' => $currentUser->id,
            'name' => $data['name'],
            'key' => bin2hex(random_bytes(16)).'/'.Str::slug($data['name']),
        ]);

        return response()->json([
            'state' => 'success',
            'project' => $project,
            'message' => 'Project created !',
        ]);
    }

    public function update(Project $project) {
        $this->hasAccess($project->user_id);

        $data = request()->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('projects')->ignore($project->id)],
        ]);

        $newKey = str_replace(Str::slug($project->name), Str::slug($data['name']), $project->key);
        $project->name = $data['name'];
        $project->key = $newKey;
        $project->save();

        return response()->json([
            'state' => 'success',
            'project' => $project,
            'message' => 'Project updated !',
        ]);
    }

    public function delete(Project $project) {
        $this->hasAccess($project->user_id);

        $project->delete();

        return response()->json([
            'state' => 'success',
            'message' => 'Project deleted !',
        ]);
    }
}
