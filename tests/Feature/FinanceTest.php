<?php

namespace Tests\Feature;

use App\Models\FinancialAccount;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FinanceTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_dashboard_displays_financial_overview(): void
    {
        $this->actingAs($this->user);

        // Create some test data
        $account = FinancialAccount::factory()->create(['user_id' => $this->user->id]);
        Transaction::factory()->income()->create(['user_id' => $this->user->id, 'to_account_id' => $account->id]);

        $response = $this->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('dashboard')
                ->has('financialSummary')
                ->has('recentTransactions')
                ->has('aiRecommendations')
        );
    }

    public function test_transactions_index_displays_user_transactions(): void
    {
        $this->actingAs($this->user);

        $account = FinancialAccount::factory()->create(['user_id' => $this->user->id]);
        Transaction::factory()->count(3)->create([
            'user_id' => $this->user->id,
            'to_account_id' => $account->id
        ]);

        $response = $this->get('/transactions');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('transactions/index')
                ->has('transactions')
                ->has('filters')
        );
    }

    public function test_transaction_creation_form_loads(): void
    {
        $this->actingAs($this->user);

        FinancialAccount::factory()->count(2)->create(['user_id' => $this->user->id]);

        $response = $this->get('/transactions/create');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('transactions/create')
                ->has('accounts')
        );
    }

    public function test_can_create_income_transaction(): void
    {
        $this->actingAs($this->user);

        $account = FinancialAccount::factory()->create([
            'user_id' => $this->user->id,
            'type' => 'asset',
            'balance' => 100000
        ]);

        $transactionData = [
            'amount' => 50000,
            'description' => 'Test income',
            'category' => 'Sales',
            'type' => 'income',
            'transaction_date' => now()->format('Y-m-d'),
            'to_account_id' => $account->id,
            'currency' => 'IDR',
        ];

        $response = $this->post('/transactions', $transactionData);

        $response->assertRedirect('/transactions');
        $this->assertDatabaseHas('transactions', [
            'user_id' => $this->user->id,
            'amount' => 50000,
            'description' => 'Test income',
            'type' => 'income',
        ]);

        // Check account balance was updated
        $account->refresh();
        $this->assertEquals(150000, $account->balance);
    }

    public function test_can_create_expense_transaction(): void
    {
        $this->actingAs($this->user);

        $account = FinancialAccount::factory()->create([
            'user_id' => $this->user->id,
            'type' => 'asset',
            'balance' => 100000
        ]);

        $transactionData = [
            'amount' => 30000,
            'description' => 'Test expense',
            'category' => 'Office Supplies',
            'type' => 'expense',
            'transaction_date' => now()->format('Y-m-d'),
            'from_account_id' => $account->id,
            'currency' => 'IDR',
        ];

        $response = $this->post('/transactions', $transactionData);

        $response->assertRedirect('/transactions');
        $this->assertDatabaseHas('transactions', [
            'user_id' => $this->user->id,
            'amount' => 30000,
            'description' => 'Test expense',
            'type' => 'expense',
        ]);

        // Check account balance was updated
        $account->refresh();
        $this->assertEquals(70000, $account->balance);
    }

    public function test_transaction_validation_works(): void
    {
        $this->actingAs($this->user);

        $response = $this->post('/transactions', []);

        $response->assertSessionHasErrors(['amount', 'description', 'type', 'transaction_date']);
    }

    public function test_users_can_only_see_their_own_transactions(): void
    {
        $otherUser = User::factory()->create();
        
        $userAccount = FinancialAccount::factory()->create(['user_id' => $this->user->id]);
        $otherUserAccount = FinancialAccount::factory()->create(['user_id' => $otherUser->id]);
        
        $userTransaction = Transaction::factory()->create([
            'user_id' => $this->user->id,
            'to_account_id' => $userAccount->id
        ]);
        
        $otherUserTransaction = Transaction::factory()->create([
            'user_id' => $otherUser->id,
            'to_account_id' => $otherUserAccount->id
        ]);

        $this->actingAs($this->user);

        $response = $this->get('/transactions');
        $response->assertStatus(200);

        // Check that only user's transactions are returned
        $response->assertInertia(fn ($page) => 
            $page->where('transactions.data', fn ($transactions) => 
                collect($transactions)->every(fn ($transaction) => 
                    $transaction['id'] === $userTransaction->id
                )
            )
        );
    }
}