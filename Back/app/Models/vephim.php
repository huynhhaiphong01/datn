<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class vephim extends Model
{
    use HasFactory;

    protected $table = 'vephims';

    protected $fillable = 
    [
        'user_id',
        'suatchieu_id',
        'ghe_id',
        'gia_ve',
    ];

    public function ghengoi(){
        return $this->belongsTo(ghengoi::class, 'ghe_id', 'id');
    }

    public function user(){
        return $this->belongsTo(user::class, 'user_id', 'id');
    }

    public function suatchieu(){
        return $this->belongsTo(suatchieu::class, 'suatchieu_id', 'id');
    }

    public function hoa_don(){
        return $this->belongsToMany(hoa_don::class, 'hoa_don_vephims', 'vephim_id', 'hoa_don_id');
    }
}
