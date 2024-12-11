# Furniturezz

This repository is for purely educational purposes and submitted for a university assignment.

# Technology used

- **React** for frontend
- **Node** for backend
- **Express** for API
- **MySQL** for database

## Smaller dependencies

- **Bootstrap** for styling, particularly for layout
- **nodemon** for handling Node server
- **react-router-dom** for handling routes in React
- **XAMPP** for running the SQL server

# Starting the database

This application uses a MySQL database hosted locally on a machine. To start the database I used the software XAMPP. 

To run a MySQL database using XAMPP you need to:

1. Install XAMPP
2. Open XAMPP Control Panel
3. Click 'Start' on Apache server and MySQL server
4. Go to your 'http://localhost'
5. Click 'MyPHPAdmin'
6. Create a new database using the SQL script in the root of this project.

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



