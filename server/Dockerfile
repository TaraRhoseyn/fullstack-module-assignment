FROM node:18
WORKDIR /client
COPY package.json .
RUN npm install --verbose
COPY . .
CMD ["npm", "start"]