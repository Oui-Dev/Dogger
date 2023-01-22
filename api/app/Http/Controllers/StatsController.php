<?php

namespace App\Http\Controllers;

use App\Models\Error;
use App\Models\Project;

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
        $graphData = [];
        for ($i = 0; $i < 7; $i++) {
            $graphData[date('d-m-Y', strtotime('-'.$i.' day', strtotime('today midnight')))] = 0;
        }

        $errors = Error::where('timestamp', '>=', now()->subDays(7))->get();
        
        foreach ($errors as $error) {
            $date = date('d-m-Y', strtotime($error->timestamp));
            if(isset($graphData[$date])) $graphData[$date]++;
        }

        return response()->json([
            'state' => 'success',
            'data' => [
                'graph' => array_reverse($graphData),
                'cards' => [
                    $projectsStats,
                    $errorsStats,
                    $newErrorsStats,
                ]
            ]
        ]);
    }
}
