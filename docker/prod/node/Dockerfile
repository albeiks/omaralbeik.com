# pull official base image
FROM node:10.20.1

# set and copy work directory
WORKDIR /usr/src/app
COPY frontend ./
COPY .env.prod ./.env

# install next app dependencies
RUN yarn install

# copy and run entrypoint script
COPY ./docker/prod/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# set entrypoint script
ENTRYPOINT ["/entrypoint.sh"]

# run next app
CMD ["yarn", "start"]