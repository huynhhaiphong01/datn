<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class permission extends Model
{
    use HasFactory;

    protected $table = 'permissions';

    protected $fillable = [
        'name_per',
    ];

    public function user(){
        return $this->belongsToMany(User::class, 'user_pers', 'per_id', 'user_id');
    }

    public function action(){
        return $this->belongsToMany(action::class, 'per_actions', 'per_id', 'action_id');
    }
}
