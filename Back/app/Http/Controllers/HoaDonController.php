<?php

namespace App\Http\Controllers;

use App\Http\Resources\HoaDonResource;
use App\Http\Resources\VephimResource;
use App\Mail\Payment;
use App\Models\food_drink;
use App\Models\food_drink_bill;
use App\Models\hoa_don;
use App\Models\User;
use App\Models\vephim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use function PHPUnit\Framework\isNull;

class HoaDonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return HoaDonResource::collection(hoa_don::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function findHoadonsByUser($id)
    {
        return HoaDonResource::collection(hoa_don::where('user_id', $id)->orderBy('id','DESC')->get());
    }

    public function total(){
        return response(hoa_don::all()->sum('gia'));
    }
    public function store(Request $request)
    {
        // $vephim = vephim::where("user_id", 2)->get();
        // return $vephim->sum("gia_ve");
        $hoadon = new hoa_don;
        $hoadon->user_id = $request->user_id;
        $hoadon->gia = 0;
        $hoadon->save();
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
            $hoadon->gia += $request->gia_ve;
            $hoadon->save();
            $hoadon->vephim()->attach((array)$vephim->id);
        }
        if(($request->food_drink != null)){
            foreach($request->food_drink as $fd){
                if($fd["so_luong"]> 0){
                    $fooddrinkbill = new food_drink_bill;
                    $fooddrinkbill->user_id = $request->user_id;
                    $fooddrinkbill->so_luong = $fd["so_luong"];
                    $fooddrinkbill->food_drink_id = $fd["food_drink_id"];
                    $gia = food_drink::findOrFail($fd["food_drink_id"])->gia;
                    $fooddrinkbill->gia = $gia*$fd["so_luong"];
                    $fooddrinkbill->save();
                    $hoadon->gia += $gia*$fd["so_luong"];
                    $hoadon->save();
                    $hoadon->food_drink_bill()->attach((array)$fooddrinkbill->id);
                }
            }
        }

        // $user = User::all()->first();
        // $data = [
        //     "user_name" => "",
        //     "Message" => "Payment success!",
        //     "total" => $hoadon->gia,
        // ];
        // $user = User::findOrFail($request->user_id);
        // Mail::to($user->email)->send(new Payment($data));

        return response()->json(hoa_don::all());
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
