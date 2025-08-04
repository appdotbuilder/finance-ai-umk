import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface FinancialSummary {
    accounts: Record<string, { count: number; total_balance: number }>;
    monthly_income: number;
    monthly_expenses: number;
    net_worth: number;
    financial_health_score: number;
}

interface Transaction {
    id: number;
    amount: number;
    description: string;
    type: 'income' | 'expense' | 'transfer';
    category: string | null;
    transaction_date: string;
    from_account?: { name: string };
    to_account?: { name: string };
}

interface AiRecommendation {
    id: number;
    title: string;
    description: string;
    type: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    potential_impact: number | null;
}

interface Props {
    financialSummary: FinancialSummary;
    recentTransactions: Transaction[];
    aiRecommendations: AiRecommendation[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ 
    financialSummary, 
    recentTransactions, 
    aiRecommendations 
}: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            default: return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
        }
    };

    const getTransactionTypeIcon = (type: string) => {
        switch (type) {
            case 'income': return '💰';
            case 'expense': return '💸';
            case 'transfer': return '🔄';
            default: return '📝';
        }
    };

    const getHealthScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 dark:text-green-400';
        if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">
                        🚀 Welcome to FinanceAI Dashboard
                    </h1>
                    <p className="text-indigo-100">
                        Here's your financial overview and AI-powered insights to help grow your business.
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid auto-rows-min gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Income</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {formatCurrency(financialSummary.monthly_income)}
                                </p>
                            </div>
                            <div className="text-3xl">📈</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Expenses</p>
                                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    {formatCurrency(financialSummary.monthly_expenses)}
                                </p>
                            </div>
                            <div className="text-3xl">📉</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Worth</p>
                                <p className={`text-2xl font-bold ${financialSummary.net_worth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {formatCurrency(financialSummary.net_worth)}
                                </p>
                            </div>
                            <div className="text-3xl">💎</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Financial Health</p>
                                <p className={`text-2xl font-bold ${getHealthScoreColor(financialSummary.financial_health_score)}`}>
                                    {financialSummary.financial_health_score}%
                                </p>
                            </div>
                            <div className="text-3xl">🎯</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* AI Recommendations */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    🤖 AI Recommendations
                                </h2>
                                <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                                    {aiRecommendations.length} active
                                </span>
                            </div>
                            <div className="space-y-4">
                                {aiRecommendations.length > 0 ? (
                                    aiRecommendations.map((recommendation) => (
                                        <div
                                            key={recommendation.id}
                                            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors duration-200"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-medium text-gray-900 dark:text-white">
                                                            {recommendation.title}
                                                        </h3>
                                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                                                            {recommendation.priority}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                        {recommendation.description}
                                                    </p>
                                                    {recommendation.potential_impact && (
                                                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                                            Potential Impact: {formatCurrency(recommendation.potential_impact)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">🎉</div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            No active recommendations. Your finances look great!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                📊 Recent Transactions
                            </h2>
                            <div className="space-y-3">
                                {recentTransactions.length > 0 ? (
                                    recentTransactions.slice(0, 8).map((transaction) => (
                                        <div
                                            key={transaction.id}
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">
                                                    {getTransactionTypeIcon(transaction.type)}
                                                </span>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                                                        {transaction.description}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(transaction.transaction_date).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-sm font-medium ${
                                                    transaction.type === 'income' 
                                                        ? 'text-green-600 dark:text-green-400' 
                                                        : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                    {transaction.type === 'expense' ? '-' : '+'}
                                                    {formatCurrency(transaction.amount)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">📝</div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            No transactions yet. Start by adding your first transaction!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Summary */}
                {Object.keys(financialSummary.accounts).length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            🏦 Account Summary
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {Object.entries(financialSummary.accounts).map(([type, data]) => (
                                <div key={type} className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize mb-2">
                                        {type.replace('_', ' ')}
                                    </p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {data.count}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatCurrency(data.total_balance)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}