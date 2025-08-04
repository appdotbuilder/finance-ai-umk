<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Transaction
 *
 * @property int $id
 * @property int $user_id
 * @property int|null $from_account_id
 * @property int|null $to_account_id
 * @property string $amount
 * @property string $currency
 * @property string $description
 * @property string|null $category
 * @property string $type
 * @property string $transaction_date
 * @property array|null $metadata
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\FinancialAccount|null $fromAccount
 * @property-read \App\Models\FinancialAccount|null $toAccount
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereFromAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereToAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereTransactionDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereMetadata($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction thisMonth()
 * @method static \Database\Factories\TransactionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Transaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'from_account_id',
        'to_account_id',
        'amount',
        'currency',
        'description',
        'category',
        'type',
        'transaction_date',
        'metadata',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'transaction_date' => 'date',
        'metadata' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the transaction.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the source account for the transaction.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function fromAccount(): BelongsTo
    {
        return $this->belongsTo(FinancialAccount::class, 'from_account_id');
    }

    /**
     * Get the destination account for the transaction.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function toAccount(): BelongsTo
    {
        return $this->belongsTo(FinancialAccount::class, 'to_account_id');
    }

    /**
     * Scope a query to only include transactions from this month.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeThisMonth($query)
    {
        return $query->whereMonth('transaction_date', now()->month)
                    ->whereYear('transaction_date', now()->year);
    }
}