<?php

namespace Database\Seeders;

use App\Models\permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Per_ActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permission1 = permission::find(1);
        $permission1->action()->sync([1,2,3,4,5,6,7,8]);
        $permission2 = permission::find(2);
        $permission2->action()->sync([1,2,3,7]);
        $permission3 = permission::find(3);
        $permission3->action()->sync([4,5,6,7]);
        $permission4 = permission::find(4);
        $permission4->action()->sync([7,8]);
    }
}
