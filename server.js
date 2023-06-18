const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const router = express.Router();

// ignore restriction of cors
app.use(cors());

// settings to connect to sql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'azer',
  database: 'ecf'
});

// and connect to it
connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/***  BACKEND ROUTES ***/

// CAR route
router.get('/cars', (req, res) => {
  const query = 'SELECT * FROM cars';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// specific CAR route
router.get('/cars/:id', (req, res) => {
  const carId = req.params.id;
  const query = 'SELECT * FROM cars WHERE id = ?';
  connection.query(query, [carId], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// SERVICES route
router.get('/services', (req, res) => {
  const query = 'SELECT * FROM services';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// GET FEEDBACKS route
router.get('/feedback', (req, res) => {
  const query = 'SELECT * FROM feedbacks';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// POST FEEDBACK route
router.post('/feedback', (req, res) => {
  try {
    const { name, message, rating, isVerified } = req.body;
    const query = 'INSERT INTO feedbacks (name, message, rating, isVerified) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, message, rating, isVerified], (error, results) => {
      if (error) {
        res.sendStatus(500);
      } else {
        console.log(results);
        res.sendStatus(200);
      }
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// schedule route
router.get('/schedule', (req, res) => {
  const query = 'SELECT * FROM schedule';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// LOGIN route
router.get('/login', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// GET CONTACT route
router.get('/contact', (req, res) => {
  const query = 'SELECT * FROM contact';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// POST CONTACT route
router.post('/contact', (req, res) => {
  try {
    const { subject, name, phone, email, message } = req.body;
    const query = 'INSERT INTO contact (subject, name, phone, email, message) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [subject, name, phone, email, message], (error, results) => {
      if (error) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});



// start backend server
app.use('/api', router);

const port = 3307; 
app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});