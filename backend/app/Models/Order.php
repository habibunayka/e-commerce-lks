<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    public $timestamps = false;

    public $fillable = [
        'user_id',
        'total_price',
        'status',
        'payment_method',
        'shipping_method',
        'shipping_cost',
        'estimated_delivery_date',
        'order_number',
        'created_at',
        'shipping_address_id',
        'billing_address_id',
    ];

    /**
     * Get all of the order_items for the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function order_items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get the user that owns the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the billing_address that owns the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function billing_address()
    {
        return $this->belongsTo(Address::class, 'billing_address_id', 'addresses.id');
    }

    /**
     * Get the shipping_address that owns the Order
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function shipping_address()
    {
        return $this->belongsTo(Address::class, 'shipping_address_id', 'addresses.id');
    }
}
