<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('financial_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name')->comment('Account name (e.g., Cash, Bank Account)');
            $table->enum('type', ['asset', 'liability', 'equity', 'revenue', 'expense'])->comment('Account type');
            $table->decimal('balance', 15, 2)->default(0)->comment('Current account balance');
            $table->string('currency', 3)->default('IDR')->comment('Currency code');
            $table->boolean('is_active')->default(true)->comment('Whether account is active');
            $table->text('description')->nullable()->comment('Account description');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['user_id', 'type']);
            $table->index(['user_id', 'is_active']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_accounts');
    }
};