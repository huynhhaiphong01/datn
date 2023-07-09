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
        Schema::create('ghengois', function (Blueprint $table) {
            $table->id();
            $table->string('ma_ghe');
            $table->integer('vi_tri_day');
            $table->integer('vi_tri_cot');
            $table->boolean('da_chon')->default(false);
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
        Schema::dropIfExists('ghengois');
    }
};
