<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class phim_theloai extends Model
{
    use HasFactory;

    protected $table = 'phim_theloais';

    protected $fillable = 
    [
        'theloai_id',
        'phim_id'
    ];
}
