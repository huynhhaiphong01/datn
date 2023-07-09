<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class User_PerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = User::find(1);
        $user1->permission()->sync([1]);
        $user2 = User::find(2);
        $user2->permission()->sync([2]);
        $user3 = User::find(3);
        $user3->permission()->sync([3]);
    }
}
