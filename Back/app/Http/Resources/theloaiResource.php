<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class theloaiResource extends JsonResource
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
            'id' => $this->id,
            'ten_the_loai' => $this->ten_the_loai,
            'phim' => PhimByTheLoaiResource::collection($this-> phim),
        ];
    }
}
