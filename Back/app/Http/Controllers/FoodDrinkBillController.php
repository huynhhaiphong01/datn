<?php

namespace App\Http\Controllers;

use App\Models\food_drink;
use App\Models\food_drink_bill;
use Illuminate\Http\Request;

class FoodDrinkBillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        foreach($request->food_drink as $fd){
            $fooddrinkbill = new food_drink_bill;
            $fooddrinkbill->user_id = $request->user_id;
            $fooddrinkbill->so_luong = $fd["so_luong"];
            $fooddrinkbill->food_drink_id = $fd["food_drink_id"];
            $gia = food_drink::findOrFail($fd["food_drink_id"])->gia;
            $fooddrinkbill->gia = $gia*$fd["so_luong"];
            $fooddrinkbill->save();
        }
        return response()->json(food_drink_bill::all());
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
