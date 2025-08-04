<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\AiRecommendation
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $description
 * @property string $type
 * @property string $priority
 * @property string|null $potential_impact
 * @property array|null $action_steps
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $implemented_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation query()
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation wherePotentialImpact($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation whereActionSteps($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation whereImplementedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation pending()
 * @method static \Illuminate\Database\Eloquent\Builder|AiRecommendation highPriority()
 * @method static \Database\Factories\AiRecommendationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AiRecommendation extends Model
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
        'description',
        'type',
        'priority',
        'potential_impact',
        'action_steps',
        'status',
        'implemented_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'potential_impact' => 'decimal:2',
        'action_steps' => 'array',
        'implemented_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the AI recommendation.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include pending recommendations.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include high-priority recommendations.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeHighPriority($query)
    {
        return $query->whereIn('priority', ['high', 'urgent']);
    }
}