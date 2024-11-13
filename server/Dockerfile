FROM node:18-alpine AS build

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY prisma ./prisma
COPY . .

COPY .env .env

RUN npx prisma generate
RUN npm run build

FROM node:18-alpine

WORKDIR /src

COPY --from=build /src/dist ./dist

COPY --from=build /src/package*.json ./
COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/prisma ./prisma

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
