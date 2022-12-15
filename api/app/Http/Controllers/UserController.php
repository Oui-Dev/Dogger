<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function current() {
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
            'old_password' => ['nullable', 'string', 'min:8', 'max:255', function($attribute, $value, $fail) use ($user) {
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
        ]);
    }

    public function delete() {
        $user = request()->user();
        $user->delete();

        return response()->json([
            'type' => 'success',
            'message' => 'L\'utilisateur a été supprimé.',
        ]);
    }
}
