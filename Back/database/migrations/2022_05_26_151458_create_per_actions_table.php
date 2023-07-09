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
        Schema::create('per_actions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('per_id')->unsigned()->index();
            $table->foreign('per_id')->references('id')->on('permissions')->onDelete('cascade');
            $table->bigInteger('action_id')->unsigned()->index();
            $table->foreign('action_id')->references('id')->on('actions')->onDelete('cascade');
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
        Schema::dropIfExists('per_actions');
    }
};
