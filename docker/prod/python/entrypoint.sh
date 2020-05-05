#!/bin/bash

python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate

echo "Running command '$*'"
exec /bin/bash -c "$*"