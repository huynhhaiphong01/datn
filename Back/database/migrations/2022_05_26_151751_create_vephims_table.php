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
        Schema::create('vephims', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('gia_ve');
            $table->bigInteger('suatchieu_id')->unsigned()->index();
            $table->foreign('suatchieu_id')->references('id')->on('suatchieus')->onDelete('cascade');
            $table->bigInteger('ghe_id')->unsigned()->index();
            $table->foreign('ghe_id')->references('id')->on('ghengois')->onDelete('cascade');
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
        Schema::dropIfExists('vephims');
    }
};
