const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken'); 
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');

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

// ignore restriction of cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// GET SERVICES route
router.get('/getservices', (req, res) => {
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

// UPDATE SERVICES route
router.put('/updateservices/:id', (req, res) => {
   const servicesId = req.params.id;
   const msg = req.body.services;
   const query = 'UPDATE services SET services = ? WHERE id = ?';
   connection.query(query, [msg, servicesId], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      console.log(results);
      res.sendStatus(200);
    }
  });
});

// DELETE SERVICES route
router.delete('/deleteservices/:id', (req, res) => {
  const serviceId = req.params.id;
  const query = 'DELETE FROM services WHERE id = ?';
  connection.query(query, [serviceId], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// POST SERVICES route
router.post('/postservices', (req, res) => {
  try {
    const service = req.body.services;
    console.log(req);
    const query = 'INSERT INTO services (services) VALUES (?)';
    connection.query(query, [service], (error, results) => {
      if (error) {
        console.log(error);
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

// GET FEEDBACKS route
router.get('/getfeedback', (req, res) => {
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
router.post('/postfeedback', (req, res) => {
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

// employe route 
router.get('/employe', (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  })
});

// LOGIN route
router.post('/login', (req, res) => {
  const { email, password } = req.body.params;
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      if (results.length === 0) {
        res.status(401).json({ error: 'Email incorrect' });
      } else {
        const user = results[0];
        // compare password
        try {
          if(password === user.password) {
            res.cookie('session', user.id, { maxAge: 3600000, httpOnly: true });
            res.sendStatus(200);
          } else {
            res.status(401).json({ success: false, error: 'Mot de passe incorrect' });
          }
        } catch (error) {
          console.log(error);
        }
        // bcrypt.compare(password, user.password, (err, passwordMatch) => {
        //   console.log(password + " " + user.password);
        //   if (err) {
        //     console.log(err);
        //     res.sendStatus(500);
        //   } else {
        //     if (passwordMatch) {
        //       res.status(200).json({ success: true });
        //     } else {
        //       res.status(401).json({ success: false, error: 'Mot de passe incorrect' });
        //     }
        //   }
        // });
      }
    }
  });
});


// log out 
// app.get("/logout", authorization, (req, res) => {
//   return res
//     .clearCookie("session")
//     .status(200)
//     .json({ message: "Successfully logged out" });
// });

// GET CONTACT route
router.get('/getcontact', (req, res) => {
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
router.post('/postcontact', (req, res) => {
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