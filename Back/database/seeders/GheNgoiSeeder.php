<?php

namespace Database\Seeders;

use App\Models\ghengoi;
use App\Models\phongchieu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GheNgoiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $phongchieus = phongchieu::all();
        foreach($phongchieus as $phongchieu){
            $alphas = 65;
            for($row = 1; $row <= $phongchieu->soluong_day; $row++){
                for($col = 1; $col <= $phongchieu->soluong_cot; $col++){
                    $ghengoi = new ghengoi();
                    $ghengoi->ma_ghe = chr($alphas).$col;
                    $ghengoi->vi_tri_day = $row;
                    $ghengoi->vi_tri_cot = $col;
                    $ghengoi->phongchieu_id = $phongchieu->id;
                    $ghengoi->save();
                }
                $alphas++;
            }
        }
    }
}
