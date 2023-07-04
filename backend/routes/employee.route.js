const express = require('express');
const router = express.Router();
const connection = require('../database');
const bcrypt = require('bcrypt');

// get employee 
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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

    // hash password and insert into database
    bcrypt.genSalt(10, (err, salt) => {
      if(err) {
        return res.sendStatus(500);
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if(err) {
          return res.sendStatus(500);
        }
        
        const query = 'INSERT INTO users (name, email, password, permission) VALUES (?, ?, ?, ?)';
        connection.query(query, [name, email, hash, permission], (error, results) => {
          if (error) {
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;