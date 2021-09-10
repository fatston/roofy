var mysql = require('mysql');

var con = mysql.createConnection({
    host: "sql6.freemysqlhosting.net",
    user: "sql6434715",
    password: "Lg9TWeFtmI",
    database: "sql6434715"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});