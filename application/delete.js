// dependencies
const express = require('express');
const path = require('path');
const { send, nextTick } = require('process'); // delete if necessary
const sqlite3 = require('sqlite3').verbose();



// using dependencies I guess
const app = express();
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// connect to db
const db = new sqlite3.Database('./db/roofy.db');

app.get('/delete',(req,res)=>{
    let email = "cliftonkor@gmail.com"
    let password = "password123"

    let sql = `
        SELECT password
        FROM user
        WHERE email = ${email};
    `;
    // run the sql query on db
    db.get(sql, (err, row) => {
        if (err) {
            // return false
            res.send('login failed. <a href="login">try again</a>')
        }
        else if (!row || password != row.password) {
            // wrong email or pass
            // return false;
            res.send('wrong email or password. <a href="login">try again</a>')
        }
        else {
            res.send('success!')
        }
    })
})


app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})