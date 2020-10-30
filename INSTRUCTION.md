# Instruction

This guide is a combined guide, you can see the independent guide on the respective `README.md` file on each folder.

## Front-end

### Requirements

This application require the following in order to run:

- [Node JS](https://nodejs.org/)

### Running the application

Clone repo

```shell script
git clone git@gitlab.com:todo-teamname/fableous.git
# or
git clone https://gitlab.com/todo-teamname/fableous.git

cd fableous/fableous_fe
```

Install dependency

```shell script
npm install
```

Running application in development mode

```shell script
npm start
```

Creating a production build. The build artifact will be in the `build` folder
```shell script
npm run build
```

## Back-end

This application require [Redis](https://redis.io/) and optionally, 
[PostgreSQL](https://www.postgresql.org/) to be running.

### Requirements

This application require the following in order to run:

- [Python](https://www.python.org/downloads/) version >= 3.7 and < 3.9
- [Redis](https://redis.io/)
- [Poetry](https://python-poetry.org/)

Optionally, this application can use [Postgres](https://www.postgresql.org/) as the primary database. If the database URL is not supplied in the environment file, application will use SQLite instead.

### Running the application

Clone repo
```shell script
git clone git@gitlab.com:todo-teamname/fableous.git
# or
git clone https://gitlab.com/todo-teamname/fableous.git

cd fableous/fableous_be
```

Setup poetry env
```shell script
poetry install
```

Crete `.env` file. See `.example.env` for reference. There is a 
[tool](https://miniwebtool.com/django-secret-key-generator/) to generate secret key. If `DATABASE_URL` 
field is not filled, Django will use sqlite instead.
```.env
SECRET_KEY=secretsecretsecretsecretsecretsecretsecret
ENV=PRODUCTION|DEVELOPMENT
REDIS_URL=redis://127.0.0.1:6379/
DATABASE_URL=postgres://user:pass@127.0.0.1:5432/postgres
```

Migrate database
```shell script
poetry run python manage.py migrate
```

Run the server
```shell script
# development
poetry run python manage.py runserver
# production
poetry run gunicorn fableous.wsgi:application
poetry run daphne -b 0.0.0.0 -p 8001 fableous.wsgi:application
```

### Using Docker to run Redis and Postgres in development

Create a `.env` file. The value of `POSTGRES_PASSWORD` must be the same with env in `fabelous_be` environment file.
```.env
POSTGRES_PASSWORD=password
```

Start Redis and Postgres
```shell script
docker-compose -f dev-compose.yml up -d
```

To stop
```shell script
docker-compose -f dev-compose.yml down
```
