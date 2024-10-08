<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function get() {
        $user = request()->user();

        return response()->json([
            'state' => 'success',
            'user' => $user,
        ]);
    }

    public function update() {
        $user = request()->user();

        $data = request()->validate([
            'lastname' => ['nullable', 'string', 'max:255'],
            'firstname' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable','email:rfc,dns,spoof','max:255', Rule::unique('users')->ignore($user->id)],
            'old_password' => ['required_with:password', 'string', function($attribute, $value, $fail) use ($user) {
                if(!Hash::check($value, $user->password)) {
                    $fail('Current password is incorrect');
                }
            }],
            'password' => ['required_with:old_password', 'confirmed', Password::min(8)->letters()->mixedCase()->numbers()],
        ]);

        $user->lastname = $data['lastname'] ?? $user->lastname;
        $user->firstname = $data['firstname'] ?? $user->firstname;
        $user->email = $data['email'] ?? $user->email;
        if(isset($data['password'])) $user->password = $data['password'];
        $user->save();

        return response()->json([
            'state' => 'success',
            'message' => 'User updated !',
        ]);
    }

    public function delete() {
        $user = request()->user();

        if($user->projects()->count() > 0) {
            return response()->json([
                'type' => 'error',
                'message' => 'You can\'t delete your account because you have projects.',
            ], 422);
        }

        $user->delete();

        return response()->json([
            'type' => 'success',
            'message' => 'User deleted !',
        ]);
    }
}
