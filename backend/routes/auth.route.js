const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../database');
const bcrypt = require('bcrypt');

// login
router.post('/', (req, res) => {
  const { email, password } = req.body;
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
        try {  // compare password
          bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              if (passwordMatch) {
                const token = jwt.sign({ email: user.email}, 'key');
                res.cookie('session', token, { maxAge: 3600000, httpOnly: true, secure: true, signed: true });
                res.status(200).json({name: user.name, permission: user.permission});
              } else {
                res.status(401).json({ success: false, error: 'Mot de passe incorrect' });
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
});

// log out 
router.get("/", (req, res) => {
  return res
    .clearCookie("session")
    .status(200)
    .json({ message: "Successfully logged out" });
});

module.exports = router;
