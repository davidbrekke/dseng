FROM node:12

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# installing dependencies
COPY package.json yarn.lock ./
RUN yarn install

# copying source files
COPY . .

RUN yarn run prisma generate

# building app
RUN yarn build

# starting the app
CMD ["yarn", "start"]
EXPOSE 3000