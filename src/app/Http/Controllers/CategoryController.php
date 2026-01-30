<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;

class CategoryController extends Controller implements HasMiddleware
{
    /**
    * Get the middleware that should be assigned to the controller.
    */
    public static function middleware(): array
    {
        return 
        [
            'auth',
        ];
    }

    // display all Authors
    public function list(): View
    {
        $items = Category::orderBy('name', 'asc')->get();
        return view(
        'category.list',
            [
                'title' => 'Žanri',
                'items' => $items,
            ]
        );
    }

    // display new Author form
    public function create(): View
    {
        return view(
        'category.form',
            [
                'title' => 'Pievienot žanru',
                'category' => new Category()
            ]
        );
    }

    // create new Category
    public function put(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $category = new Category();
        $category->name = $validatedData['name'];
        $category->save();
        return redirect('/category');
    }

    // display Category editing form
    public function update(Category $category): View
    {
        return view(
        'category.form',
            [
                'title' => 'Rediģēt žanru',
                'category' => $category
            ]
        );
    }

    // update existing Category data
    public function patch(Category $category, Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $category->name = $validatedData['name'];
        $category->save();
        return redirect('/category');
    }

    public function delete(Category $category): RedirectResponse
    {
        // šeit derētu pārbaude, kas neļauj dzēst autoru, ja tas piesaistīts eksistējošām grāmatām
        $category->delete();
        return redirect('/category');
    }
}
