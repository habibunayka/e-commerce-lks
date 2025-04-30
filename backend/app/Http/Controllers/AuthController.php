<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|max:50',
        ]);

        if (Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])) {
            $user = Auth::user();
            $token = $user->createToken('LKS_TOKEN')->plainTextToken; // ini emang bisa yah
            return response()->json(['status' => 'success', 'message' => 'You has been logged in', 'token' => $token, 'user' => $user], 200);
        }
        return response()->json(['status' => 'failed', 'message' => 'Your email or password is incorrect'], 402);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|regex:/^[A-Za-z\s\-]+$/',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|max:50|confirmed',
            'password_confirmation' => 'required|min:8|max:50'
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        if (Auth::attempt(['email' => $validated['email'], 'password' => $request['password']])) {
            $user = Auth::user();
            $token = $user->createToken('LKS_TOKEN')->plainTextToken; // ini emang bisa yah!!
            return response()->json(['status' => 'success', 'message' => 'You has been registered', 'token' => $token, 'user' => $user]);
        }
        return response()->json(['status' => 'failed', 'message' => 'Your email or password is incorrect'], 402);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['status' => 'success', 'message' => 'You has been logged out'], 200);
    }
}
