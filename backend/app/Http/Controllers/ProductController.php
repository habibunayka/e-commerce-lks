<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\product;
use App\Models\ProductVariation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $category = $request->query('category');
        $search = $request->query('search');
        $is_featured = $request->query('is_featured');
        $per_page = $request->query('per_page', 10);

        $products = Product::when($category, fn($q) => $q->whereHas('category', fn($q) => $q->where('id', $category)))
            ->when($search, fn($q) => $q->where('name', 'like', '%' . $search . '%'))
            ->with('category')
            ->when($is_featured == true, fn($q) => $q->where('is_featured', true))
            ->paginate($per_page);

        return response()->json([
            'status' => 'success',
            'totalElements' => $products->total(),
            'page' => $products->currentPage(),
            'data' => $products->items(),
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:100|regex:/^[A-Za-z0-9\s\-]+$/',
            'description' => 'required|max:300',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|numeric',
            'image_url' => 'required|file|mimes:png,jpg,jpeg',
            'product_variations' => 'required|array|min:1',
            'product_variations.*' => 'required|max:20',
            'is_featured' => 'required|boolean'
        ]);

        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('products', 'public');
            $validated['image_url'] = $path;
        }

        $data = Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'category_id' => $validated['category_id'],
            'image_url' => $validated['image_url'],
            'is_featured' => $validated['is_featured'],

        ]);

        foreach ($request->product_variations as $product_variation) {
            ProductVariation::create([
                'name' => $product_variation,
                'product_id' =>  $data->id,
            ]);
        }

        $data['product_variations'] = $request->product_variations;

        return response()->json(['status' => 'success', 'message' => 'Your product has been created', 'data' => $data], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        if (!$product) {
            return response()->json(['status' => 'failed', 'message' =>  'Product not found'], 404);
        }
        return response()->json(['status' => 'success', 'data' => $product->load(['category', 'product_variations'])], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'nullable|min:3|max:100|regex:/^[A-Za-z0-9\s\-_]+$/',
            'description' => 'nullable|max:300',
            'price' => 'nullable|numeric',
            'stock' => 'nullable|numeric',
            'category_id' => 'nullable|numeric',
            'image_url' => 'nullable',
            'product_variations' => 'nullable|array',
            'product_variations.*' => 'nullable|max:20',
            'is_featured' => 'nullable|boolean',
        ]);

        if (!$product) {
            return response()->json(['status' => 'failed', 'message' =>  'Product not found'], 404);
        }

        if ($request->product_variations) {
            foreach ($product->product_variations as $variations) {
                $variations->delete();
            }

            foreach ($request->product_variations as $product_variation) {
                ProductVariation::create([
                    'product_id' => $product->id,
                    'name' => $product_variation
                ]);
            }
        }

        if ($request->hasFile('image_url')) {
            if (Storage::exists($product['image_url'])) {
                Storage::delete($product['image_url']);
            }
            $path = $request->file('image_url')->store('products', 'public');
            $validated['image_url'] = $path;
        }

        $product->update([
            'name' => $validated['name'] ?? $product['name'],
            'description' => $validated['description'] ?? $product['description'],
            'price' => $validated['price'] ?? $product['price'],
            'stock' => $validated['stock'] ?? $product['stock'],
            'category_id' => $validated['category_id'] ?? $product['category_id'],
            'image_url' => $validated['image_url'] ?? null,
            'is_featured' => $validated['is_featured'] ?? $product['is_featured'],
        ]);

        return response()->json(['status' => 'success', 'message' => 'Your product has been updated', 'data' => $product], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if (!$product) {
            return response()->json(['status' => 'failed', 'message' =>  'Product not found'], 404);
        }

        $product->delete();
        if (Storage::exists($product['image_url'])) {
            Storage::delete($product['image_url']);
        }

        return response()->json(['status' => 'success', 'message' => $product->name . ' product has been deleted'], 200);
    }
}
