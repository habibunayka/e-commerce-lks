<?php

namespace Database\Seeders;

use App\Models\Address;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $addresses = [
            [
                'user_id' => 1,
                'name' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Harum enim quod unde nostrum tempora, quas iste possimus?
Sit minus',
                'is_primary' => true
            ],
            [
                'user_id' => 1,
                'name' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Harum enim quod unde nostrum tempora, quas iste possimus?
Sit minus',
                'is_primary' => false
            ],
            [
                'user_id' => 2,
                'name' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Harum enim quod unde nostrum tempora, quas iste possimus?
Sit minus',
                'is_primary' => true
            ],
            [
                'user_id' => 2,
                'name' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Harum enim quod unde nostrum tempora, quas iste possimus?
Sit minus',
                'is_primary' => false
            ],
            [
                'user_id' => 3,
                'name' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Harum enim quod unde nostrum tempora, quas iste possimus?
Sit minus',
                'is_primary' => true
            ],
            [
                'user_id' => 4,
                'name' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Harum enim quod unde nostrum tempora, quas iste possimus?
Sit minus',
                'is_primary' => false
            ],
            [
                'user_id' => 4,
                'name' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Harum enim quod unde nostrum tempora, quas iste possimus?
Sit minus',
                'is_primary' => true
            ],
            [
                'user_id' => 4,
                'name' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Harum enim quod unde nostrum tempora, quas iste possimus?
Sit minus',
                'is_primary' => false
            ],
            [
                'user_id' => 5,
                'name' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.
Harum enim quod unde nostrum tempora, quas iste possimus?
Sit minus',
                'is_primary' => true
            ],
        ];

        foreach ($addresses as $address) {
            Address::create($address);
        }
    }
}
