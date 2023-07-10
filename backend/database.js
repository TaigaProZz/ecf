const mysql = require('mysql2');

// settings to connect to sql database
const connection = mysql.createConnection(
  {
    host: process.env.REACT_APP_DATABASE_HOST,
    user: process.env.REACT_APP_DATABASE_USERNAME,
    password: process.env.REACT_APP_DATABASE_PASSWORD,
    database: process.env.REACT_APP_DATABASE_NAME,
    ssl : {
      rejectUnauthorized: true
    }
  }
);

// and connect to it
connection.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL');
});

module.exports = connection;