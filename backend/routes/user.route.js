const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../database');

router.post('/login', (req, res) => {
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
        // compare password
        try {
          if(password === user.password) {
            // create cookie if login is successfull
            const token = jwt.sign({ email: user.email}, 'key');
            res.cookie('session', token, { maxAge: 3600000, httpOnly: true, sameSite: true, secure: true, signed: true });
            res.status(200).json({name: user.name, permission: user.permission});
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

router.get('/getpermission', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'JWT manquant' });
  }

  try {
    const secretKey = 'key';
    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email;

    const query = "SELECT permission FROM users WHERE email = ?";
    connection.query(query, [email], (error, results) => {
      if (results.length === 0) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
      }
      // collect permission
      res.json({ permission: results[0].permission });
    })

  } catch (error) {
    console.error('Erreur lors de la vérification du JWT', error);
    return res.status(401).json({ message: 'JWT invalide' });
  }
})

router.get('/user', (req, res) => {
  console.log(req)
  const token = req.signedCookies.session;
  if (!token) {
    return res.status(401).json({ message: 'JWT manquant' });
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

// log out 
router.get("/logout", (req, res) => {
  return res
    .clearCookie("session")
    .status(200)
    .json({ message: "Successfully logged out" });
});

module.exports = router;