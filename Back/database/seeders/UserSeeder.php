<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'SuperAdmin',
                'email' => 'superadmin@gmail.com',
                'password' => Hash::make('123456')
            ],
            [
                'name' => 'PhimManager',
                'email' => 'admin1@gmail.com',
                'password' => Hash::make('123456')
            ],
            [
                'name' => 'TheLoaiManager',
                'email' => 'admin2@gmail.com',
                'password' => Hash::make('123456')
            ],
        ]);
    }
}
