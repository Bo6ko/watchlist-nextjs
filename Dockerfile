FROM node:18-alpine
WORKDIR /watchlist
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]
