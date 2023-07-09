<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ghengoi extends Model
{
    use HasFactory;

    protected $table = 'ghengois';

    protected $fillable = 
    [
        'ma_ghe',
        'vi_tri_day',
        'vi_tri_cot',
        'da_chon',
        'phongchieu_id',
    ];

    public function phongchieu(){
        return $this->belongsTo(phongchieu::class, 'phongchieu_id', 'id');
    }

    public function vephim(){
        return $this->hasMany(vephim::class, 'ghe_id', 'id');
    }
}
