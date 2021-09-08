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



// =========== paths =========== //

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
app.post('/login', authLogin, createSession, (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/profile.html'))
});

// route to registration page
app.get('/register',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/register.html'))
})

// post register page
app.post('/register',registerUser,(req,res)=>{
    res.send(`<h1>Registration Success!</h1> 
    <p>Please <a href="login">login</a></p>`);
})


// =========== Paths that need checkSession =========== //

// profile page
app.get('/profile',(req,res)=>{
    console.log(req.params.name);
    res.sendFile(path.resolve(__dirname,'./public/profile.html'))
})


// =========== APIs =========== //

// get profile details
app.post('/api/user/:email', checkSession, getUserDetails,(req,res)=>{
    res.send('user details: ...');
})

// get search details
app.get('/api/search', searchProperties, (req,res)=>{
    
})


// =========== losted area =========== //

// lost page
app.all('*',(req,res)=>{
    res.send('<h1>You seem lost...</h1><p><a href="/">go back</a></p>')
})





// =========== middleware =========== //


// =========== session and cookies =========== //

function createSession(req, res, next) {
    // todo create session function
    console.log('session created :)');
    next()
}

function checkSession(req,res,next) {
    // todo create check session function
    if (true == true) {
        console.log('session is active')
        next()
    } else {
        console.log('session is not active')
        res.send(`
            <h1>no hacking allowed!</h1>
            <a href="login">proceed to login</a>
        `)
    }
}

function createCookie(req, res, next) {
    // todo create session function
    console.log('session created :)');
    next()
}

// =========== db functions =========== //

function authLogin(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    let sql = `
        SELECT password
        FROM user
        WHERE email = ?;
    `;
    // run the sql query on db
    db.get(sql, [email], (err, row) => {
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
            next();
        }
    })
}

function registerUser(req,res,next) {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    let sql = `
        SELECT *
        FROM user
        WHERE email  = ?
    `;

    sql = `
        INSERT INTO user(email,password,name) VALUES (
            (?),(?),(?)
        );
    `;

    db.run(sql, [email,password,name],(err)=>{
        if (err) {
            res.send('Email is already used. <a href="register">try again</a>')
            res.end();
        } else {
            next()
        }
    })
}

function getUserDetails(req,res,next) {
    // get session details
    // let email = session.email;
    let email = 'cliftonkor@gmail.com';

    let sql = `
        SELECT *
        FROM user
        WHERE email = ?;
    `;
    // run the sql query on db
    db.get(sql, [email], (err, row) => {
        if (err) {
            // return false
            res.send('login failed. <a href="login">try again</a>')
        }
        else if (!row || password != row.password) {
            // wrong email or pass
            // return false;
            res.send(`
                <h1>wrong email or password.</h1> 
                <a href="login">try again</a>
            `)
        }
        else {
            req.email = row.email;
            req.name = row.name;
            // add on if there are more rowz
            // req.<variablePassed> = row.<nameOfDBRow>
            next();
        }
    })
}

function searchProperties(req,res,next) {
    let buyer = false;
    if (req.body.buy === true) {
        buyer = true;
    }
    let search = req.body.searchString;
    let type = req.body.residential;
    let price = req.body.price;
    let beds = req.body.beds;
    let questionmark;
    let sql = `
        SELECT *
        FROM properties
        WHERE search LIKE '%${search}%'
        AND type = ${type}
        AND price > ${price}
    `;
        if (beds !== "any beds") {
            let size = beds.size()
            questionmark = {search, type, price}
            
            for (var i = 0; i < size; i++) {
                sql.append(`
                    AND beds = ${beds[i]}
                `)
            }
        }
    
    // run the sql query on db
    db.get(sql, (err, row) => {
        if (err) {
            res.json({success: false})
            res.end()
        }
        else if (!row) {
            res.json({success: false})
            res.end()
        }
        else {
            // res.json({{success:true},house:...})
            next();
        }
    })
}


// =========== other functions =========== //



app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})


// db.close();