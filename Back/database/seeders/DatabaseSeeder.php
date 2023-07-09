<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PhimSeeder::class,
            TheloaiSeeder::class,
            Phim_theloaiSeeder::class,
            UserSeeder::class,
            PermissionSeeder::class,
            ActionSeeder::class,
            Per_ActionSeeder::class,
            User_PerSeeder::class,
            PhongChieuSeeder::class,
            GheNgoiSeeder::class,
            Food_drinkSeeder::class,
            SuatChieuSeeder::class
        ]);
    }
}
