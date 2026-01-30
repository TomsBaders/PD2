<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Book extends Model
{

    protected $fillable = [
        'id',
        'name',
        'author_id',
        'category_id',
        'description',
        'price',
        'year',
        'image',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => intval($this->id),
            'name' => $this->name,
            'description' => $this->description,
            'author' => $this->author->name,
            'category' => $this->category->name,
            'price' => number_format($this->price, 2),
            'year' => intval($this->year),
            'image' => asset('storage/' . $this->image),
        ];
    }

}
