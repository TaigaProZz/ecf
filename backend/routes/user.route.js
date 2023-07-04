const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../database');

// get user infos
router.get('/', (req, res) => {
  const token = req.signedCookies.session;
  if (!token) {
    return res.status(401);
  }

  try {
    const secretKey = 'key';
    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email;

    const query = "SELECT permission, name FROM users WHERE email = ?";
    connection.query(query, [email], (error, results) => {
      if (results.length === 0) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
      }
      // collect permission
      res.json(results[0]);
    })

  } catch (error) {
    console.error('Erreur lors de la vérification du JWT', error);
    return res.status(401).json({ message: 'JWT invalide' });
  }
})


module.exports = router;