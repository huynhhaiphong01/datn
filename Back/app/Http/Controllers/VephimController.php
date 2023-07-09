<?php

namespace App\Http\Controllers;

use App\Http\Resources\VephimResource;
use App\Models\ghengoi;
use App\Models\vephim;
use Illuminate\Http\Request;

class VephimController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return VephimResource::collection(vephim::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function findVephimByUser($id)
    {
        return VephimResource::collection(vephim::where("user_id", $id)->get());
    }

    public function store(Request $request)
    {
        // if(ghengoi::findOrFail($request->ghe_id)->da_chon == 1){
        //     return response()->json(['message'=>'this ghe is picked'], 404);
        // }
        // else{
        //     $vephim = vephim::create($request->all());
        //     $ghengoi = ghengoi::findOrFail($request->ghe_id);
        //     $ghengoi->da_chon = 1;
        //     $ghengoi->save();
        //     return new VephimResource($vephim);
        // }
        foreach($request->ghe_id as $ghe){
            $vephim_exist = vephim::where('suatchieu_id', $request->suatchieu_id)
            ->where('ghe_id', $ghe)->first();
            if($vephim_exist){
                return response()->json(['message'=>'this ghe is picked'], 404);
            }
        }
        foreach($request->ghe_id as $ghe){
            $vephim = new vephim;
            $vephim->user_id = $request->user_id;
            $vephim->suatchieu_id = $request->suatchieu_id;
            $vephim->gia_ve = $request->gia_ve;
            $vephim->ghe_id = $ghe;
            $vephim->save();
        }
        return VephimResource::collection(vephim::all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
