<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class action extends Model
{
    use HasFactory;

    protected $table = 'actions';

    protected $fillable = [
        'action_name',
        'action_code',
    ];

    public function permission(){
        return $this->belongsToMany(permission::class, 'per_actions', 'action_id', 'per_id');
    }
}
