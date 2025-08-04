<?php

namespace App\Services;

use App\Models\AiRecommendation;
use App\Models\Transaction;
use App\Models\User;

class AiRecommendationService
{
    /**
     * Generate AI recommendations for a user based on their financial data.
     *
     * @param \App\Models\User $user
     * @return array
     */
    public function generateRecommendations(User $user): array
    {
        $recommendations = [];

        // Analyze spending patterns
        $monthlyExpenses = $this->getMonthlyExpensesByCategory($user);
        $monthlyIncome = $this->getMonthlyIncome($user);

        // Cost optimization recommendations
        if ($monthlyExpenses->isNotEmpty()) {
            $highestExpenseCategory = $monthlyExpenses->sortByDesc('total')->first();
            
            if ($highestExpenseCategory && $highestExpenseCategory['total'] > ($monthlyIncome * 0.3)) {
                $recommendations[] = [
                    'type' => 'cost_optimization',
                    'priority' => 'high',
                    'title' => "Optimize {$highestExpenseCategory['category']} Spending",
                    'description' => "Your {$highestExpenseCategory['category']} expenses are high. Consider reviewing and optimizing costs in this area.",
                    'potential_impact' => $highestExpenseCategory['total'] * 0.15, // 15% potential savings
                    'action_steps' => [
                        'Review all expenses in this category',
                        'Compare prices with alternative suppliers',
                        'Negotiate better rates or terms',
                        'Consider bulk purchasing discounts',
                    ],
                ];
            }
        }

        // Cash flow recommendations
        $cashFlowRatio = $monthlyIncome > 0 ? ($monthlyIncome - $monthlyExpenses->sum('total')) / $monthlyIncome : 0;
        
        if ($cashFlowRatio < 0.2) { // Less than 20% profit margin
            $recommendations[] = [
                'type' => 'cash_flow',
                'priority' => 'high',
                'title' => 'Improve Cash Flow Management',
                'description' => 'Your profit margin is below recommended levels. Focus on improving cash flow.',
                'potential_impact' => $monthlyIncome * 0.1,
                'action_steps' => [
                    'Review payment terms with customers',
                    'Implement faster invoicing processes',
                    'Negotiate extended payment terms with suppliers',
                    'Consider offering early payment discounts',
                ],
            ];
        }

        // Revenue growth recommendations
        if ($monthlyIncome > 0) {
            $recommendations[] = [
                'type' => 'revenue_growth',
                'priority' => 'medium',
                'title' => 'Expand Revenue Streams',
                'description' => 'Diversify your income sources to reduce risk and increase growth potential.',
                'potential_impact' => $monthlyIncome * 0.25,
                'action_steps' => [
                    'Identify complementary products or services',
                    'Explore new market segments',
                    'Develop subscription or recurring revenue models',
                    'Consider strategic partnerships',
                ],
            ];
        }

        return $recommendations;
    }

    /**
     * Create AI recommendations for a user.
     *
     * @param \App\Models\User $user
     * @return void
     */
    public function createRecommendationsForUser(User $user): void
    {
        $recommendations = $this->generateRecommendations($user);

        foreach ($recommendations as $recommendation) {
            // Check if similar recommendation already exists
            $exists = AiRecommendation::where('user_id', $user->id)
                ->where('type', $recommendation['type'])
                ->where('status', 'pending')
                ->where('created_at', '>=', now()->subDays(30))
                ->exists();

            if (!$exists) {
                AiRecommendation::create([
                    'user_id' => $user->id,
                    'title' => $recommendation['title'],
                    'description' => $recommendation['description'],
                    'type' => $recommendation['type'],
                    'priority' => $recommendation['priority'],
                    'potential_impact' => $recommendation['potential_impact'],
                    'action_steps' => $recommendation['action_steps'],
                    'status' => 'pending',
                ]);
            }
        }
    }

    /**
     * Get monthly expenses grouped by category.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Support\Collection
     */
    protected function getMonthlyExpensesByCategory(User $user)
    {
        return Transaction::where('user_id', $user->id)
            ->where('type', 'expense')
            ->thisMonth()
            ->selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->get();
    }

    /**
     * Get monthly income total.
     *
     * @param \App\Models\User $user
     * @return float
     */
    protected function getMonthlyIncome(User $user): float
    {
        return Transaction::where('user_id', $user->id)
            ->where('type', 'income')
            ->thisMonth()
            ->sum('amount');
    }
}