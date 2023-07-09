<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suatchieus', function (Blueprint $table) {
            $table->id();
            $table->time('gio_bat_dau');
            $table->time('gio_ket_thuc');
            $table->date('ngay_chieu');
            $table->bigInteger('phim_id')->unsigned()->index();
            $table->foreign('phim_id')->references('id')->on('phims')->onDelete('cascade');
            $table->bigInteger('phongchieu_id')->unsigned()->index();
            $table->foreign('phongchieu_id')->references('id')->on('phongchieus')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('suatchieus');
    }
};
