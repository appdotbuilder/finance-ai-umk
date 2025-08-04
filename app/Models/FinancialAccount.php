<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\FinancialAccount
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $type
 * @property string $balance
 * @property string $currency
 * @property bool $is_active
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Transaction> $fromTransactions
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Transaction> $toTransactions
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount query()
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialAccount active()
 * @method static \Database\Factories\FinancialAccountFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class FinancialAccount extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'type',
        'balance',
        'currency',
        'is_active',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'balance' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the financial account.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the transactions where this account is the source.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function fromTransactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'from_account_id');
    }

    /**
     * Get the transactions where this account is the destination.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function toTransactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'to_account_id');
    }

    /**
     * Scope a query to only include active accounts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}