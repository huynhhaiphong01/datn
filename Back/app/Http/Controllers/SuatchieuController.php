<?php

namespace App\Http\Controllers;

use App\Http\Resources\SuatchieuResource;
use App\Models\phim;
use App\Models\suatchieu;
use Illuminate\Http\Request;

class SuatchieuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $suatchieus = suatchieu::all();
        return SuatchieuResource::collection($suatchieus);
    }

    public function suatchieusByPhimID($id)
    {
        $suatchieus = suatchieu::where('phim_id',$id)->get();
        return SuatchieuResource::collection($suatchieus);
    }

    public function suatchieuByPhongchieuID($id)
    {
        $suatchieus = suatchieu::where('phongchieu_id',$id)->get();
        return SuatchieuResource::collection($suatchieus);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $isOutOfPhimSchedule = new suatchieu;
        if($isOutOfPhimSchedule->checkOutOfPhimSchedule($request)){
            return response()->json(['message'=>'this day out of phim schedule'], 404);
        }
        $checkSuatChieuIsExist = new suatchieu;
        if($checkSuatChieuIsExist->isSuatChieuExist($request)){
            return response()->json(['message'=>'This suatchieu is already exist'], 404);
        }
        else{
            $suatchieu = suatchieu::create($request->all());
            return response()->json($suatchieu);
        }
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
        $suatchieu = suatchieu::find($id);
        if(is_null($suatchieu)) {
            return response()->json(['message'=>'suatchieu not found'], 404);
        }
        $suatchieu->delete();
        $suatchieus = suatchieu::all();
        
        return response()->json($suatchieus);
    }
}
