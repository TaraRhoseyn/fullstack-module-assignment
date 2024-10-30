// Accessing installations:
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Express set up:
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connecting to database:
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "furniturezz"
})

db.connect(err => {
    if (err) {
      console.error('Error: Database connection has failed:', err.stack);
      return;
    }
    console.log('Success: Express is connected to MySQL');
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

app.listen(5000, () => {
    console.log("Success: Express is listening on Port 5000");
})
