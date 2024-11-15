FROM node:18
WORKDIR /client
COPY package.json .
RUN npm install --verbose
COPY . .
EXPOSE 3001
CMD ["npm", "start"]