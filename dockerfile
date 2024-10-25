FROM node:latest
WORKDIR /client/
COPY client/public/ /public
COPY client/package.json
RUN npm install
COPY client/src/ /src
ENV NODE_ENV=production
CMD ["npm", "start"]
EXPOSE 3000