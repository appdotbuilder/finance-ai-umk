<?php

namespace Database\Factories;

use App\Models\FinancialReport;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FinancialReport>
 */
class FinancialReportFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\FinancialReport>
     */
    protected $model = FinancialReport::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['profit_loss', 'balance_sheet', 'cash_flow', 'custom'];
        $type = $this->faker->randomElement($types);

        return [
            'user_id' => User::factory(),
            'title' => ucfirst(str_replace('_', ' ', $type)) . ' Report',
            'type' => $type,
            'period_start' => $this->faker->dateTimeBetween('-3 months', '-1 month')->format('Y-m-d'),
            'period_end' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'data' => [
                'total_revenue' => $this->faker->randomFloat(2, 10000, 100000),
                'total_expenses' => $this->faker->randomFloat(2, 5000, 50000),
                'net_profit' => $this->faker->randomFloat(2, 1000, 50000),
            ],
            'ai_insights' => [
                'summary' => $this->faker->sentence(),
                'recommendations' => [$this->faker->sentence(), $this->faker->sentence()],
            ],
        ];
    }
}