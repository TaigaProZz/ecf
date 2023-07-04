const express = require('express');
const router = express.Router();
const connection = require('../database');

// get schedule
router.get('/', (req, res) => {
  const query = 'SELECT * FROM schedule';
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

// post schedule
router.post('/', async (req, res) => {
  try {
    const updates = req.body;
    const query = 'UPDATE schedule SET morning_opening = ?, morning_closing = ?, afternoon_opening = ?, afternoon_closing = ? WHERE id = ?';

    for (const update of updates) {
      const values = [
        update.morningOpening,
        update.morningClosing,
        update.afternoonOpening,
        update.afternoonClosing,
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

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;