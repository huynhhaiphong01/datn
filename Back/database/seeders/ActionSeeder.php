<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    DB::table('actions')->insert([
        [
            'action_name' => 'AddMovie',
        ],
        [
            'action_name' => 'EditMovie',
        ],
        [
            'action_name' => 'DeleteMovie',
        ],
        [
            'action_name' => 'AddCategory',
        ],
        [
            'action_name' => 'EditCategory',
        ],
        [
            'action_name' => 'DeleteCategory',
        ],
        [
            'action_name' => 'DASHBOARD',
        ],
        [
            'action_name' => 'GrantPermission',
        ],
        ]);
    }
}
