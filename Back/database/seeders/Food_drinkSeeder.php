<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Food_drinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('food_drinks')->insert(
            [
                [
                    "ten" => "Bắp lớn",
                    "gia" => 20000,
                ],
                [
                    "ten" => "Bắp nhỏ",
                    "gia" => 10000,
                ],
                [
                    "ten" => "Coca-Cola ly lớn",
                    "gia" => 16000,
                ],
                [
                    "ten" => "Coca-Cola ly nhỏ",
                    "gia" => 8000,
                ],
            ]
        );
    }
}
