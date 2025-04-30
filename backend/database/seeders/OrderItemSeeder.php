<?php

namespace Database\Seeders;

use App\Models\OrderItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $order_items = [
            [
                'user_id' => 1,
                'product_id' => 1,
                'quantity' => 2,
                'price' => 2000000

            ],
            [
                'user_id' => 2,
                'product_id' => 2,
                'quantity' => 2,
                'price' => 4000000

            ],
            [
                'user_id' => 3,
                'product_id' => 3,
                'quantity' => 2,
                'price' => 6000000

            ],
            [
                'user_id' => 4,
                'product_id' => 4,
                'quantity' => 2,
                'price' => 8000000

            ],
            [
                'user_id' => 5,
                'product_id' => 5,
                'quantity' => 2,
                'price' => 10000000
            ],
        ];

        foreach($order_items as $order_item) {
            OrderItem::create($order_item);
        }
    }
}
