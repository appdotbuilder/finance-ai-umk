import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface FinancialAccount {
    id: number;
    name: string;
    type: string;
    balance: number;
}

interface Props {
    accounts: FinancialAccount[];
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
    {
        title: 'Create',
        href: '/transactions/create',
    },
];

export default function TransactionCreate({ accounts }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        description: '',
        category: '',
        type: 'income' as 'income' | 'expense' | 'transfer',
        transaction_date: new Date().toISOString().split('T')[0],
        from_account_id: '',
        to_account_id: '',
        currency: 'IDR',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('transactions.store'));
    };

    const transactionTypes = [
        { value: 'income', label: '💰 Income', description: 'Money coming into your business' },
        { value: 'expense', label: '💸 Expense', description: 'Money going out of your business' },
        { value: 'transfer', label: '🔄 Transfer', description: 'Move money between accounts' },
    ];

    const commonCategories = {
        income: ['Sales', 'Service Revenue', 'Interest Income', 'Other Income'],
        expense: ['Office Supplies', 'Rent', 'Marketing', 'Utilities', 'Travel', 'Equipment', 'Professional Services'],
        transfer: ['Account Transfer', 'Bank Transfer'],
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Transaction" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            ➕ Create New Transaction
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Add a new financial transaction to your records
                        </p>
                    </div>
                    <Link
                        href={route('transactions.index')}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        ← Back to Transactions
                    </Link>
                </div>

                {/* Form */}
                <div className="max-w-2xl">
                    <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
                        {/* Transaction Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Transaction Type <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {transactionTypes.map((type) => (
                                    <label
                                        key={type.value}
                                        className={`relative flex cursor-pointer rounded-lg border p-4 transition-colors duration-200 ${
                                            data.type === type.value
                                                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-500'
                                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type.value}
                                            checked={data.type === type.value}
                                            onChange={(e) => setData('type', e.target.value as 'income' | 'expense' | 'transfer')}
                                            className="sr-only"
                                        />
                                        <div className="flex flex-col items-center text-center">
                                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                                                {type.label}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {type.description}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.type && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.type}</p>}
                        </div>

                        {/* Amount */}
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Amount <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    Rp
                                </span>
                                <input
                                    type="number"
                                    id="amount"
                                    step="0.01"
                                    min="0"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                                    placeholder="0"
                                />
                            </div>
                            {errors.amount && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                                placeholder="Enter transaction description"
                            />
                            {errors.description && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                            >
                                <option value="">Select a category</option>
                                {commonCategories[data.type].map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.category}</p>}
                        </div>

                        {/* Transaction Date */}
                        <div>
                            <label htmlFor="transaction_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Transaction Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="transaction_date"
                                value={data.transaction_date}
                                onChange={(e) => setData('transaction_date', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                            />
                            {errors.transaction_date && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.transaction_date}</p>}
                        </div>

                        {/* Account Selection */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* From Account (for expenses and transfers) */}
                            {(data.type === 'expense' || data.type === 'transfer') && (
                                <div>
                                    <label htmlFor="from_account_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        From Account {data.type === 'expense' ? <span className="text-red-500">*</span> : ''}
                                    </label>
                                    <select
                                        id="from_account_id"
                                        value={data.from_account_id}
                                        onChange={(e) => setData('from_account_id', e.target.value)}
                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                                    >
                                        <option value="">Select account</option>
                                        {accounts.filter(account => account.type === 'asset').map((account) => (
                                            <option key={account.id} value={account.id}>
                                                {account.name} ({formatCurrency(account.balance)})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.from_account_id && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.from_account_id}</p>}
                                </div>
                            )}

                            {/* To Account (for income and transfers) */}
                            {(data.type === 'income' || data.type === 'transfer') && (
                                <div>
                                    <label htmlFor="to_account_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        To Account {data.type === 'income' ? <span className="text-red-500">*</span> : ''}
                                    </label>
                                    <select
                                        id="to_account_id"
                                        value={data.to_account_id}
                                        onChange={(e) => setData('to_account_id', e.target.value)}
                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                                    >
                                        <option value="">Select account</option>
                                        {accounts.filter(account => account.type === 'asset').map((account) => (
                                            <option key={account.id} value={account.id}>
                                                {account.name} ({formatCurrency(account.balance)})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.to_account_id && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.to_account_id}</p>}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Link
                                href={route('transactions.index')}
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        ✨ Create Transaction
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}