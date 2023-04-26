FROM node:alpine
WORKDIR /app/user

COPY package.json .
RUN npm install --production --legacy-peer-deps

COPY . .
CMD node app.js
