const util = require('util');
const connection = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  async login(body) {
    const { email, password } = body;
    const user = await this.query('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length === 0) {
      return { success: false, error: 'Email incorrect' };
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (passwordMatch) {
      const token = jwt.sign({ email: user[0].email }, process.env.JWT_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '30d',
      });

      return {
        success: true,
        token,
        name: user[0].name,
        permission: user[0].permission,
      };
    } else {
      return { success: false, error: 'Mot de passe incorrect' };
    }
  }
}

module.exports = new AuthService();