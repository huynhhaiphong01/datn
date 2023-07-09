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
        Schema::create('phims', function (Blueprint $table) {
            $table->id();
            $table->string('ten');
            $table->integer('thoiluong')->nullable();
            $table->string('dien_vien');
            $table->text('tom_tat');
            $table->string('poster');
            $table->string('thumbnail');
            $table->string('dao_dien');
            $table->string('trailer');
            $table->date('ngay_chieu')->nullable();
            $table->date('ngay_ketthuc')->nullable();
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
        Schema::dropIfExists('phims');
    }
};
