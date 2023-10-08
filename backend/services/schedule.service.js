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
    console.log(updates);
    const query =
      'UPDATE schedule SET morning_opening = ?, morning_closing = ?, afternoon_opening = ?, afternoon_closing = ? WHERE id = ?';
    try {
      for (const update of updates) {
        const values = [
          update.morningOpening !== null ? update.morningOpening : null,
          update.morningClosing !== null ? update.morningClosing : null,
          update.afternoonOpening !== null ? update.afternoonOpening : null,
          update.afternoonClosing !== null ? update.afternoonClosing : null,
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