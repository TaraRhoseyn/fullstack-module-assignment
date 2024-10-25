# React Project Example

## Starting up the frontend server
Change directory into the correct dir:
```
cd client
```
Start up the node server to run the React instance:
```
npm start
```
This will export a local port on your PC and you can visit your React site.

Create docker image:
```
docker image build -t fullstack-module-assignment-image .
```
Maybe use (-v) for putting it in verbose mode.

Create docker container:
```
docker run -p 3000:3000 --name fullstack-module-assignment-container fullstack-module-assignment-image:latest
```

Issue:
- react-scripts not installed properly, because I was using ENV_MODULE=production
- changed this
- react-scripts now working
- but react-script now returning an issue when attempting to run the container, cannot file client/public/index.html

New try:
```
FROM node:18
WORKDIR /client
COPY client/package.json ./
RUN npm install
COPY client/public ./public
COPY client/src ./src
EXPOSE 3000 ## could also be 3001, React by default is 3000
CMD ["npm", "start"]
```
Had to manually change the React port from 3000 to 3001 then map across in the container build:
```
docker run -p 3001:3001 --name fullstack-module-assignment-container fullstack-module-assignment-image:latest
```