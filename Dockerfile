FROM node:18-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install --production
RUN npm install -g concurrently

COPY . .
COPY src .
COPY src src

CMD ["npm", "start"]
