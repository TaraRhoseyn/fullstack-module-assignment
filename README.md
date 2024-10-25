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
docker run -dp 8000:3000 --name fullstack-module-assignment-container fullstack-module-assignment-image:latest
```

Issue:
- react-scripts not installed properly, because I was using ENV_MODULE=production
- changed this
- react-scripts now working
- but react-script now returning an issue when attempting to run the container, cannot file client/public/index.html