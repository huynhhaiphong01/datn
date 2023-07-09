<?php

namespace App\Http\Controllers;

use App\Http\Resources\theloaiResource;
use App\Models\theloai;
use Illuminate\Http\Request;

class TheLoaiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $theloais = theloaiResource::collection(theloai::all());
        return response()->json($theloais);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $theloai = theloai::create($data);

        return response()->json($theloai);
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

    public function find($id)
    {
        $theloai = new theloaiResource(theloai::findOrFail($id));
        if(is_null($theloai)) {
            return response()->json(['message'=>'theloai not found'], 404);
        }

        return response()->json($theloai);
    }


    public function update(Request $request, $id)
    {
        $theloai = theloai::find($id);
        
        if(is_null($theloai)) {
            return response()->json(['message'=>'theloai not found'], 404);
        }
        $theloai->update($request->all());

        return response()->json($theloai);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $theloai = theloai::find($id);
        if(is_null($theloai)) {
            return response()->json(['message'=>'theloai not found'], 404);
        }
        $theloai->delete();
        $theloais = theloai::all();
        
        return response()->json($theloais);
    }
}
