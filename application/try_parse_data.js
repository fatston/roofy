const path = require('path');

app.use(bodyParser.urlencoded({extended: false}));

const { send } = require('process');

const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/basic_login.db');


const logger = (req,res,next) => {
    let username = req.body.email;
    let password = req.body.password;

    let sql = `
    SELECT password
    FROM user
    WHERE username  = ?
    `;

    //let username = req.body.email;
    //let password = req.body.password;
    let username = 'cliftonkor';
    let password = 'password123';
    let auth = false;

    // first row only
    db.get(sql, [username], (err, row) => {
    if (err) {
        return console.error(err.message);
    }
    if (!row || password != row.password) {
        console.log(`username or password is wrong`);
        
    }
    else {
        console.log('password is correct! proceed with login')
        auth = true;
    }


    // close the database connection
    db.close();

    })
    
    next()
}

module.exports = logger