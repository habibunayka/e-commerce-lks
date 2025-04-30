<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductVariation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Asus TUF',
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Ducimus sunt minus accusantium quis iste delectus magnam excepturi',
                'price' => 100,
                'stock' => 5,
                'category_id' => 2,
                'image_url' => 'products/asus-tuf.png',
                'is_featured' => true,
            ],
            [
                'name' => 'Casing',
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Ducimus sunt minus accusantium quis iste delectus magnam excepturi',
                'price' => 200,
                'stock' => 2,
                'category_id' => 4,
                'image_url' => 'products/casing.png',
                'is_featured' => true,
            ],
            [
                'name' => 'Galaxy A15',
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Ducimus sunt minus accusantium quis iste delectus magnam excepturi',
                'price' => 300,
                'stock' => 1,
                'category_id' => 1,
                'image_url' => 'products/galaxy-a15.png',
                'is_featured' => false,
            ],
            [
                'name' => 'Intel N95',
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Ducimus sunt minus accusantium quis iste delectus magnam excepturi',
                'price' => 400,
                'stock' => 10,
                'category_id' => 2,
                'image_url' => 'products/intel-n95.png',
                'is_featured' => false,
            ],
            [
                'name' => 'Megabook T1',
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Ducimus sunt minus accusantium quis iste delectus magnam excepturi',
                'price' => 500,
                'stock' => 20,
                'category_id' => 2,
                'image_url' => 'products/megabook-t1.png',
                'is_featured' => false,
            ],
        ];

        $product_variations = [
            [
                'product_id' => 1,
                'name' => 'Variasi 1'
            ],
            [
                'product_id' => 1,
                'name' => 'Variasi 2'
            ],
            [
                'product_id' => 2,
                'name' => 'Variasi 1'
            ],
            [
                'product_id' => 2,
                'name' => 'Variasi 2'
            ],
            [
                'product_id' => 2,
                'name' => 'Variasi 3'
            ],
            [
                'product_id' => 2,
                'name' => 'Variasi 4'
            ],
            [
                'product_id' => 3,
                'name' => 'Variasi 1'
            ],
            [
                'product_id' => 4,
                'name' => 'Variasi 1'
            ],
            [
                'product_id' => 5,
                'name' => 'Variasi 2'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
        foreach ($product_variations as $product_variation) {
            ProductVariation::create($product_variation);
        }
    }
}
