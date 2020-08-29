# Fableous Back-end

This application require [Redis](https://redis.io/) and optionally, 
[PostgreSQL](https://www.postgresql.org/) to be running.

## Running the application

Clone repo
```shell script
git clone git@gitlab.com:todo-teamname/fableous.git
# or
git clone https://gitlab.com/todo-teamname/fableous.git

cd fableous/fableous_be
```

Setup python env
```shell script
python -m venv venv

# windows using powershell
./venv/Scripts/Activate.ps1
# macos and linux
source ./env/bin/activate
```

Install dependency
```shell script
pip install -r requirements.txt
```

Crete `.env` file. See `.example.env` for reference. There is a 
[tool](https://miniwebtool.com/django-secret-key-generator/) to generate secrek key. If `DATABASE_URL` 
field is not filled, Django will use sqlite instead.
```.env
SECRET_KEY=secretsecretsecretsecretsecretsecretsecret
ENV=PRODUCTION|DEVELOPMENT
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
DATABASE_URL=postgres://user:pass@127.0.0.1:5432/postgres
```

Migrate database
```shell script
python manage.py migrate
```

Run the server
```shell script
# development
python manage.py runserver
# production
gunicorn fableous.wsgi
```

## Using Docker to run Redis and Postgres

Start Redis and Postgres
```shell script
docker pull redis:alpine
docker run -it -d -p 6379:6379 --name fableous-redis redis:alpine
docker pull postgres:alpine
docker run -it -d -p 5432:5432 --name fableous-postgres -v "$(PWD)/data:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=pass postgres:alpine
```

To stop
```shell script
docker stop fableous-redis
docker stop fableous-postgres
```

To start a stopped container
```shell script
docker start fableous-redis
docker start fableous-postgres
```
