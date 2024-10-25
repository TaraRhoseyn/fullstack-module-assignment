FROM node:18
WORKDIR /client
COPY client/package.json ./
RUN npm install
COPY client/public ./public
COPY client/src ./src
EXPOSE 3000
CMD ["npm", "start"]