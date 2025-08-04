<?php

namespace Database\Factories;

use App\Models\AiRecommendation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AiRecommendation>
 */
class AiRecommendationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\AiRecommendation>
     */
    protected $model = AiRecommendation::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['cost_optimization', 'revenue_growth', 'cash_flow', 'investment', 'risk_management'];
        $priorities = ['low', 'medium', 'high', 'urgent'];
        $statuses = ['pending', 'in_progress', 'completed', 'dismissed'];

        $recommendations = [
            'cost_optimization' => [
                'title' => 'Reduce Office Supply Costs',
                'description' => 'Consider bulk purchasing for office supplies to reduce per-unit costs by up to 15%.',
            ],
            'revenue_growth' => [
                'title' => 'Expand Digital Marketing',
                'description' => 'Increase digital marketing budget to reach 20% more potential customers.',
            ],
            'cash_flow' => [
                'title' => 'Improve Payment Terms',
                'description' => 'Negotiate better payment terms with suppliers to improve cash flow.',
            ],
            'investment' => [
                'title' => 'Invest in Automation',
                'description' => 'Consider investing in automation tools to reduce operational costs.',
            ],
            'risk_management' => [
                'title' => 'Diversify Revenue Streams',
                'description' => 'Reduce business risk by diversifying into new product lines.',
            ],
        ];

        $type = $this->faker->randomElement($types);
        $recommendation = $recommendations[$type];

        return [
            'user_id' => User::factory(),
            'title' => $recommendation['title'],
            'description' => $recommendation['description'],
            'type' => $type,
            'priority' => $this->faker->randomElement($priorities),
            'potential_impact' => $this->faker->randomFloat(2, 1000, 100000),
            'action_steps' => [
                $this->faker->sentence(),
                $this->faker->sentence(),
                $this->faker->sentence(),
            ],
            'status' => $this->faker->randomElement($statuses),
            'implemented_at' => $this->faker->optional(0.3)->dateTimeBetween('-3 months', 'now'),
        ];
    }

    /**
     * Indicate that the recommendation is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'implemented_at' => null,
        ]);
    }

    /**
     * Indicate that the recommendation is high priority.
     */
    public function highPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'high',
        ]);
    }
}