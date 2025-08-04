<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Models\FinancialAccount;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the transactions.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $transactions = Transaction::where('user_id', $user->id)
            ->with(['fromAccount', 'toAccount'])
            ->when($request->type, function ($query, $type) {
                return $query->where('type', $type);
            })
            ->when($request->category, function ($query, $category) {
                return $query->where('category', $category);
            })
            ->latest('transaction_date')
            ->paginate(20);

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'filters' => $request->only(['type', 'category']),
        ]);
    }

    /**
     * Show the form for creating a new transaction.
     */
    public function create(Request $request)
    {
        $user = $request->user();

        $accounts = FinancialAccount::where('user_id', $user->id)
            ->active()
            ->orderBy('name')
            ->get();

        return Inertia::render('transactions/create', [
            'accounts' => $accounts,
        ]);
    }

    /**
     * Store a newly created transaction in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        $user = $request->user();

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'description' => $request->description,
            'category' => $request->category,
            'type' => $request->type,
            'transaction_date' => $request->transaction_date,
            'from_account_id' => $request->from_account_id,
            'to_account_id' => $request->to_account_id,
            'currency' => $request->currency ?? 'IDR',
        ]);

        // Update account balances
        if ($transaction->from_account_id) {
            $fromAccount = FinancialAccount::find($transaction->from_account_id);
            $fromAccount->decrement('balance', (float) $transaction->amount);
        }

        if ($transaction->to_account_id) {
            $toAccount = FinancialAccount::find($transaction->to_account_id);
            $toAccount->increment('balance', (float) $transaction->amount);
        }

        return redirect()->route('transactions.index')
            ->with('success', 'Transaction created successfully.');
    }

    /**
     * Display the specified transaction.
     */
    public function show(Transaction $transaction)
    {
        $transaction->load(['fromAccount', 'toAccount']);

        return Inertia::render('transactions/show', [
            'transaction' => $transaction,
        ]);
    }
}