<?php

namespace Database\Seeders;

use App\Models\CartItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cart_items = [
            [
                'user_id' => 3,
                'product_id' => 1,
                'quantity' => 2
            ],
            [
                'user_id' => 3,
                'product_id' => 2,
                'quantity' => 2
            ],
            [
                'user_id' => 4,
                'product_id' => 3,
                'quantity' => 1
            ],
            [
                'user_id' => 4,
                'product_id' => 4,
                'quantity' => 1
            ],
            [
                'user_id' => 5,
                'product_id' => 5,
                'quantity' => 1
            ],
        ];

        foreach ($cart_items as $cart_item) {
            CartItem::create($cart_item);
        }
    }
}
