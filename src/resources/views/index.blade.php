@extends('layout')
@section('content')
    <h1>Grāmatu saraksts.</h1>

    @foreach ($items as $item)
        <div class="card mb-3">
            <div class="row g-0">
                @if ($item->display)
                    @if ($item->image)
                        <div class="col-md-2">
                            <img src="{{ asset($item->image) }}" class="img-fluid rounded-start" alt="Book Image">
                        </div>
                    @endif

                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title">{{ $item->name }}</h5>

                            <p class="card-text mb-1">
                                <strong>Autors:</strong> {{ $item->author->name }} |
                                <strong>Gads:</strong> {{ $item->year }} |
                                <strong>Cena:</strong> {{ $item->price }} €
                            </p>

                            <p class="card-text">
                                <strong>Apraksts:</strong> {{ $item->description }}
                            </p>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    @endforeach
@endsection