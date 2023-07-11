const express = require('express');
const router = express.Router();
const connection = require('../database');
const multer = require('multer');
const fs = require('fs');

// get cars 
router.get('/', (req, res) => {
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

// specific CAR
router.get('/:id', (req, res) => {
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
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const directory = '/backend/img/cars';
//     if (!fs.existsSync(directory)) {
//       fs.mkdirSync(directory, { recursive: true });
//     }
//     cb(null, directory);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

router.post('/', async (req, res) => {
  try {
    const { title, brand, model, description, price, km, year } = req.body;
    // const imagePaths = req.files.map(file => file.path.replace('public', ''));
    const imageBuffer = fs.readFileSync(req.files);
    const jsonImagePaths = JSON.stringify(imageBuffer);

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

// delete car
router.delete('/:id', (req, res) => {
  const carId = req.params.id;
  const query = 'DELETE FROM cars WHERE id = ?';
  connection.query(query, [carId], (error) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;