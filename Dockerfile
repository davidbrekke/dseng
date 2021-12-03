FROM node:12

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# installing dependencies
COPY yarn.lock .
RUN yarn install

# copying source files
COPY . .

# building app
RUN yarn build
EXPOSE 3000

# starting the app
CMD ["yarn", "start"]