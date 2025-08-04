<?php

namespace Database\Factories;

use App\Models\FinancialAccount;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Transaction>
     */
    protected $model = Transaction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['income', 'expense', 'transfer'];
        $categories = [
            'income' => ['Sales', 'Service Revenue', 'Interest Income', 'Other Income'],
            'expense' => ['Office Supplies', 'Rent', 'Marketing', 'Utilities', 'Travel', 'Equipment'],
            'transfer' => ['Account Transfer', 'Bank Transfer'],
        ];

        $type = $this->faker->randomElement($types);
        $category = $this->faker->randomElement($categories[$type]);

        return [
            'user_id' => User::factory(),
            'from_account_id' => $type === 'expense' ? FinancialAccount::factory() : null,
            'to_account_id' => $type === 'income' ? FinancialAccount::factory() : null,
            'amount' => $this->faker->randomFloat(2, 10, 50000),
            'currency' => 'IDR',
            'description' => $this->faker->sentence(),
            'category' => $category,
            'type' => $type,
            'transaction_date' => $this->faker->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
            'metadata' => $this->faker->optional()->randomElement([
                ['reference' => $this->faker->uuid()],
                ['payment_method' => $this->faker->randomElement(['cash', 'bank_transfer', 'credit_card'])],
            ]),
        ];
    }

    /**
     * Indicate that the transaction is an income.
     */
    public function income(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'income',
            'category' => $this->faker->randomElement(['Sales', 'Service Revenue', 'Interest Income']),
            'from_account_id' => null,
            'to_account_id' => FinancialAccount::factory(),
        ]);
    }

    /**
     * Indicate that the transaction is an expense.
     */
    public function expense(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'expense',
            'category' => $this->faker->randomElement(['Office Supplies', 'Rent', 'Marketing', 'Utilities']),
            'from_account_id' => FinancialAccount::factory(),
            'to_account_id' => null,
        ]);
    }
}