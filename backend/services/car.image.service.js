const util = require('util');
const connection = require('../database');

class UserService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  getById(id) {
    return this.query('SELECT * FROM cars_image WHERE car_id = ?', [id]);
  }

  getAll() {
    return this.query('SELECT * FROM cars_image');
  }

  updatePermission(id, grade) {
    return this.query('UPDATE users SET grade = ? WHERE id = ?', [grade, id]);
  }
}

module.exports = new UserService();