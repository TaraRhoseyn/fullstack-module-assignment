# Furniturezz

This repository is for purely educational purposes and submitted for a university assignment.

# Starting the database

This application uses a MySQL database hosted locally on a machine. To start the database I used the software XAMPP. 

To run a MySQL database using XAMPP you need to:

1. Access the XAMPP Control Panel on your local machine.
2. Start the Apache and MySQL databases on the Control Panel.
3. Go to your 'http://localhost'
4. Click 'MyPHPAdmin'
5. Create a new database

# Starting the backend server
Change directory into the correct dir:
```
cd server
```
Start the server (using nodemon so any changes will automatically be updated and there's no need to restart the server every time)
```
npm start
```
This will start your Express application running on port 5000.

# Starting up the frontend server
Change directory into the correct dir:
```
cd client
```
Start up the node server to run the React instance:
```
npm start
```
This will start your React application running on port 3000.



