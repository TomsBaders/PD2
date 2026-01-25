<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(): View
    {
        $items = Book::with('author')->orderBy('name')->get();
        return view(
            'index',
            [
                'title' => '2. Praktiskais darbs',
                'items' => $items
            ]
        );
    }
}
