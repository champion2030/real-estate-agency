FROM node:lts as builder
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci --only=production && npm install -g typescript
COPY . .
RUN tsc

FROM node:lts
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/dist /usr/src/app
CMD ["node", "./nodes/restGateway/app.js"]
