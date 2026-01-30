<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\BookController;

// Auth routes
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/auth', [AuthController::class, 'authenticate']);
Route::get('/logout', [AuthController::class, 'logout']);

// Website routes
Route::get('/', [HomeController::class, 'index']);
Route::get('/authors', [AuthorController::class, 'list']);
Route::get('/category', [CategoryController::class, 'list']);
Route::get('/books', [BookController::class, 'list']);

// Author routes
Route::get('/authors/create', [AuthorController::class, 'create']);
Route::post('/authors/put', [AuthorController::class, 'put']);
Route::get('/authors/update/{author}', [AuthorController::class, 'update']);
Route::post('/authors/patch/{author}', [AuthorController::class, 'patch']);
Route::post('/authors/delete/{author}', [AuthorController::class, 'delete']);

// Category routes
Route::get('/category/create', [CategoryController::class, 'create']);
Route::post('/category/put', [CategoryController::class, 'put']);
Route::get('/category/update/{category}', [CategoryController::class, 'update']);
Route::post('/category/patch/{category}', [CategoryController::class, 'patch']);
Route::post('/category/delete/{category}', [CategoryController::class, 'delete']);

// Book routes
Route::get('/books/create', [BookController::class, 'create']);
Route::post('/books/put', [BookController::class, 'put']);
Route::get('/books/update/{book}', [BookController::class, 'update']);
Route::post('/books/patch/{book}', [BookController::class, 'patch']);
Route::post('/books/delete/{book}', [BookController::class, 'delete']);

// Data/API
Route::get('/data/get-top-books', [DataController::class, 'getTopBooks']);
Route::get('/data/get-book/{book}', [DataController::class, 'getBook']);
Route::get('/data/get-related-books/{book}', [DataController::class, 'getRelatedBooks']);

