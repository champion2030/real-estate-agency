FROM node:lts as builder
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci --only=production

FROM node:lts
RUN apk add dumb-init
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV
WORKDIR /usr/src/app
COPY --from=dist /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=dist /usr/src/app/dist /usr/src/app
CMD ["dumb-init", "node", "./src/nodes/restGateway/app.js"]
