FROM node:latest
WORKDIR /client/ .
COPY client/public/ /public
COPY client/package.json
RUN npm install
COPY client/src/ /src
CMD ["npm", "start"]
EXPOSE 3000