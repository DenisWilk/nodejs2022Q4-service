FROM node:18-alpine

WORKDIR /usr/app/src

COPY package.json package-lock.json ./

RUN npm ci && npm cache clean --force 

COPY prisma ./prisma/

RUN npx prisma generate

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]