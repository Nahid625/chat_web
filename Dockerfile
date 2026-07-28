# Use Node.js 24 Alpine to match your local machine version (v24.16.0)
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
EXPOSE 4001

CMD ["npm", "run", "start"]