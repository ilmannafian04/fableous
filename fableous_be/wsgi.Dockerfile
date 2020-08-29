FROM python:alpine

WORKDIR /home
COPY . .
RUN apk update && \
    apk add --no-cache postgresql-libs
RUN apk add --no-cache --virtual .build-deps build-base libffi-dev postgresql-dev && \
    python -m venv venv && \
    venv/bin/python -m pip install --upgrade pip && \
    venv/bin/pip3 install wheel && \
    venv/bin/pip3 install -r requirements.txt && \
    apk --purge del .build-deps

ENTRYPOINT ["venv/bin/gunicorn", "fableous_be.wsgi", "--log-file", "-", "-b", "0.0.0.0:8000"]