<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SuatChieuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('suatchieus')->insert(
            [
                [
                    "gio_bat_dau" => "3:00",
                    "gio_ket_thuc" => "4:30",
                    "ngay_chieu" => "2023-07-08",
                    "phim_id" => 1,
                    "phongchieu_id" => 1,
                ],
                [
                    "gio_bat_dau" => "5:00",
                    "gio_ket_thuc" => "6:30",
                    "ngay_chieu" => "2023-07-08",
                    "phim_id" => 1,
                    "phongchieu_id" => 1,
                ],
                [
                    "gio_bat_dau" => "7:00",
                    "gio_ket_thuc" => "8:30",
                    "ngay_chieu" => "2023-07-08",
                    "phim_id" => 1,
                    "phongchieu_id" => 1,
                ],
                [
                    "gio_bat_dau" => "3:00",
                    "gio_ket_thuc" => "4:30",
                    "ngay_chieu" => "2023-07-09",
                    "phim_id" => 1,
                    "phongchieu_id" => 1,
                ],
                [
                    "gio_bat_dau" => "5:00",
                    "gio_ket_thuc" => "6:30",
                    "ngay_chieu" => "2022-07-09",
                    "phim_id" => 1,
                    "phongchieu_id" => 1,
                ],
                [
                    "gio_bat_dau" => "7:00",
                    "gio_ket_thuc" => "8:30",
                    "ngay_chieu" => "2022-07-09",
                    "phim_id" => 1,
                    "phongchieu_id" => 1,
                ],
            ]
        );
    }
}
