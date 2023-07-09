<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class phim extends Model
{
    use HasFactory;

    
    protected $table = 'phims';

    protected $fillable = 
    [
        'ten',
        'thoiluong',
        'dien_vien',
        'tom_tat',
        'poster',
        'dao_dien',
        'trailer',
        'ngay_chieu',
        'ngay_ketthuc',
        'thumbnail'
    ];

    protected $with = ['theloai'];

    public function theloai(){
        return $this->belongsToMany(theloai::class, 'phim_theloais');
    }

    public function suatchieu(){
        return $this->hasMany(suatchieu::class, 'phim_id', 'id');
    }
}
