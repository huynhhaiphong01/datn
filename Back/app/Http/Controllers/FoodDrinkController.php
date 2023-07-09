<?php

namespace App\Http\Controllers;

use App\Http\Resources\FoodDrinkResource;
use App\Models\food_drink;
use Illuminate\Http\Request;

class FoodDrinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $food_drinks = food_drink::all();
        // return response()->json($food_drinks);
        return FoodDrinkResource::collection($food_drinks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fd = new food_drink;
        $fd->ten = $request->ten;
        $fd->gia = $request->gia;
        $fd->save();

        if($request->hasFile('image'))
        {
            $destination_path ='images/popcorns';
            $image = $request->file('image');
            $extension = $image->getClientOriginalExtension();
            $popcorn_name = 'popcorn_'.$fd->id.".".$extension;
            $fd->image = $request->file('image')->storeAs($destination_path, $popcorn_name);
            $fd->save();
        }
        return response()->json(food_drink::all());
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
        $food_drink = food_drink::find($id);
        if(is_null($food_drink)) {
            return response()->json(['message'=>'food_drink not found not found'], 404);
        }
        $food_drink->ten = $request->ten;
        $food_drink->gia = $request->gia;
        $food_drink->save();

        if($request->hasFile('image'))
        {
            $destination_path ='images/popcorns';
            $image = $request->file('image');
            $extension = $image->getClientOriginalExtension();
            $popcorn_name = 'popcorn_'.$food_drink->id.".".$extension;
            $food_drink->image = $request->file('image')->storeAs($destination_path, $popcorn_name);
            $food_drink->save();
        }
        return response()->json(food_drink::all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $food_drink = food_drink::find($id);
        if(is_null($food_drink)) {
            return response()->json(['message'=>'theloai not found'], 404);
        }
        $food_drink->delete();
        $food_drinks = food_drink::all();
        
        return response()->json($food_drinks);
    }
}
