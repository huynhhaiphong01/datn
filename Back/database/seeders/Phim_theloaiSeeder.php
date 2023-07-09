<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Phim_theloaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('phim_theloais')->insert([
            [
                'theloai_id' => 4,
                'phim_id' => 1,
            ],
            [
                'theloai_id' => 10,
                'phim_id' => 1,            
            ],
            [
                'theloai_id' => 2,
                'phim_id' => 1,            
            ],
            [
                'theloai_id' => 8,
                'phim_id' => 2,            
            ]
            ,
            [
                'theloai_id' => 1,
                'phim_id' => 3,            
            ],
            [
                'theloai_id' => 2,
                'phim_id' => 3,            
            ]
            ,
            [
                'theloai_id' => 2,
                'phim_id' => 4,            
            ],
            [
                'theloai_id' => 3,
                'phim_id' => 4,            
            ],
            [
                'theloai_id' => 9,
                'phim_id' => 5,            
            ],
            [
                'theloai_id' => 10,
                'phim_id' => 5,            
            ],
            [
                'theloai_id' => 9,
                'phim_id' => 6,            
            ],
            [
                'theloai_id' => 2,
                'phim_id' => 6,            
            ],
            [
                'theloai_id' => 9,
                'phim_id' => 7,            
            ],
            [
                'theloai_id' => 10,
                'phim_id' => 7,            
            ],
            [
                'theloai_id' => 2,
                'phim_id' => 7,            
            ],
            [
                'theloai_id' => 10,
                'phim_id' => 8,            
            ],
            [
                'theloai_id' => 6,
                'phim_id' => 9,            
            ],
            [
                'theloai_id' => 10,
                'phim_id' => 10,            
            ],
            [
                'theloai_id' => 1,
                'phim_id' => 11,            
            ],
            [
                'theloai_id' => 2,
                'phim_id' => 11,            
            ],
            [
                'theloai_id' => 3,
                'phim_id' => 11,            
            ],
            [
                'theloai_id' => 6,
                'phim_id' => 12,            
            ],
            [
                'theloai_id' => 5,
                'phim_id' => 12,            
            ],
            [
                'theloai_id' => 10,
                'phim_id' => 13,            
            ],
            [
                'theloai_id' => 2,
                'phim_id' => 14,            
            ],
            [
                'theloai_id' => 3,
                'phim_id' => 14,            
            ],
            [
                'theloai_id' => 5,
                'phim_id' => 15,            
            ],
            [
                'theloai_id' => 7,
                'phim_id' => 16,            
            ],
            [
                'theloai_id' => 7,
                'phim_id' => 17,            
            ],
            [
                'theloai_id' => 10,
                'phim_id' => 18,            
            ],
            [
                'theloai_id' => 4,
                'phim_id' => 19,            
            ],
            [
                'theloai_id' => 10,
                'phim_id' => 19,            
            ],
            [
                'theloai_id' => 2,
                'phim_id' => 19,            
            ],
            [
                'theloai_id' => 1,
                'phim_id' => 20,            
            ],
            [
                'theloai_id' => 2,
                'phim_id' => 20,            
            ],
            [
                'theloai_id' => 3,
                'phim_id' => 20,            
            ],
            [
                'theloai_id' => 10,
                'phim_id' => 21,            
            ],
            [
                'theloai_id' => 8,
                'phim_id' => 22,            
            ],
            [
                'theloai_id' => 10,
                'phim_id' => 23,            
            ],
            [
                'theloai_id' => 4,
                'phim_id' => 24,            
            ],
            [
                'theloai_id' => 7,
                'phim_id' => 24,            
            ] ,
            [
                'theloai_id' => 1,
                'phim_id' => 25,            
            ],
            [
                'theloai_id' => 11,
                'phim_id' => 25,            
            ],
            [
                'theloai_id' => 2,
                'phim_id' => 25,            
            ],
            [
                'theloai_id' => 12,
                'phim_id' => 26,            
            ]
        ]);
    }
}
