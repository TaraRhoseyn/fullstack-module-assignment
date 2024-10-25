FROM node:latest
WORKDIR /client/
COPY client/public/ /public
COPY client/src/ /src
ENV NODE_ENV=production
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000