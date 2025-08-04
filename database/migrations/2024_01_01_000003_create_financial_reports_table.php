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
        Schema::create('financial_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('Report title');
            $table->enum('type', ['profit_loss', 'balance_sheet', 'cash_flow', 'custom'])->comment('Report type');
            $table->date('period_start')->comment('Report period start date');
            $table->date('period_end')->comment('Report period end date');
            $table->json('data')->comment('Report data in JSON format');
            $table->json('ai_insights')->nullable()->comment('AI-generated insights');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['user_id', 'type']);
            $table->index(['user_id', 'period_start', 'period_end']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_reports');
    }
};