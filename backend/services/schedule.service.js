const util = require('util');
const connection = require('../database');

class ScheduleService {
  
  constructor() {
    this.query = util.promisify(connection.query).bind(connection);
  }

  getAll() {
    return this.query('SELECT * FROM schedule');
  }

  async update(body) {
    const updates = body;
    const query =
      'UPDATE schedule SET morning_opening = ?, morning_closing = ?, afternoon_opening = ?, afternoon_closing = ? WHERE id = ?';
    try {
      for (const update of updates) {
        const values = [
          update.morning_opening,
          update.morning_closing,
          update.afternoon_opening,
          update.afternoon_closing,
          update.id,
        ];
      await new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve();
          }
        });
        });
      }
    } catch (error) {
      console.error(error);
    }  
  }
}

module.exports = new ScheduleService();