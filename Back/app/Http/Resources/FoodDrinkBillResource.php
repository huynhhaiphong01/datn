<?php

namespace App\Http\Resources;

use App\Models\food_drink;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class FoodDrinkBillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' =>$this->id,
            'gia' =>$this->gia,
            'so_luong' =>$this->so_luong,
            'user_id' => $this->user_id,
            'user_realname' => User::find($this->user_id)->realname,
            'user_name' => User::find($this->user_id)->name,
            'ten' => food_drink::find($this->food_drink_id)->ten,
        ];
    }
}
