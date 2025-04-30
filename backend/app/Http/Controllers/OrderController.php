<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Nette\Utils\Random;
use PhpParser\Node\Expr\Cast\String_;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $per_page = $request->query('per_page', 10);
        $orders = Order::when($search, fn($q) => $q->whereHas('user', fn($q) => $q->where('name', $search)))
            ->when($status, fn($q) => $q->where('status', $status))
            ->where('deleted_at', null)
            ->paginate($per_page);
        $orders->items();

        foreach ($orders->items() as $item) {
            $shipping_address = Address::find($item->shipping_address_id);
            $billing_address = Address::find($item->billing_address_id);
            $item['shipping_address'] = $shipping_address->name;
            $item['billing_address'] = $billing_address->name;
        }

        return response()->json([
            'status' => 'success',
            'totalElements' => $orders->total(),
            'page' => $orders->currentPage(),
            'data' => $orders->items(),
        ], 200);
    }

    public function userIndex()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)
            ->where('deleted_at', null)->get();

        foreach ($orders as $item) {
            $shipping_address = Address::find($item->shipping_address_id);
            $billing_address = Address::find($item->billing_address_id);
            $item['shipping_address'] = $shipping_address->name;
            $item['billing_address'] = $billing_address->name;
        }

        return response()->json(['status' => 'success', 'data' => $orders], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'payment_method' => 'required|in:e-money,credit,paypal,bank,cash',
            'shipping_address_id' => 'required|numeric',
            'billing_address_id' => 'required|numeric',
            'shipping_method' => 'required|in:normal,express,cargo,instant',
        ]);

        $user = Auth::user();

        $checkCart = CartItem::where('user_id', $user->id)->exists();


        if (!$checkCart) {
            return response()->json(['status' => 'failed', 'message' => "Cart can't be empty"], 422);
        }

        $checkBillAddress = Address::where('user_id', $user->id)->where('id', $validated['billing_address_id'])->exists();
        $checkShipAddress = Address::where('user_id', $user->id)->where('id', $validated['shipping_address_id'])->exists();

        if (!$checkBillAddress || !$checkShipAddress) {
            return response()->json(['status' => 'failed', 'message' => 'The address are invalid'], 422);
        }

        $cart_items = CartItem::where('user_id', $user->id)->get();

        $total_price = 0;
        $shipping_cost = 0;
        $estimated_delivery_date = null;
        $random = rand(100000, 999999);
        $order_number = 'TR00' . $random . $user->id;

        foreach ($cart_items as $item) {
            $total_price += $item->product->price;
        }

        if ($validated['shipping_method'] === "normal") {
            $shipping_cost = 10000;
            $estimated_delivery_date = Carbon::now()->addDays(4);
        } elseif ($validated['shipping_method'] === "express") {
            $shipping_cost = 20000;
            $estimated_delivery_date = Carbon::now()->addDays(3);
        } elseif ($validated['shipping_method'] === "cargo") {
            $shipping_cost = 30000;
            $estimated_delivery_date = Carbon::now()->addDays(2);
        } elseif ($validated['shipping_method'] === "instant") {
            $shipping_cost = 40000;
            $estimated_delivery_date = Carbon::now()->addDays(1);
        }

        $data = Order::create([
            'user_id' => $user->id,
            'total_price' => $total_price,
            'status' => 'pending',
            'shipping_address_id' => $validated['shipping_address_id'],
            'billing_address_id' => $validated['billing_address_id'],
            'payment_method' => $validated['payment_method'],
            'shipping_method' =>  $validated['shipping_method'],
            'shipping_cost' => $shipping_cost,
            'estimated_delivery_date' => $estimated_delivery_date->format('Y-m-d h:i:s'),
            'order_number' => $order_number,
        ]);

        foreach ($cart_items as $item) {
            OrderItem::create([
                'order_id' => $data->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price,
            ]);

            $product = Product::find($item->product_id);
            $product->stock -= $item->quantity;
            $product->save();

            $item->delete();
        }

        return response()->json(['status' => 'success', 'message' => 'Order has been created', 'data' => $data], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $user = Auth::user();
        $shipping_address = Address::find($order->shipping_address_id);
        $billing_address = Address::find($order->billing_address_id);

        if ($order->deleted_at !== null) {
            return response()->json(['status' => 'failed', 'message' =>  'Order not found'], 404);
        }

        $data = $order->with('order_items')->withWhereHas('order_items', fn($q) => $q->with('product'))->get();
        $data['shipping_address'] = $shipping_address->name;
        $data['billing_address'] = $billing_address->name;
        if (($order->user_id !== $user->id) || $user->role === 'admin') {
            return response()->json(['status' => 'success', 'data' => $data], 200);
        }
        return response()->json(['status' => 'aborted', 'message' =>  "You doesn't have access to this order"], 403);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        if (!$order->exists()) {
            return response()->json(['status' => 'failed', 'message' =>  'Order not found'], 404);
        }
        if ($order->deleted_at !== null) {
            return response()->json(['status' => 'failed', 'message' =>  'Order not found'], 404);
        }
        $validated = $request->validate([
            'status' => 'required|in:pending,paid,shipped,delivered',
        ]);

        $order->status = $validated['status'];
        $order->save();

        return response()->json(['status' => 'success', 'message' =>  "You has been updated this order"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        if (!$order->exists()) {
            return response()->json(['status' => 'failed', 'message' =>  'Order not found'], 404);
        }

        if ($order->deleted_at !== null) {
            return response()->json(['status' => 'failed', 'message' =>  'Order not found'], 404);
        }

        $order->deleted_at = Carbon::now();
        $order->save();

        return response()->json(['status' => 'success', 'message' =>  "You has been delete this order"], 200);
    }
}
