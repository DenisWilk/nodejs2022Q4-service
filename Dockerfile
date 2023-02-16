FROM node:18-alpine

EXPOSE ${PORT}

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

CMD [ "npm", "run", "start" ]