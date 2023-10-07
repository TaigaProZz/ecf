const util = require('util');
const connection = require('../database');

class UserService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  getAll() {
    return this.query('SELECT id, name, email, grade FROM users');
  }

  updatePermission(id, grade) {
    return this.query('UPDATE users SET grade = ? WHERE id = ?', [grade, id]);
  }
}

module.exports = new UserService();