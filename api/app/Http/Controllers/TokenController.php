<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class TokenController extends Controller
{
    public function login() {
        $data = request()->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);
     
        $user = User::where('email', $data['email'])->first();
        $logged = ($user && Hash::check($data['password'], $user->password));

        return response()->json([
            'state' => $logged ? 'Logged' : 'Error',
            'token' => $logged ? $user->createToken($data['device_name'])->plainTextToken : null,
        ], $logged ? 200 : 204);
    }

    public function devices() {
        $user = request()->user();

        return response()->json([
            'state' => 'success',
            'devices' => $user->tokens()->get(),
        ]);
    }

    public function revoke($token = null) {
        $user = request()->user();
        $token = $token ? hash('sha256', substr($token, 2)) : $user->currentAccessToken()->token;

        $user->tokens()->where('token', $token)->delete();

        return response()->json([
            'state' => 'success',
        ]);
    }

    public function revokeAll() {
        request()->user()->tokens()->delete();

        return response()->json([
            'state' => 'success',
        ]);
    }
}
