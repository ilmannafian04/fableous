# Fableous Back-end

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

Crete `.env` file. See `.example.env` for reference. There is a [tool](https://miniwebtool.com/django-secret-key-generator/) to generate secrek key
```.env
SECRET_KEY=secretsecretsecretsecretsecretsecretsecret
ENV=PRODUCTION|DEVELOPMENT
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