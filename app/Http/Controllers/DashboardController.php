<?php

namespace App\Http\Controllers;

use App\Models\AiRecommendation;
use App\Models\FinancialAccount;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with financial overview.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Get financial accounts summary
        $accounts = FinancialAccount::where('user_id', $user->id)
            ->active()
            ->get()
            ->groupBy('type')
            ->map(function ($accounts) {
                return [
                    'count' => $accounts->count(),
                    'total_balance' => $accounts->sum('balance'),
                ];
            });

        // Get recent transactions
        $recentTransactions = Transaction::where('user_id', $user->id)
            ->with(['fromAccount', 'toAccount'])
            ->latest()
            ->take(10)
            ->get();

        // Get monthly income/expense summary
        $monthlyIncome = Transaction::where('user_id', $user->id)
            ->where('type', 'income')
            ->thisMonth()
            ->sum('amount');

        $monthlyExpenses = Transaction::where('user_id', $user->id)
            ->where('type', 'expense')
            ->thisMonth()
            ->sum('amount');

        // Get AI recommendations
        $aiRecommendations = AiRecommendation::where('user_id', $user->id)
            ->pending()
            ->highPriority()
            ->latest()
            ->take(3)
            ->get();

        // Calculate financial health score (simplified)
        $totalAssets = $accounts['asset']['total_balance'] ?? 0;
        $totalLiabilities = $accounts['liability']['total_balance'] ?? 0;
        $netWorth = $totalAssets - $totalLiabilities;
        $financialHealthScore = min(100, max(0, ($netWorth / max(1, $totalAssets)) * 100));

        return Inertia::render('dashboard', [
            'financialSummary' => [
                'accounts' => $accounts,
                'monthly_income' => $monthlyIncome,
                'monthly_expenses' => $monthlyExpenses,
                'net_worth' => $netWorth,
                'financial_health_score' => round($financialHealthScore, 1),
            ],
            'recentTransactions' => $recentTransactions,
            'aiRecommendations' => $aiRecommendations,
        ]);
    }
}