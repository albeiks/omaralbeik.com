# pull official base image
FROM node:latest

# set and copy work directory
WORKDIR /usr/src/app
COPY frontend ./
COPY .env.dev ./.env

# install next app dependencies
RUN yarn install

# create production build
RUN yarn run build

# run next app
CMD ["yarn", "dev"]