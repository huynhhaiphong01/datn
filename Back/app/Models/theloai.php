<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class theloai extends Model
{
    use HasFactory;

    protected $table = 'theloais';

    protected $fillable = 
    [
        'ten_the_loai'
    ];

    
    public function phim(){
        return $this->belongsToMany(phim::class, 'phim_theloais');
    }
}
