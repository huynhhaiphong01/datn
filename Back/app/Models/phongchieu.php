<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class phongchieu extends Model
{
    use HasFactory;

    protected $table = 'phongchieus';

    protected $fillable = 
    [
        'ten_phong',
        'soluong_day',
        'soluong_cot',
    ];

    public function ghengoi(){
        return $this->hasMany(ghengoi::class, 'phongchieu_id', 'id');
    }

    public function suatchieu(){
        return $this->hasMany(suatchieu::class, 'phongchieu_id', 'id');
    }
}
