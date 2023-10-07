const util = require('util');
const connection = require('../database');

class UserService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  getAll() {
    return this.query('SELECT * FROM contact');
  }

  create(body) {
    const { subject, name, phone, email, message } = body;
    return this.query('INSERT INTO contact (subject, name, phone, email, message) VALUES (?, ?, ?, ?, ?)',
    [subject, name, phone, email, message]);
  }
}

module.exports = new UserService();