<?php

namespace App\Http\Controllers;

use App\Http\Resources\PhongchieuResource;
use App\Models\ghengoi;
use App\Models\phongchieu;
use Illuminate\Http\Request;

class PhongchieuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $phongchieus = phongchieu::all();
        return PhongchieuResource::collection($phongchieus);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $phongchieu = phongchieu::create($request->all());
        $alphas = 65;
        for($row = 1; $row <= $phongchieu->soluong_day; $row++){
            for($col = 1; $col <= $phongchieu->soluong_cot; $col++){
                $ghengoi = new ghengoi;
                $ghengoi->ma_ghe = chr($alphas).$col;
                $ghengoi->vi_tri_day = $row;
                $ghengoi->vi_tri_cot = $col;
                $ghengoi->phongchieu_id = $phongchieu->id;
                $ghengoi->save();
            }
            $alphas++;
        }

        return new PhongchieuResource($phongchieu);
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
        $phongchieu = phongchieu::find($id);
        
        if(is_null($phongchieu)) {
            return response()->json(['message'=>'phongchieu not found'], 404);
        }
        $phongchieu->update($request->all());

        return response()->json($phongchieu);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $phongchieu = phongchieu::find($id);
        if(is_null($phongchieu)) {
            return response()->json(['message'=>'phongchieu not found'], 404);
        }
        $phongchieu->delete();
        $phongchieus = phongchieu::all();
        
        return response()->json($phongchieus);
    }
}
