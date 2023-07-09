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
        Schema::create('phim_theloais', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('theloai_id')->unsigned()->index();
            $table->foreign('theloai_id')->references('id')->on('theloais')->onDelete('cascade');
            $table->bigInteger('phim_id')->unsigned()->index();
            $table->foreign('phim_id')->references('id')->on('phims')->onDelete('cascade');
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
        Schema::dropIfExists('phim_theloais');
    }
};
