<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::resource('/products', ProductController::class)->only(['show', 'index']);
Route::resource('/categories', CategoryController::class)->only('index');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('/addresses', AddressController::class);
    Route::get('/orders', [OrderController::class, 'userIndex']);
    Route::resource('/orders', OrderController::class)->only('show', 'store');
    Route::resource('/carts', CartController::class)->only(['index', 'store']);
    Route::put('/carts/{id}/increase', [CartController::class, 'increase']);
    Route::put('/carts/{id}/decrease', [CartController::class, 'decrease']);
});

Route::middleware(['is-admin', 'auth:sanctum'])->group(function () {
    Route::resource('/admin/orders', OrderController::class)->only('index', 'update', 'destroy');
    Route::resource('/admin/products', ProductController::class);
    Route::resource('/admin/categories', CategoryController::class);
});
