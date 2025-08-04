<?php

namespace Database\Factories;

use App\Models\FinancialAccount;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FinancialAccount>
 */
class FinancialAccountFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\FinancialAccount>
     */
    protected $model = FinancialAccount::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['asset', 'liability', 'equity', 'revenue', 'expense'];
        $accountNames = [
            'asset' => ['Cash', 'Bank Account', 'Accounts Receivable', 'Inventory'],
            'liability' => ['Accounts Payable', 'Bank Loan', 'Credit Card'],
            'equity' => ['Owner Equity', 'Retained Earnings'],
            'revenue' => ['Sales Revenue', 'Service Revenue', 'Other Revenue'],
            'expense' => ['Office Supplies', 'Rent Expense', 'Marketing Expense', 'Utilities'],
        ];

        $type = $this->faker->randomElement($types);
        $name = $this->faker->randomElement($accountNames[$type]);

        return [
            'user_id' => User::factory(),
            'name' => $name,
            'type' => $type,
            'balance' => $this->faker->randomFloat(2, 0, 1000000),
            'currency' => 'IDR',
            'is_active' => $this->faker->boolean(90),
            'description' => $this->faker->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the account is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the account is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}