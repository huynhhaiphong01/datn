<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class phimResource extends JsonResource
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
            'ten' =>$this->ten,
            'thoiluong' =>$this->thoiluong,
            'dien_vien' =>$this->dien_vien,
            'tom_tat' =>$this->tom_tat,
            'poster' =>$this->poster,
            'thumbnail' => $this->thumbnail,
            'dao_dien' =>$this->dao_dien,
            'trailer' =>$this->trailer,
            'ngay_chieu' =>$this->ngay_chieu,
            'ngay_ketthuc' =>$this->ngay_ketthuc,
            'theloai' => theloaiResource::collection($this->theloai),
            'suatchieu' => SuatchieuResource::collection($this->suatchieu),
        ];
    }
}
