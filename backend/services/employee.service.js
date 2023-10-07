const util = require('util');
const connection = require('../database');
const bcrypt = require('bcrypt');

class EmployeeService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  getAll() {
    return this.query('SELECT id, name, email, permission FROM users');
  }

  async create(user) {
    try {
      const { name, email, password, permission } = user;
  
      // check type of variable and if empty
      if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        name.trim() === '' ||
        email.trim() === '' ||
        permission.trim() === ''
      ) {
        return { success: false, error: 'Les informations saisies sont incorrectes.' };
      }
  
      // hashing password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      // insert into db
      const result = await this.query('INSERT INTO users (name, email, password, permission) VALUES (?, ?, ?, ?)',
        [name, email, hash, permission]);
  
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  update(id, body) {
    const { name, email, permission } = body;
    return this.query('UPDATE users SET name = ?, email = ?, permission = ? WHERE id = ?', [name, email, permission, id]);
  }
}

module.exports = new EmployeeService();