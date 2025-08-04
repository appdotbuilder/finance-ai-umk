<?php

namespace Database\Seeders;

use App\Models\AiRecommendation;
use App\Models\FinancialAccount;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;

class FinanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a demo user if it doesn't exist
        $user = User::firstOrCreate([
            'email' => 'demo@financeai.com'
        ], [
            'name' => 'Demo User',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        // Create financial accounts for the demo user
        $cashAccount = FinancialAccount::create([
            'user_id' => $user->id,
            'name' => 'Cash',
            'type' => 'asset',
            'balance' => 50000000, // 50 million IDR
            'currency' => 'IDR',
            'description' => 'Cash on hand',
        ]);

        $bankAccount = FinancialAccount::create([
            'user_id' => $user->id,
            'name' => 'Bank BCA',
            'type' => 'asset',
            'balance' => 150000000, // 150 million IDR
            'currency' => 'IDR',
            'description' => 'Main business bank account',
        ]);

        $revenueAccount = FinancialAccount::create([
            'user_id' => $user->id,
            'name' => 'Sales Revenue',
            'type' => 'revenue',
            'balance' => 0,
            'currency' => 'IDR',
            'description' => 'Revenue from sales',
        ]);

        $expenseAccount = FinancialAccount::create([
            'user_id' => $user->id,
            'name' => 'Operating Expenses',
            'type' => 'expense',
            'balance' => 0,
            'currency' => 'IDR',
            'description' => 'General business expenses',
        ]);

        // Create sample transactions
        $transactions = [
            // Income transactions
            [
                'user_id' => $user->id,
                'to_account_id' => $bankAccount->id,
                'amount' => 25000000,
                'description' => 'Product sales - January',
                'category' => 'Sales',
                'type' => 'income',
                'transaction_date' => now()->subDays(5)->format('Y-m-d'),
            ],
            [
                'user_id' => $user->id,
                'to_account_id' => $cashAccount->id,
                'amount' => 8500000,
                'description' => 'Service revenue - Consulting',
                'category' => 'Service Revenue',
                'type' => 'income',
                'transaction_date' => now()->subDays(3)->format('Y-m-d'),
            ],
            [
                'user_id' => $user->id,
                'to_account_id' => $bankAccount->id,
                'amount' => 15000000,
                'description' => 'Online sales - E-commerce',
                'category' => 'Sales',
                'type' => 'income',
                'transaction_date' => now()->subDays(1)->format('Y-m-d'),
            ],
            
            // Expense transactions
            [
                'user_id' => $user->id,
                'from_account_id' => $bankAccount->id,
                'amount' => 5000000,
                'description' => 'Office rent - January',
                'category' => 'Rent',
                'type' => 'expense',
                'transaction_date' => now()->subDays(10)->format('Y-m-d'),
            ],
            [
                'user_id' => $user->id,
                'from_account_id' => $cashAccount->id,
                'amount' => 2500000,
                'description' => 'Marketing campaign - Social media ads',
                'category' => 'Marketing',
                'type' => 'expense',
                'transaction_date' => now()->subDays(7)->format('Y-m-d'),
            ],
            [
                'user_id' => $user->id,
                'from_account_id' => $bankAccount->id,
                'amount' => 1200000,
                'description' => 'Office supplies and equipment',
                'category' => 'Office Supplies',
                'type' => 'expense',
                'transaction_date' => now()->subDays(4)->format('Y-m-d'),
            ],
            [
                'user_id' => $user->id,
                'from_account_id' => $bankAccount->id,
                'amount' => 800000,
                'description' => 'Internet and utilities',
                'category' => 'Utilities',
                'type' => 'expense',
                'transaction_date' => now()->subDays(2)->format('Y-m-d'),
            ],
            
            // Transfer transactions
            [
                'user_id' => $user->id,
                'from_account_id' => $bankAccount->id,
                'to_account_id' => $cashAccount->id,
                'amount' => 5000000,
                'description' => 'Cash withdrawal for petty cash',
                'category' => 'Account Transfer',
                'type' => 'transfer',
                'transaction_date' => now()->subDays(6)->format('Y-m-d'),
            ],
        ];

        foreach ($transactions as $transactionData) {
            Transaction::create($transactionData);
        }

        // Create AI recommendations
        $recommendations = [
            [
                'user_id' => $user->id,
                'title' => 'Optimize Marketing Spend',
                'description' => 'Your marketing expenses are 12% of revenue. Consider A/B testing different channels to improve ROI and reduce cost per acquisition.',
                'type' => 'cost_optimization',
                'priority' => 'high',
                'potential_impact' => 3000000,
                'action_steps' => [
                    'Analyze current marketing channel performance',
                    'Test lower-cost digital marketing alternatives',
                    'Negotiate better rates with current marketing vendors',
                    'Implement marketing automation to reduce manual costs'
                ],
                'status' => 'pending',
            ],
            [
                'user_id' => $user->id,
                'title' => 'Diversify Revenue Streams',
                'description' => 'Your business relies heavily on direct sales. Consider adding subscription services or digital products to create recurring revenue.',
                'type' => 'revenue_growth',
                'priority' => 'medium',
                'potential_impact' => 12000000,
                'action_steps' => [
                    'Survey existing customers for additional service needs',
                    'Research subscription model feasibility',
                    'Develop digital product offerings',
                    'Create a customer retention program'
                ],
                'status' => 'pending',
            ],
            [
                'user_id' => $user->id,
                'title' => 'Improve Cash Flow Management',
                'description' => 'Optimize payment terms with customers and suppliers to improve working capital and reduce cash flow gaps.',
                'type' => 'cash_flow',
                'priority' => 'high',
                'potential_impact' => 5000000,
                'action_steps' => [
                    'Offer early payment discounts to customers',
                    'Negotiate extended payment terms with suppliers',
                    'Implement automated invoicing system',
                    'Set up payment reminders for overdue accounts'
                ],
                'status' => 'pending',
            ],
        ];

        foreach ($recommendations as $recommendationData) {
            AiRecommendation::create($recommendationData);
        }
    }
}