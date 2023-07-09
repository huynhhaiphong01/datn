<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GheDaChonResource extends JsonResource
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
            'ma_ghe' =>$this->ma_ghe,
            'vi_tri_day' =>$this->vi_tri_day,
            'vi_tri_cot' =>$this->vi_tri_cot,
            'da_chon' => $this->da_chon,
            'phongchieu_id' => $this->phongchieu_id,
            'phonchieu' => $this->phongchieu,
            'suatchieu_ID' => SuatChieuIDResource::collection($this->vephim),
        ];
    }
}
