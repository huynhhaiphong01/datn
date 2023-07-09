<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class actionResource extends JsonResource
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
            'action_name' => $this->action_name,
            'action_code' => $this->action_code,
            'permission' => $this->permission,
        ];
    }
}
