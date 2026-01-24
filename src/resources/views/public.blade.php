<!doctype html>
<html lang="lv">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $title }}</title>
        <meta name="description" content="JŪSU PROJEKTA APRAKSTS">
        @viteReactRefresh
        @vite('resources/css/app.css')
        @vite('resources/js/index.jsx')
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>