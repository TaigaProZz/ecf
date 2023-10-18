const util = require('util');
const connection = require('../database');
const jwt = require('jsonwebtoken');

class CookieService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  async getCookie(req, res, next) {
    return new Promise((resolve, reject) => {
      const token = req.signedCookies.session;
      if (!token || typeof token === 'undefined' || token === null) {
        reject('Pas connecté');
        return;
      }

      jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }
        
        const email = decoded.email;
        if (!email) {
          reject('Email non trouvé');
          return;
        } else {
          next();
        }
      });
    });    
  }
}

module.exports = new CookieService();

