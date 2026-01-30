@extends('layout')
@section('content')
    <h1>{{ $title }}</h1>
    @if ($errors->any())
        <div class="alert alert-danger">Lūdzu, novērsiet radušās kļūdas!</div>
    @endif
    <form method="post" action="{{ $category->exists ? '/category/patch/' . $category->id : '/category/put' }}">
        @csrf
        <div class="mb-3">
            <label for="category-name" class="form-label">Žanra nosaukums</label>
            <input type="text"
            class="form-control @error('name') is-invalid @enderror"
            id="category-name" name="name" value="{{ old('name', $category->name) }}">
            @error('name')
                <p class="invalid-feedback">{{ $errors->first('name') }}</p>
            @enderror
        </div>
        <button type="submit" class="btn btn-primary">{{ $category->exists ? 'Atjaunot žanru' : 'Pievienot žanru' }}</button>
    </form>
@endsection
