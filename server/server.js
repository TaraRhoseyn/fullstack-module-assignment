// Accessing installations:
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

// Express set up:
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Uses express-session to keep track of user_id once they're logged in:
app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

// Connecting to database:
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "furniturezz"
})

db.connect(err => {
    if (err) {
        console.error('ERROR: Database connection has failed:', err.stack);
        return;
    }
    console.log('SUCCESS: Express is connected to MySQL');
});

// Creates an API endpoint to register a new user:
app.post('/api/signup', (req, res) => {
    const { username, password, title, first_name, last_name, gender, address1, address2, address3, postcode, description, email, telephone } = req.body;

    const query = `
      INSERT INTO users (username, password, title, first_name, last_name, gender, adress1, adress2, adress3, postcode, description, email, telephone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [username, password, title, first_name, last_name, gender, address1, address2, address3, postcode, description, email, telephone],
        (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: 'Failed to create user' });
            }
            res.status(201).json({ message: 'User created successfully' });
        }
    );
});

// Creates an API endpoint to log a user in:
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = `
      SELECT user_id 
      FROM users 
      WHERE username = ? AND password = ?
    `;

    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'An error occurred during login' });
        }

        if (result.length > 0) {
            const user = result[0];
            // Saves user_id from DB to the session
            req.session.user_id = user.user_id;
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});



// add furniture
app.post('/api/addFurniture', (req, res) => {
    const { furniture_make, furniture_model, furniture_color, furniture_type, location, year, video_url, image_url } = req.body;
    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const query = `
      INSERT INTO furniture_details (user_id, furniture_make, furniture_model, furniture_color, furniture_type, location, year, video_url, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [user_id, furniture_make, furniture_model, furniture_color, furniture_type, location, year, video_url, image_url],
        (err, result) => {
            if (err) {
                console.error('Error adding furniture:', err);
                return res.status(500).json({ error: 'Failed to add furniture' });
            }
            res.status(201).json({ message: 'Furniture added successfully' });
        }
    );
});

// Fetch all furniture items for the logged-in user
app.get('/api/userFurniture', (req, res) => {
    const user_id = req.session.user_id;

    if (!user_id) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const query = `
      SELECT * FROM furniture_details 
      WHERE user_id = ?
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error('Error fetching furniture:', err);
            return res.status(500).json({ error: 'Failed to fetch furniture' });
        }

        res.status(200).json(results);
    });
});



app.listen(5000, () => {
    console.log("SUCCESS: Express is listening on Port 5000");
})
