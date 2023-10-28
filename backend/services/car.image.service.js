const util = require('util');
const connection = require('../database');

class CarImageService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  getById(id) {
    return this.query('SELECT * FROM cars_image WHERE car_id = ?', [id]);
  }

  getAll() {
    return this.query('SELECT * FROM cars_image');
  }
}

module.exports = new CarImageService();