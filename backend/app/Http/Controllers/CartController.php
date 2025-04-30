<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $data = CartItem::where('user_id', $user->id)->with('product')->get();
        if (!$data) {
            return response()->json(['status' => 'failed', 'message' => 'User not found'], 404);
        }
        return response()->json(['status' => 'success', 'data' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|numeric',
            'quantity' => 'required|numeric|min:1|integer',
        ]);

        $user = Auth::user();
        $product = Product::find($validated['product_id']);
        if (!$product) {
            return response()->json(['status' => 'failed', 'message' =>  'Product not found'], 404);
        }
        $hasProduct = CartItem::where('product_id', $validated['product_id'])->where('user_id', $user->id)->exists();
        $cartProduct = CartItem::where('product_id', $validated['product_id'])->where('user_id', $user->id)->first();

        if ($hasProduct) {
            $cartProduct->quantity += $validated['quantity'];
            $cartProduct->save();
            return response()->json(['status' => 'success', 'message' => 'This product has been added to cart'], 200);
        }

        if ($product->stock < $validated['quantity']) {
            return response()->json(['status' => 'failed', 'message' => "This product doesn't have enough stock to"], 422);
        }

        $data = CartItem::create([
            'user_id' => $user->id,
            'product_id' => $validated['product_id'],
            'quantity' => $validated['quantity'],
        ]);

        return response()->json(['status' => 'success', 'message' => 'This product has been added to cart', 'data' => $data], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function increase($id)
    {
        $user = Auth::user();
        $cartItem = CartItem::find($id);
        if (!$cartItem) {
            return response()->json(['status' => 'failed', 'message' =>  'Cart item not found'], 404);
        }
        $product = Product::findOrFail($cartItem->product_id);
        if ($product->stock <= $cartItem->quantity) {
            return response()->json(['status' => 'failed', 'message' =>  "This product doesn't have enough stock"], 422);
        }
        $cartItem->quantity += 1;
        $cartItem->save();

        return response()->noContent();
    }

    public function decrease($id)
    {
        $cartItem = CartItem::find($id);

        if (!$cartItem) {
            return response()->json(['status' => 'failed', 'message' =>  'Cart item not found'], 404);
        }
        if ($cartItem->quantity === 1) {
            $cartItem->delete();
            return response()->json(['status' => 'success', 'message' =>  'This cart item has been removed'], 200);

        }
        $cartItem->quantity -= 1;
        $cartItem->save();

        return response()->noContent();
    }
}
