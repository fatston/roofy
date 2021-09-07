// dependencies
const express = require('express');
const path = require('path');
const { send } = require('process');
const sqlite3 = require('sqlite3').verbose();



// using dependencies I guess
const app = express();
const bodyParser = require('body-parser');


app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false}));

// connect to db
const db = new sqlite3.Database('./db/basic_login.db');

// home page
app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/index.html'))
})

// about page
app.get('/about',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/about.html'))
})

// contact page
app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/contact.html'))
})

// route to login page
app.get('/login',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/login.html'))
})

// post login request
app.post('/login', (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    console.log(`${email} ${password}`)
    let sql = `
        SELECT password
        FROM user
        WHERE email  = ?
        `;

        // let username = 'cliftonkor';
        // let password = 'password123';
        let auth = false;

        // first row only
        db.get(sql, [email], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (!row || password != row.password) {
            // wrong email or pass
            res.send('Oh no wrong email / password!')
        }
        else {
            // success
            res.sendFile(path.resolve(__dirname,'./public/profile.html'))
        }
    })
});

// profile page
app.get('/profile',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/profile.html'))
})

// route to registration page
app.get('/register',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/register.html'))
})

// post register page
app.post('/register',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    console.log(`${email} ${password} ${name}`)
    let sql = `
        SELECT *
        FROM user
        WHERE email  = ?
    `;

    // let username = 'cliftonkor';
    // let password = 'password123';
    

    sql = `
        INSERT INTO user VALUES (
            ?,?,?
        );
    `;

    db.run(sql, [email,password,name],(err)=>{
        if (err) {
            res.send('username in use, try another username');
            res.end();
        }
    })
    res.send('Registration Success! Please <a href="login">login</a>')
})

app.all('*',(req,res)=>{
    res.send('<h1>resource not found</h1>')
})



app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})

// close the database connection
// db.close();