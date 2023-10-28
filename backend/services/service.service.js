const util = require('util');
const connection = require('../database');

class ServiceService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  create(service) {
    return this.query('INSERT INTO services (services) VALUES (?)', [service]);
  }

  getAll() {
    return this.query('SELECT * FROM services');
  }

  update(id, service) {
    return this.query('UPDATE services SET services = ? WHERE id = ?', [service, id]);
  }

  delete(id) {
    return this.query('DELETE FROM services WHERE id = ?', [id]);
  }
}

module.exports = new ServiceService();