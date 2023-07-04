const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken'); 
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const connection = require('./database');



// ignore restriction of cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));

app.use("/user", require("./routes/user.route"));

/***  BACKEND ROUTES ***/

/** CAR ROUTES **/
// get cars 
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

// get car images
router.get('/carsimage', (req, res) => {
  const query = 'SELECT * FROM cars_image';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// specific IMAGES
router.get('/carsimage/:id', (req, res) => {
  const carId = req.params.id;
  const query = 'SELECT * FROM cars_image WHERE car_id = ?';
  connection.query(query, [carId], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// specific CAR
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

// post car
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/cars');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/postcar', upload.array('image', 6), async (req, res) => {
  try {
    const { title, brand, model, description, price, km, year } = req.body;
    const imagePaths = req.files.map(file => file.path.replace('public', ''));
    const jsonImagePaths = JSON.stringify(imagePaths);

    // insert car in database
    const carQuery = 'INSERT INTO cars (title, brand, model, description, price, km, year) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const carValues = [title, brand, model, description, price, km, year];
    connection.query(carQuery, carValues, (error, carResult) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }

      // insert images in database
      const carId = carResult.insertId;
      const imageQuery = 'INSERT INTO cars_image (car_id, path) VALUES (?, ?)';
      const imageValues = [carId, jsonImagePaths];
      connection.query(imageQuery, imageValues, (error) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(200);
      });
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/** SERVICES ROUTES **/
// get service 
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

// update service 
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

// delete service 
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

// post SERVICES 
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


/** FEEDBACKS ROUTES **/
// get feedbacks 
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

// post feedbacks 
router.post('/postfeedback', (req, res) => {
  try {
    const { name, message, rating, isVerified } = req.body;
    const query = 'INSERT INTO feedbacks (name, message, rating, isVerified) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, message, rating, isVerified], (error, results) => {
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

// update feedback validation 
router.put('/validatefeedback/:id', (req, res) => {
  const feedbackId = req.params.id;
  const query = 'UPDATE feedbacks SET isVerified = 1 WHERE id = ?';
  connection.query(query, [feedbackId], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


/** CONTACT ROUTES **/
// get contact
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

// post contact
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

/** SCHEDULE ROUTES **/
// get schedule
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

// post schedule
router.post('/postschedule', async (req, res) => {
  try {
    const updates = req.body;
    const query = 'UPDATE schedule SET morning_opening = ?, morning_closing = ?, afternoon_opening = ?, afternoon_closing = ? WHERE id = ?';

    for (const update of updates) {
      const values = [
        update.morningOpening,
        update.morningClosing,
        update.afternoonOpening,
        update.afternoonClosing,
        update.id,
      ];

      await new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


/** EMPLOYE ROUTES **/
// get employee 
router.get('/employee', (req, res) => {
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

// post employee
router.post('/postemployee', (req, res) => {
  try {
    const { name, email, password, permission } = req.body;

    // check type of variable
    if (typeof name !== 'string' || typeof email !== 'string') {
      return res.status(400).json({ error: 'Les types des variables sont invalides.' });
    }
    // check if values are not empty
    if (name.trim() === '' || email.trim() === '' || permission.trim() === '') {
      return res.status(400).json({ error: 'Les valeurs des variables sont invalides.' });
    }
    const query = 'INSERT INTO users (name, email, password, permission) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, password, permission], (error, results) => {
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