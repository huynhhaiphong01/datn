<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class per_action extends Model
{
    use HasFactory;

    protected $table = 'per_actions';

    protected $fillable = 
    [
        'per_id',
        'action_id'
    ];
}
