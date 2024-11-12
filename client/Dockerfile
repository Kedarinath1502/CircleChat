ARG NODE_VERSION=23.1.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY .env .env

COPY . .

EXPOSE 3000

CMD npm run dev
