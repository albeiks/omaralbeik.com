# pull official base image
FROM python:3.8.0

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set and copy work directory
WORKDIR /backend
COPY ./backend /backend

# copy and run entrypoint script
COPY ./docker/prod/python/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# install django app dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r /backend/requirements/prod.txt

# set entrypoint script
ENTRYPOINT ["/entrypoint.sh"]

# run gunicorn
CMD [ "gunicorn", "-w", "3", "core.wsgi", "-b", "0.0.0.0:8000" ]