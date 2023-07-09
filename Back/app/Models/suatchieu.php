<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class suatchieu extends Model
{
    use HasFactory;

    protected $table = 'suatchieus';

    protected $fillable = 
    [
        'gio_bat_dau',
        'gio_ket_thuc',
        'ngay_chieu',
        'phim_id',
        'phongchieu_id',
    ];

    public function phongchieu(){
        return $this->belongsTo(phongchieu::class, 'phongchieu_id', 'id');
    }

    public function phim(){
        return $this->belongsTo(phim::class, 'phim_id', 'id');
    }

    public function vephim(){
        return $this->hasMany(vephim::class, 'suatchieu_id', 'id');
    }

    public function ghe(){

    }

    public function checkOutOfPhimSchedule($request){
        $outOfPhimSchedule = phim::where('id',$request->phim_id)
        ->where('ngay_chieu','>', $request->ngay_chieu)
        ->orWhere('ngay_ketthuc','<', $request->ngay_chieu)
        ->first();
        if($outOfPhimSchedule){
            return true;
        }
        else{
            return false;
        }
    }

    public function isSuatChieuExist($request){
        $suatchieu_exist = suatchieu::where([
            'ngay_chieu' => $request->ngay_chieu,
            'phongchieu_id' => $request->phongchieu_id
            ])
        ->where(
            function($querry) use ($request){
                $querry->whereBetween('gio_bat_dau',[$request->gio_bat_dau, $request->gio_ket_thuc])
                ->orWhereBetween('gio_ket_thuc', [$request->gio_bat_dau, $request->gio_ket_thuc])
                ->orWhere(function($querry) use($request){
                    $querry->where('gio_bat_dau','<=',$request->gio_bat_dau)
                    ->where('gio_ket_thuc','>=',$request->gio_ket_thuc);
                });
            }
        )->first();
        if($suatchieu_exist){
            return true;
        }
        else{
            return false;
        }
    }
}
