<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VephimResource extends JsonResource
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
            'user_id' =>$this->user_id,
            'suatchieu_id' =>$this->suatchieu_id,
            'ghe_id' =>$this->ghe_id,
            'gia_ve' => $this->gia_ve,
            'ghengoi' => $this->ghengoi,
            'user' => $this->user,
            'suatchieu' => new SuatchieuResource($this->suatchieu),
            'poster' => $this->suatchieu->phim->poster,
            'ten_phim' => $this->suatchieu->phim->ten,
        ];
    }
}
