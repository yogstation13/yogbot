FROM node:12-alpine as build

ENV NODE_ENV=production
WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production

FROM alpine:3.12 as final

RUN apk --no-cache add --upgrade nodejs~12

RUN mkdir /app
RUN chown 1000:1000 /app

USER 1000

RUN mkdir /app/data
RUN mkdir /app/config
RUN mkdir -p /app/html/changelog
WORKDIR /app

COPY --from=build /app/node_modules node_modules
COPY app.js app.js
COPY models models
COPY package.json package.json

ENV NODE_ENV=production
CMD ["node", "app.js"]
