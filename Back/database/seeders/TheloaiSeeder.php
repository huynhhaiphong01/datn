<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TheloaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('theloais')->insert([
            [
                'id' => 1,
                'ten_the_loai' => 'Hành Động',
            ],
            [
                'id' => 2,
                'ten_the_loai' => 'Phiêu Lưu',
            ],
            [
                'id' => 3,
                'ten_the_loai' => 'Thần Thoại',
            ],
            [
                'id' => 4,
                'ten_the_loai' => 'Hài',
            ],
            [
                'id' => 5,
                'ten_the_loai' => 'Kinh Dị',
            ],
            [
                'id' => 6,
                'ten_the_loai' => 'Hồi Hộp',
            ],
            [
                'id' => 7,
                'ten_the_loai' => 'Tâm Lý',
            ],
            [
                'id' => 8,
                'ten_the_loai' => 'Tình Cảm',
            ],
            [
                'id' => 9,
                'ten_the_loai' => 'Gia Đình',
            ],
            [
                'id' => 10,
                'ten_the_loai' => 'Hoạt Hình',
            ],
            [
                'id' => 11,
                'ten_the_loai' => 'Khoa Học Viễn Tưởng',
            ],
            [
                'id' => 12,
                'ten_the_loai' => 'Lịch Sử',
            ]
        ]);
    }
}
