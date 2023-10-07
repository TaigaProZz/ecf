const util = require('util');
const connection = require('../database');

class UserService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  getAll() {
    return this.query('SELECT * FROM feedbacks');
  }

  getAllVerified() {
    return this.query('SELECT * FROM feedbacks WHERE isVerified = 1');
  }

  create(body) {
    const { name, message, rating, isVerified } = body;
    return this.query('INSERT INTO feedbacks (name, message, rating, isVerified) VALUES (?, ?, ?, ?)', 
    [name, message, rating, isVerified]);
  }

  update(id, grade) {
    return this.query('UPDATE feedbacks SET isVerified = ? WHERE id = ?', [grade, id]);
  }

  delete(id) {
    return this.query('DELETE FROM feedbacks WHERE id = ?', [id]);
  }
}

module.exports = new UserService();