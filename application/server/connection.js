// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/roofy.db');

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'roofy'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected! ');
});

module.exports = db;
