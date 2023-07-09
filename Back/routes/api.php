<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\FoodDrinkBillController;
use App\Http\Controllers\FoodDrinkController;
use App\Http\Controllers\HoaDonController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PhimController;
use App\Http\Controllers\PhongchieuController;
use App\Http\Controllers\SuatchieuController;
use App\Http\Controllers\TestMailController;
use App\Http\Controllers\TheLoaiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VephimController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::get('/phims', [PhimController::class, 'index']);
Route::get('/theloais', [TheLoaiController::class, 'index']);
Route::get('/permissions', [PermissionController::class, 'index']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/food_drinks', [FoodDrinkController::class, 'index']);
Route::get('/hoa_dons', [HoaDonController::class, 'index']);

Route::post('/addphims', [PhimController::class, 'store']);
Route::post('/updatephim/{id}', [PhimController::class, 'update']);
Route::post('/deletephim/{id}', [PhimController::class, 'destroy']);

Route::post('/addtheloais', [TheLoaiController::class, 'store']);
Route::put('/updatetheloai/{id}', [TheLoaiController::class, 'update']);
Route::post('/deletetheloai/{id}', [TheLoaiController::class, 'destroy']);
Route::get('/findtheloai/{id}', [TheLoaiController::class, 'find']);

Route::post('/addpermission', [PermissionController::class, 'store']);
Route::put('/updatepermission/{id}', [PermissionController::class, 'update']);
Route::post('/deletepermission/{id}', [PermissionController::class, 'destroy']);

Route::get('/actions', [ActionController::class, 'index']);

Route::put('/grantpermissiontouser/{id}', [UserController::class, 'grantPermission']);
Route::put('/updateprofile/{id}', [UserController::class, 'update']);
Route::post('/uploadavatar/{id}', [UserController::class, 'uploadAvatar']);
Route::post('/deleteuser/{id}', [UserController::class, 'destroy']);
Route::post('/changepassword', [UserController::class, 'change_password']);

Route::get('/phongchieus', [PhongchieuController::class, 'index']);
Route::post('/addphongchieu', [PhongchieuController::class, 'store']);
Route::put('/updateroom/{id}', [PhongchieuController::class, 'update']);
Route::post('/deletephongchieu/{id}', [PhongchieuController::class, 'destroy']);

Route::get('/suatchieus', [SuatchieuController::class, 'index']);
Route::post('/addsuatchieu', [SuatchieuController::class, 'store']);
Route::post('/deletesuatchieu/{id}', [SuatchieuController::class, 'destroy']);

Route::get('/vephims', [VephimController::class, 'index']);
Route::get('/vephimbyuser/{id}', [VephimController::class, 'findVephimByUser']);
Route::post('/addvephim', [VephimController::class, 'store']);

Route::post('/addfooddrink', [FoodDrinkController::class, 'store']);
Route::post('/updatefooddrink/{id}', [FoodDrinkController::class, 'update']);
Route::post('/deletefooddrink/{id}', [FoodDrinkController::class, 'destroy']);

Route::post('/addfooddrinkbill', [FoodDrinkBillController::class, 'store']);

Route::post('/addhoadon', [HoaDonController::class, 'store']);
Route::get('/hoadonbyuser/{id}', [HoaDonController::class, 'findHoadonsByUser']);
Route::get('/tonghoadon', [HoaDonController::class, 'total']);


Route::get('/testmail', [TestMailController::class, 'index']);