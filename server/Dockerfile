#build stage
FROM node:16-alpine AS build

WORKDIR /server

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#production stage
FROM node:16-alpine AS production

WORKDIR /server

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /server/dist ./dist

CMD ["node", "dist/src/index.js"]
