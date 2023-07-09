<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class food_drink extends Model
{
    use HasFactory;

    protected $table = 'food_drinks';

    protected $fillable = [
        'ten',
        'gia',
        'image',
    ];

    public function food_drink_bill(){
        return $this->hasMany(food_drink_bill::class, 'food_drink_id', 'id');
    }
}
