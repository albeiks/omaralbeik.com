# pull official base image
FROM node:latest

# copy and run entrypoint script
COPY ./docker/dev/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# set and copy temp directory
WORKDIR /tmp
COPY frontend/package.json /tmp/
COPY frontend/yarn.lock /tmp/

# install next app dependencies
RUN yarn install

# set and copy work directory
WORKDIR /usr/src/app
COPY frontend /usr/src/app/
COPY .env.dev /usr/src/app/.env
RUN cp -a /tmp/node_modules /usr/src/app/

# set entrypoint script
ENTRYPOINT ["/entrypoint.sh"]

# expose port for next dev server
EXPOSE 3000

# run next app
CMD ["yarn", "dev"]