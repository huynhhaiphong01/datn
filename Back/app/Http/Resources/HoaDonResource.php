<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Models\vephim;
use Illuminate\Http\Resources\Json\JsonResource;

class HoaDonResource extends JsonResource
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
            'user_id' =>$this->user_id,
            'user_realname' => User::find($this->user_id)->realname,
            'user_name' => User::find($this->user_id)->name,
            'food_drink_bill' => FoodDrinkBillResource::collection($this->food_drink_bill),
            'vephim' => VephimResource::collection($this->vephim),
            'phim' => new VephimResource($this->getvephim()),
            'ngay_mua' => $this->created_at,
            'ngay_capnhat' => $this->updated_at,
        ];
    }
}
