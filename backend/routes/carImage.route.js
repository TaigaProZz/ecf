const express = require('express');
const router = express.Router();
const connection = require('../database');

// get car images
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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

module.exports = router;