<?php

namespace Database\Seeders;

use App\Models\ghengoi;
use App\Models\phongchieu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhongChieuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('phongchieus')->insert(
            [
                [
                    "ten_phong" => "CINEMA 01",
                    "soluong_day" => 5,
                    "soluong_cot" => 8,
                ],
                [
                    "ten_phong" => "CINEMA 02",
                    "soluong_day" => 5,
                    "soluong_cot" => 8,
                ],
                [
                    "ten_phong" => "CINEMA 03",
                    "soluong_day" => 5,
                    "soluong_cot" => 8,
                ]
            ]
        );
    }
}
