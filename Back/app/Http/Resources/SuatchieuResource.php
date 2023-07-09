<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SuatchieuResource extends JsonResource
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
            'gio_bat_dau' =>$this->gio_bat_dau,
            'gio_ket_thuc' =>$this->gio_ket_thuc,
            'ngay_chieu' =>$this->ngay_chieu,
            'phim_id' => $this->phim_id,
            'phim_name' => $this->phim->ten,
            'phongchieu_id' => $this->phongchieu_id,
            'phongchieu_name' => $this->phongchieu->ten_phong,
            'ghe_da_chon' => $this->vephim->count(),
            'soluong_ghe' => $this->phongchieu->ghengoi->count(),
            'soluong_ghe_trong' => $this->phongchieu->ghengoi->count() - $this->vephim->count(),
            'soluong_cot' => $this->phongchieu->soluong_cot,
            'soluong_day' => $this->phongchieu->soluong_day,
            'ghe' => GheDaChonResource::collection($this->phongchieu->ghengoi),
            'poster' => $this->phim->poster,
        ];
    }
}
