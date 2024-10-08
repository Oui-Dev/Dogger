<?php

namespace App\Traits;

trait ApiErrorTrait {
    /**
     * Return error if user is not allowed to access to the ressource
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse|true
     */
    public function hasAccess(int $id) {
        if($id !== request()->user()->id) {
            return response()->json([
                'state' => 'error',
                'message' => 'You are not allowed to access to this ressource.',
            ], 403);
        }
        return true;
    }
}
