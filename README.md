
# 🇱🇻 2. Projekta Sagatave
(English below)

## Instalācija

Izmantojiet aprakstu no PDF dokumenta!

```
docker compose build
docker compose up -d
docker exec -it project2-laravel bash

composer create-project laravel/laravel .

chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache

.env:
DB_CONNECTION=mariadb
DB_HOST=project2-database
DB_PORT=3306
DB_DATABASE=project2
DB_USERNAME=project2admin
DB_PASSWORD=project2pass

php artisan migrate
```

http://localhost/

## Docker komandas
- Konteineru būvēšana: `docker compose build`
- Konteineru iedarbināšana: `docker compose up -d`
- Konteineru statusa pārbaude: `docker ps`
- Pieslēgšanās PHP konteineram: `docker exec -it project2-laravel bash`
- Iziešana no konteinera: `exit`
- Konteineru izslēgšana: `docker compose down`


## Vietnes
- Sākumlapa: [http://localhost/](http://localhost/)
- Administrācija: [http://localhost/login](http://localhost/login)
- Datubāzes administrācija: [http://localhost:8080/](http://localhost:8080/)


## DB rekvizīti
- Server: `project2-database`
- Username: `project2admin`
- Password: `project2pass`

---

# 🇬🇧 Project 2 template

## Installation

Please consult the PDF description!

```
docker compose build
docker compose up -d
docker exec -it project2-laravel bash

composer create-project laravel/laravel .

chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache

.env:
DB_CONNECTION=mariadb
DB_HOST=project2-database
DB_PORT=3306
DB_DATABASE=project2
DB_USERNAME=project2admin
DB_PASSWORD=project2pass

php artisan migrate
```

http://localhost/

## Docker commands
- Building containers: `docker compose build`
- Running containers: `docker compose up -d`
- Checking status of containers: `docker ps`
- Connecting to PHP container: `docker exec -it project2-laravel bash`
- Disconnecting from the PHP container: `exit`
- Turning the containers off: `docker compose down`


## URLs
- Homepage: [http://localhost/](http://localhost/)
- Administration: [http://localhost/login](http://localhost/login)
- Database administration: [http://localhost:8080/](http://localhost:8080/)


## Database details
- Server: `project2-database`
- Username: `project2admin`
- Password: `project2pass`


---

K. Immers, VeA, 2025
