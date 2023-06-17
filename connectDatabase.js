const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const router = express.Router();

app.use(cors());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'azer',
  database: 'ecf'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// car route
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

// services route
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

// horaires feedbacks
router.get('/feedbacks', (req, res) => {
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

// horaires horaires
router.get('/horaires', (req, res) => {
  const query = 'SELECT * FROM horaires';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

app.use('/api', router);

const port = 3307; 
app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
 
});