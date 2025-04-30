<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $categories = Address::where('user_id', $user->id)->get();
        return response()->json(['status' => 'success', 'data' => $categories], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'name' => 'required|min:3|max:100',
            'is_primary' => 'required|boolean'
        ]);

        $hasAddress = Address::count();

        $data = Address::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'is_primary' => $validated['is_primary']
        ]);
        return response()->json(['status' => 'success', 'message' =>  'Your address has been created', 'data' => $data], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Address $address)
    {
        $user = Auth::user();
        if ($user->id === $address->user_id) {
            $categories = Address::find($address);
            return response()->json(['status' => 'success', 'data' => $categories], 200);
        }
        return response()->json(['status' => 'aborted', 'data' => "You doesn't have access to this user"], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Address $address)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'nullable|min:3|max:100',
            'is_primary' => 'nullable|boolean'
        ]);
        if ($user->id === $address->user_id) {

            if (!$address) {
                return response()->json(['status' => 'failed', 'message' =>  'Address not found'], 404);
            }

            if (!$validated) {
                return response()->json(['status' => 'failed', 'message' =>  'There is nothing changes'], 200);
            }

            $user = Auth::user();

            $address->update([
                'user_id' => $user->id,
                'name' => $validated['name'] ?? $address['name'],
                'is_primary' => $validated['is_primary'] ?? $address['name'],
            ]);
            return response()->json(['status' => 'success', 'message' =>  'Your address has been updated'], 200);
        }
        return response()->json(['status' => 'aborted', 'data' => "You doesn't have access to this user"], 403);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address)
    {
        if (!$address) {
            return response()->json(['status' => 'failed', 'message' =>  'Address not found'], 404);
        }
        $user = Auth::user();
        if ($user->id === $address->user_id) {
            $address->delete();
            return response()->json(['status' => 'success', 'message' =>  $address->name . ' address has been deleted'], 200);
        }
        return response()->json(['status' => 'aborted', 'data' => "You doesn't have access to this user"], 403);
    }
}
