FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

CMD [ "node", "server.js" ]
