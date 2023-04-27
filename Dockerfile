FROM node:16
WORKDIR /var/bot/
COPY . .
COPY .env ./env
RUN npm install
RUN npm install -g pm2
CMD [ "pm2-runtime", "process.json" ]