# pull official base image
FROM nginx:latest

# remove default nginx conf file
RUN rm /etc/nginx/conf.d/default.conf

# copy default conf file
COPY ./docker/prod/nginx/app.conf /etc/nginx/conf.d/