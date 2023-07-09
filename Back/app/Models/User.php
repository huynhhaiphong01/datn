<?php

namespace App\Models;

use App\Http\Resources\actionInUserResource;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'realname',
        'phone_number',
        'gender',
        'birth',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function permission(){
        return $this->belongsToMany(permission::class, 'user_pers', 'user_id', 'per_id');
    }

    public function action($id){
        $users = User::findOrFail($id);
        $actions = [];
        $ids = [];
        foreach($users->permission as $role){
            foreach($role->action as $act){
                if(!in_array($act->id,$ids)){
                    // $actions[] = new actionInUserResource($act);
                    $actions[] = $act->action_name;
                    $ids[] = $act->id;
                }
            }
        }
        return $actions;
    }

    public function vephim(){
        return $this->hasMany(vephim::class, 'user_id', 'id');
    }
}
