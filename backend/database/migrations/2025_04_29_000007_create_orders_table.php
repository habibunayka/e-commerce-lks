<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('shipping_address_id')->constrained('addresses')->cascadeOnDelete();
            $table->foreignId('billing_address_id')->constrained('addresses')->cascadeOnDelete();
            $table->decimal('total_price',10,2);
            $table->enum('status', ['pending','paid','shipped','delivered']);
            $table->enum('payment_method', ['e-money','bank','cash','paypal','credit']);
            $table->enum('shipping_method', ['normal','express','cargo','instant']);
            $table->integer('shipping_cost');
            $table->date('estimated_delivery_date');
            $table->string('order_number');
            $table->timestamp('created_at')->default(Carbon::now());
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
