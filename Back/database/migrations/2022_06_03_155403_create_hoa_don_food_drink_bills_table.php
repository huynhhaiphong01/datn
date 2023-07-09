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
        Schema::create('hoa_don_food_drink_bills', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('hoa_don_id')->unsigned()->index();
            $table->foreign('hoa_don_id')->references('id')->on('hoa_dons')->onDelete('cascade');
            $table->bigInteger('food_drink_bill_id')->unsigned()->index();
            $table->foreign('food_drink_bill_id')->references('id')->on('food_drink_bills')->onDelete('cascade');
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
        Schema::dropIfExists('hoa_don_food_drink_bills');
    }
};
