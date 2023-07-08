const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// settings to connect to sql database
const connection = mysql.createConnection({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE
});

// and connect to it
connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

module.exports = connection;