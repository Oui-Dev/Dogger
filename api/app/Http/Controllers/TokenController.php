<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
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

        if (!$logged) {
            return response()->json([
                'state' => 'error',
                'message' => 'Invalid credentials',
            ], 422);
        }

        return response()->json([
            'state' => 'success',
            'token' => $user->createToken($data['device_name'])->plainTextToken,
        ]);
    }

    public function register() {
        $data = request()->validate([
            'lastname' => ['required', 'string', 'max:255'],
            'firstname' => ['required', 'string', 'max:255'],
            'email' => ['required','email:rfc,dns,spoof','max:255', Rule::unique('users')],
            'password' => ['required', 'confirmed', Password::min(8)->letters()->mixedCase()->numbers()],
            'device_name' => 'required',
        ]);

        $user = User::create([
            'email' => $data['email'],
            'password' => $data['password'],
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
        ]);

        return response()->json([
            'state' => 'success',
            'token' => $user->createToken($data['device_name'])->plainTextToken,
        ]);
    }

    public function devices() {
        $user = request()->user();
        $devices = $user->tokens()->orderBy('last_used_at', 'desc')->get();

        return response()->json([
            'state' => 'success',
            'devices' => $devices,
        ]);
    }

    public function revoke($id) {
        $user = request()->user();
        $user->tokens()->where('id', $id)->delete();

        return response()->json([
            'state' => 'success',
            'message' => 'Logged out',
        ]);
    }

    public function revokeAll() {
        request()->user()->tokens()->delete();

        return response()->json([
            'state' => 'success',
            'message' => 'Logged out from all devices !',
        ]);
    }
}
