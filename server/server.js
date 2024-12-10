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
    database: "furniturezz",
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


// Creates an API endpoint to log in a user:
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
            req.session.user_id = user.user_id; // Store in session
            res.status(200).json({ message: 'Login successful', user_id: user.user_id }); // Include user_id in response
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});


// Creates an API endpoint to add furniture items to the DB:
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


// Creates an API endpoint to delete a furniture item from the DB:
app.delete('/api/furniture/:id', (req, res) => {
    const furniture_id = req.params.id;

    const query = `
      DELETE FROM furniture_details 
      WHERE furniture_id = ?
    `;

    db.query(query, [furniture_id], (err, result) => {
        if (err) {
            console.error('Error deleting furniture:', err);
            return res.status(500).json({ error: 'Failed to delete furniture' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Furniture not found' });
        }

        res.status(200).json({ message: 'Furniture deleted successfully' });
    });
});


// Creates an API endpoint to edit a furniture item and update the DB:
app.put('/api/furniture/:id', (req, res) => {
    const furniture_id = req.params.id;
    const { furniture_make, furniture_model, furniture_color, furniture_type, location, year, video_url, image_url } = req.body;

    const query = `
      UPDATE furniture_details 
      SET furniture_make = ?, furniture_model = ?, furniture_color = ?, furniture_type = ?, location = ?, year = ?, video_url = ?, image_url = ? 
      WHERE furniture_id = ?
    `;

    db.query(query, [furniture_make, furniture_model, furniture_color, furniture_type, location, year, video_url, image_url, furniture_id], (err, result) => {
        if (err) {
            console.error('Error updating furniture:', err);
            return res.status(500).json({ error: 'Failed to update furniture' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Furniture not found' });
        }

        res.status(200).json({ message: 'Furniture updated successfully' });
    });
});


// Fetches furniture details by ID from the DB:
app.get('/api/furniture/:id', (req, res) => {
    const furnitureId = req.params.id;

    const query = `
        SELECT * FROM furniture_details 
        WHERE furniture_id = ?
    `;

    db.query(query, [furnitureId], (err, result) => {
        if (err) {
            console.error('Error fetching furniture details:', err);
            return res.status(500).json({ error: 'Failed to fetch furniture details' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Furniture not found' });
        }

        res.status(200).json(result[0]);
    });
});


// Fetches furniture by user_id from the DB:
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
