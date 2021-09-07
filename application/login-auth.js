




const { send } = require('process');

const sqlite3 = require('sqlite3').verbose();

// open the database
const db = new sqlite3.Database('./db/basic_login.db');

let sql = `
  SELECT password
  FROM user
  WHERE email  = ?
`;

//let email = req.body.email;
//let password = req.body.password;
let email = 'cliftonkor@gmail.com';
let password = 'password123';
let auth = false;

// first row only
db.get(sql, [email], (err, row) => {
  if (err) {
      return console.error(err.message);
  }
  if (!row || password != row.password) {
      console.log(`email or password is wrong`);
      
  }
  else {
      console.log('password is correct! proceed with login')
      auth = true;
  }


  // close the database connection
  db.close();

})
