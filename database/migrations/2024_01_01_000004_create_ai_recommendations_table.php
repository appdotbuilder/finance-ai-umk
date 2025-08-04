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
        Schema::create('ai_recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('Recommendation title');
            $table->text('description')->comment('Detailed recommendation description');
            $table->enum('type', ['cost_optimization', 'revenue_growth', 'cash_flow', 'investment', 'risk_management'])->comment('Recommendation type');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium')->comment('Recommendation priority');
            $table->decimal('potential_impact', 15, 2)->nullable()->comment('Estimated financial impact');
            $table->json('action_steps')->nullable()->comment('Recommended action steps');
            $table->enum('status', ['pending', 'in_progress', 'completed', 'dismissed'])->default('pending')->comment('Recommendation status');
            $table->timestamp('implemented_at')->nullable()->comment('When recommendation was implemented');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['user_id', 'status']);
            $table->index(['user_id', 'type']);
            $table->index(['user_id', 'priority']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_recommendations');
    }
};