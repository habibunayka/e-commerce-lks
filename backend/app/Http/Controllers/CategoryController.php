<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json(['status' => 'success', 'data' => $categories], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:30|regex:/^[A-Za-z\-\s]+$/'
        ]);

        Category::create($validated);
        return response()->json(['status' => 'success', 'message' =>  $validated . ' category has been created'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'nullable|min:3|max:30|regex:/^[A-Za-z\-\s]+$/'
        ]);

        if (!$category) {
            return response()->json(['status' => 'failed', 'message' =>  'Category not found'], 404);
        }

        if (!$validated) {
            return response()->json(['status' => 'failed', 'message' =>  'There is nothing changes'], 200);
        }

        $category->update($validated ?? $category);
        return response()->json(['status' => 'success', 'message' =>  $request->name . ' category has been updated to ' . $validated['name']], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if (!$category) {
            return response()->json(['status' => 'failed', 'message' =>  'Category not found'], 404);
        }
        $category->delete();
        return response()->json(['status' => 'success', 'message' =>  $category->name . ' category has been deleted'], 200);
    }
}
