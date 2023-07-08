const mysql = require('mysql2');
require('dotenv').config();

// settings to connect to sql database
const connection = mysql.createConnection(
  process.env.DATABASE_URL
);

// and connect to it
connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

module.exports = connection;