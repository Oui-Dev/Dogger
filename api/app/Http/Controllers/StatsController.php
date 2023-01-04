<?php

namespace App\Http\Controllers;

use App\Models\Error;
use App\Models\Project;
use Illuminate\Support\Carbon;


class StatsController extends Controller
{
    public function create() {
        $currentUser = request()->user();

        // Get statscard data
        // Get dates and dates N-1
        $startDate = date('Y-m-d H:i:s', strtotime('-1 day', strtotime('today midnight')));
        $startDateMinusOne = date('Y-m-d H:i:s', strtotime('-2 day', strtotime('today midnight')));
        $endDate = date('Y-m-d H:i:s');
        $endDateMinusOne = date('Y-m-d H:i:s', strtotime('-1 day', strtotime('today midnight')));

        // Get stats
        $projectsStats = [
            'title' => 'Total Projects',
            'value' => Project::where('user_id', $currentUser->id)->count(),
        ];
        $errorsStats = [
            'title' => 'Total Errors',
            'value' => Error::with('project')->whereHas('project', function ($query) use ($currentUser) {
                $query->where('user_id', $currentUser->id);
            })->count(),
        ];
        $newErrorsStats = [
            'title' => 'Last 24h errors',
            'value' => Error::with('project')->whereHas('project', function ($query) use ($currentUser) {
                    $query->where('user_id', $currentUser->id);
                })->whereBetween('created_at', [$startDate, $endDate])
                ->count(),
            'percentage' => Error::with('project')->whereHas('project', function ($query) use ($currentUser) {
                    $query->where('user_id', $currentUser->id);
                })->whereBetween('created_at', [$startDateMinusOne, $endDateMinusOne])
                ->count(),
        ];

        // Calculate percentage
        $newErrorsStats['percentage'] = $newErrorsStats['value'] / ($newErrorsStats['percentage'] === 0
            ? 1 : $newErrorsStats['percentage']);

        // Add sign
        $newErrorsStats['percentage'] = $newErrorsStats['percentage'] < 1 && $newErrorsStats['percentage'] > 0
            ? '-'.($newErrorsStats['percentage']*100).'%' : '+'.$newErrorsStats['percentage']*100 .'%';


        // Get graph data
        $errors = Error::where('timestamp', '>=', now()->subDays(7))->get();
        $errors = $errors->sort(function ($a, $b) {
            return strtotime($a->timestamp) - strtotime($b->timestamp);
        });
        
        $graphData = $errors->reduce(function ($acc, $error) {
            $errorDate = new Carbon($error->timestamp);
            $dayOfWeek = $errorDate->format('d-m-Y');
            $acc[$dayOfWeek] = isset($acc[$dayOfWeek]) ? $acc[$dayOfWeek] + 1 : 1;
            return $acc;
        }, []);

        return response()->json([
            'state' => 'success',
            'data' => [
                'graph' => $graphData,
                'cards' => [
                    $projectsStats,
                    $errorsStats,
                    $newErrorsStats,
                ]
            ]
        ]);
    }
}
