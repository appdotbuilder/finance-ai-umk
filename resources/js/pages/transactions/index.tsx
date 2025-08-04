import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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

interface PaginatedTransactions {
    data: Transaction[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    transactions: PaginatedTransactions;
    filters: {
        type?: string;
        category?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

export default function TransactionsIndex({ transactions, filters }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getTransactionTypeIcon = (type: string) => {
        switch (type) {
            case 'income': return '💰';
            case 'expense': return '💸';
            case 'transfer': return '🔄';
            default: return '📝';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'income': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'expense': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'transfer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            📊 Transaction Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Track and manage all your financial transactions
                        </p>
                    </div>
                    <Link
                        href={route('transactions.create')}
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                    >
                        ➕ Add Transaction
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
                            <Link
                                href={route('transactions.index')}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    !filters.type 
                                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                                }`}
                            >
                                All
                            </Link>
                            <Link
                                href={route('transactions.index', { type: 'income' })}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    filters.type === 'income' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                                }`}
                            >
                                💰 Income
                            </Link>
                            <Link
                                href={route('transactions.index', { type: 'expense' })}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    filters.type === 'expense' 
                                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                                }`}
                            >
                                💸 Expenses
                            </Link>
                            <Link
                                href={route('transactions.index', { type: 'transfer' })}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    filters.type === 'transfer' 
                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                                }`}
                            >
                                🔄 Transfers
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {transactions.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Transaction
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Accounts
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {transactions.data.map((transaction) => (
                                            <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">
                                                            {getTransactionTypeIcon(transaction.type)}
                                                        </span>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {transaction.description}
                                                            </div>
                                                            {transaction.category && (
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {transaction.category}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeColor(transaction.type)}`}>
                                                        {transaction.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`text-sm font-medium ${
                                                        transaction.type === 'income' 
                                                            ? 'text-green-600 dark:text-green-400' 
                                                            : transaction.type === 'expense'
                                                            ? 'text-red-600 dark:text-red-400'
                                                            : 'text-gray-900 dark:text-white'
                                                    }`}>
                                                        {transaction.type === 'expense' ? '-' : transaction.type === 'income' ? '+' : ''}
                                                        {formatCurrency(transaction.amount)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 dark:text-white">
                                                        {new Date(transaction.transaction_date).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        {transaction.from_account && (
                                                            <div>From: {transaction.from_account.name}</div>
                                                        )}
                                                        {transaction.to_account && (
                                                            <div>To: {transaction.to_account.name}</div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {transactions.last_page > 1 && (
                                <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 flex justify-between sm:hidden">
                                            {transactions.links.find(link => link.label.includes('Previous'))?.url && (
                                                <Link
                                                    href={transactions.links.find(link => link.label.includes('Previous'))!.url!}
                                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Previous
                                                </Link>
                                            )}
                                            {transactions.links.find(link => link.label.includes('Next'))?.url && (
                                                <Link
                                                    href={transactions.links.find(link => link.label.includes('Next'))!.url!}
                                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Next
                                                </Link>
                                            )}
                                        </div>
                                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    Showing <span className="font-medium">{(transactions.current_page - 1) * transactions.per_page + 1}</span> to{' '}
                                                    <span className="font-medium">
                                                        {Math.min(transactions.current_page * transactions.per_page, transactions.total)}
                                                    </span>{' '}
                                                    of <span className="font-medium">{transactions.total}</span> results
                                                </p>
                                            </div>
                                            <div>
                                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                    {transactions.links.map((link, index) => (
                                                        <Link
                                                            key={index}
                                                            href={link.url || '#'}
                                                            className={`relative inline-flex items-center px-2 py-2 border text-sm font-medium ${
                                                                link.active
                                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                            } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                                index === transactions.links.length - 1 ? 'rounded-r-md' : ''
                                                            }`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ))}
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📊</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No transactions found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Get started by adding your first transaction.
                            </p>
                            <Link
                                href={route('transactions.create')}
                                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                            >
                                ➕ Add Your First Transaction
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}