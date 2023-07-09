<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class hoa_don extends Model
{
    use HasFactory;

    protected $table = 'hoa_dons';

    protected $fillable = [
        'gia',
        'user_id',
    ];

    public function food_drink_bill(){
        return $this->belongsToMany(food_drink_bill::class, 'hoa_don_food_drink_bills', 'hoa_don_id', 'food_drink_bill_id');
    }

    public function vephim(){
        return $this->belongsToMany(vephim::class, 'hoa_don_vephims', 'hoa_don_id', 'vephim_id');
    }

    public function getvephim(){
        return $this->vephim()->first();
    }
}
