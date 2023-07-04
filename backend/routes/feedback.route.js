const express = require('express');
const router = express.Router();
const connection = require('../database');

// get feedbacks 
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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

module.exports = router;