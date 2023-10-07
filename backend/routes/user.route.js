const express = require('express');
const router = express.Router();
const connection = require('../database');
const jwt = require('jsonwebtoken');

// get user infos
router.get('/', (req, res) => {
  try {
    const token = req.signedCookies.session;
    if (!token || typeof token === 'undefined' || token === null) return res.status(401).json({ message: 'Pas connecté' });
    const secretKey = 'key';
    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email;
    if(!email) return res.status(401).json({ message: 'JWT invalide' });
    console.log("user");
  
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