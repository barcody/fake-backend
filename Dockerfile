FROM keymetrics/pm2:latest-alpine
WORKDIR '/usr/app'
COPY package.json .
COPY pm2.json .
RUN npm install
COPY . .
CMD ["pm2-runtime", "start", "server.js"]