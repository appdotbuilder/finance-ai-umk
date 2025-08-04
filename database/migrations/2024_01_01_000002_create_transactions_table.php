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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('from_account_id')->nullable()->constrained('financial_accounts')->onDelete('cascade');
            $table->foreignId('to_account_id')->nullable()->constrained('financial_accounts')->onDelete('cascade');
            $table->decimal('amount', 15, 2)->comment('Transaction amount');
            $table->string('currency', 3)->default('IDR')->comment('Currency code');
            $table->string('description')->comment('Transaction description');
            $table->string('category')->nullable()->comment('Transaction category');
            $table->enum('type', ['income', 'expense', 'transfer'])->comment('Transaction type');
            $table->date('transaction_date')->comment('Date of transaction');
            $table->json('metadata')->nullable()->comment('Additional transaction data');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['user_id', 'type']);
            $table->index(['user_id', 'transaction_date']);
            $table->index(['user_id', 'category']);
            $table->index('transaction_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};