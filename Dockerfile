FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

RUN npm install

EXPOSE 3333

CMD npm run dev
