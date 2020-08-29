FROM python:alpine

WORKDIR /home
COPY . .
RUN apk add --no-cache postgresql-libs
RUN apk add --no-cache --virtual .build-deps build-base libffi-dev postgresql-dev && \
    python -m venv venv && \
    venv/bin/pip3 install -r requirements.txt && \
    apk --purge del .build-deps

ENTRYPOINT ["venv/bin/daphne", "fableous_be.asgi:application", "-b", "0.0.0.0", "-p", "8001"]