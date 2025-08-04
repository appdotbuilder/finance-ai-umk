<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\FinancialReport
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $type
 * @property string $period_start
 * @property string $period_end
 * @property array $data
 * @property array|null $ai_insights
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport query()
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport wherePeriodStart($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport wherePeriodEnd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport whereAiInsights($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FinancialReport whereUpdatedAt($value)
 * @method static \Database\Factories\FinancialReportFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class FinancialReport extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'type',
        'period_start',
        'period_end',
        'data',
        'ai_insights',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'period_start' => 'date',
        'period_end' => 'date',
        'data' => 'array',
        'ai_insights' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the financial report.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}