FROM node:alpine

WORKDIR /app
COPY package.json .
# RUN npm install -g npm@9.7.1
RUN npm install --only=prod
COPY . . 

CMD ["npm","start"]