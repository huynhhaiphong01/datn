<?php

namespace App\Http\Controllers;

use App\Http\Resources\phimResource;
use App\Models\phim;
use Illuminate\Http\Request;

class PhimController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $phim = phimResource::collection(phim::all());
        return response()->json($phim);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        // $data = $request->all();
        // $phim = phim::create($data);
        // $phim->theloai()->sync((array)$request->theloai);

        // return response()->json($phim);
        $phim = new phim;
        $phim->ten = $request->ten;
        $phim->thoiluong = $request->thoiluong;
        $phim->dien_vien = $request->dien_vien;
        $phim->tom_tat = $request->tom_tat;
        $phim->dao_dien = $request->dao_dien;
        $phim->trailer = $request->trailer;
        $phim->ngay_chieu = $request->ngay_chieu;
        $phim->ngay_ketthuc = $request->ngay_ketthuc;
        if($request->hasFile('poster'))
        {
            $destination_path ='images/posters';
            $image = $request->file('poster');
            $extension = $image->getClientOriginalExtension();
            $lastet = phim::latest()->first()->id + 1;
            $poster_name = 'phim_poster_'.$lastet.".".$extension;
            $phim->poster = $request->file('poster')->storeAs($destination_path, $poster_name);
            if($request->hasFile('thumbnail')){
                $destination_path2 ='images/thumbnails';
                $thumbnail = $request->file('thumbnail');
                $extension2 = $thumbnail->getClientOriginalExtension();
                $lastet2 = phim::latest()->first()->id + 1;
                $thumbnail_name = 'phim_thumbnail_'.$lastet2.".".$extension2;
                $phim->thumbnail = $request->file('thumbnail')->storeAs($destination_path2, $thumbnail_name);
            }
            $phim->save();
            // $phim->theloai()->sync((array)$request->theloai);
            // $array_id = json_decode($request->theloai,true);
            $phim->theloai()->sync(json_decode($request->theloai,true));
            return new phimResource($phim);
        }
        else
        {
            return response()->json(['message'=>'failed to create'], 404);
        }
        $phim->theloai()->sync(json_decode($request->theloai,true));
        return response()->json($phim);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
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
        $phim = phim::find($id);
        
        if(is_null($phim)) {
            return response()->json(['message'=>'phim not found'], 404);
        }
        $phim->ten = $request->ten;
        $phim->thoiluong = $request->thoiluong;
        $phim->dien_vien = $request->dien_vien;
        $phim->tom_tat = $request->tom_tat;
        $phim->dao_dien = $request->dao_dien;
        $phim->trailer = $request->trailer;
        $phim->ngay_chieu = $request->ngay_chieu;
        $phim->ngay_ketthuc = $request->ngay_ketthuc;
        if($request->hasFile('poster'))
        {
            $destination_path ='images/posters';
            $image = $request->file('poster');
            $extension = $image->getClientOriginalExtension();
            $poster_name = 'phim_poster_'.$phim->id.".".$extension;
            if(!str_contains($phim->poster, 'phim_poster_other_')){
                $poster_name = 'phim_poster_other_'.$phim->id.".".$extension;
            }
            $phim->poster = $request->file('poster')->storeAs($destination_path, $poster_name);
            if($request->hasFile('thumbnail')){
                $destination_path2 ='images/thumbnails';
                $thumbnail = $request->file('thumbnail');
                $extension2 = $thumbnail->getClientOriginalExtension();
                $thumbnail_name = 'phim_thumbnail_'.$phim->id.".".$extension2;
                if(!str_contains($phim->thumbnail, 'phim_thumbnail_other_')){
                    $thumbnail_name = 'phim_thumbnail_other_'.$phim->id.".".$extension2;
                }
                $phim->thumbnail = $request->file('thumbnail')->storeAs($destination_path2, $thumbnail_name);
            }
            $phim->save();
            // $phim->theloai()->sync((array)$request->theloai);
            // $array_id = json_decode($request->theloai,true);
            $phim->theloai()->sync(json_decode($request->theloai,true));
            return new phimResource($phim);
        }
        $phim->save();
        $phim->theloai()->sync(json_decode($request->theloai,true));
        return new phimResource($phim);

        // $phim->theloai()->sync((array)$request->theloai);
        // $phim->update($request->all());

        // return response()->json($phim);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $phim = phim::find($id);
        if(is_null($phim)) {
            return response()->json(['message'=>'phim not found'], 404);
        }
        $phim->delete();
        $phims = phim::all();
        
        return response()->json($phims);
    }
}
