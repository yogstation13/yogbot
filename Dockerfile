FROM node:12-alpine as build

ENV NODE_ENV=production
WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production

FROM alpine:3.15 as final

RUN apk --no-cache add --upgrade nodejs~12

USER 1000

RUN mkdir -p /app
RUN mkdir /app/data
RUN mkdir /app/config
RUN mkdir /app/html/changelog
WORKDIR /app

COPY --from=build /app/node_modules node_modules
COPY app.js app.js
COPY models models
COPY package.json package.json

ENV NODE_ENV=production
CMD ["node", "app.js"]
