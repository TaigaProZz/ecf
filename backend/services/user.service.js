const util = require('util');
const connection = require('../database');
const jwt = require('jsonwebtoken');

class UserService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  getAll(req) {
    return new Promise((resolve, reject) => {
      const token = req;
      if (!token || typeof token === 'undefined' || token === null) {
        reject('Pas connecté');
        return; 
      }
      const secretKey = process.env.JWT_TOKEN_SECRET;
      try {
        const decoded = jwt.verify(token, secretKey);
        const email = decoded.email;
        if(!email) {
          reject('Email non trouvé');
          return;
        } else {
          resolve(this.query('SELECT permission, name FROM users WHERE email = ?', [email]));
        }
      } catch(err) {
        reject(err);
        return;
      } 
    });
  }
}

module.exports = new UserService();