const util = require('util');
const connection = require('../database');

class ServiceService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  getAll() {
    return this.query('SELECT * FROM services');
  }

  update(id, service) {
    return this.query('UPDATE services SET services = ? WHERE id = ?', [service, id]);
  }

  create(service) {
    return this.query('INSERT INTO services (services) VALUES (?)', [service]);
  }

  delete(id) {
    return this.query('DELETE FROM services WHERE id = ?', [id]);
  }
}

module.exports = new ServiceService();