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
        Schema::create('hoa_don_vephims', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('hoa_don_id')->unsigned()->index();
            $table->foreign('hoa_don_id')->references('id')->on('hoa_dons')->onDelete('cascade');
            $table->bigInteger('vephim_id')->unsigned()->index();
            $table->foreign('vephim_id')->references('id')->on('vephims')->onDelete('cascade');
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
        Schema::dropIfExists('hoa_don_vephims');
    }
};
