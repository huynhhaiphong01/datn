<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class food_drink_bill extends Model
{
    use HasFactory;

    protected $table = 'food_drink_bills';

    protected $fillable = [
        'gia',
        'so_luong',
        'user_id',
        'food_drink_id',
    ];

    public function hoa_don(){
        return $this->belongsToMany(hoa_don::class, 'hoa_don_food_drink_bills', 'food_drink_bill_id', 'hoa_don_id');
    }

    public function food_drink(){
        return $this->belongsTo(food_drink::class, 'food_drink_id', 'id');
    }
}
