# pull official base image for builder
FROM node:10.20.1

# create and set build directory
RUN mkdir /app
WORKDIR /app

# copy dependencies
COPY frontend/package.json ./
COPY frontend/yarn.lock ./

# install dependencies
RUN yarn install

# run next app
CMD ["yarn", "dev"]