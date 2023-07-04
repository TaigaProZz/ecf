const express = require('express');
const router = express.Router();
const connection = require('../database');

// get service 
router.get('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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

module.exports = router;