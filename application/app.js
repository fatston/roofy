// dependencies
const { EDESTADDRREQ } = require('constants');
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

// route to edit profile page
app.get('/profile/edit/:id',checkSession,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/edit_profile.html'))
})

// search home
app.get('/search',searchProperties,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/search.html'))
})

// search query
app.get('/search/:a/:b',searchProperties,(req,res)=>{
    let a = req.params.a;
    let b = req.params.b;
    res.send(`denny and me draw ${a}, ${b}`)
    res.end()
})

// search query
app.get('/search/:a/:b/:c/:d/:e/:f',searchProperties,(req,res)=>{
    console.log(a);
    res.send('denny is loser')
    res.end()
})

// =========== Paths that need checkSession =========== //

// profile page
app.get('/profile',(req,res)=>{
    console.log(req.params.name);
    res.sendFile(path.resolve(__dirname,'./public/profile.html'))
})


// =========== APIs =========== //

// get profile details
app.get('/api/user/:id', checkSession, getProfileDetails,(req,res)=>{
    let id = req.params.id;
    res.json({success:true, userid:id, email:res.email, name:res.name});
})

// get search details
app.get('/api/search', searchProperties, (req,res)=>{
    
})

// check session
app.get('/api/checkSession', checkSession, (req,res)=>{
    res.json({success:true, userid:1});
})


// =========== losted area =========== //

// hacker page
app.get('/hackerman',(req,res)=>{
    res.send('<h1>Hacking is illegal!</h1><p><a href="/">go back</a></p>')
})

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
            res.send('login failed. <a href="login">try again</a>')
        }
        else if (!row || password != row.password) {
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
        INSERT INTO user(email,password,name) VALUES (
            ?,?,?
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

function getProfileDetails(req,res,next) {
    let userid = req.params.id;
    console.log(`userid: ${userid}`);

    let sql = `
        SELECT *
        FROM user
        WHERE userid = ?;
    `;
    // run the sql query on db
    db.get(sql, [userid], (err, row) => {
        if (err || !row) {
            // return false
            console.log(1)
            res.json({success:false})
        }
        else {
            res.email = row.email;
            res.name = row.name;
            next();
        }
    })
}


function searchProperties(req,res,next) {
    // console.log(req)
    let buyer = false;
    if (req.body.buy === true) {
        buyer = true;
    }
    let search = req.query.searchString;
    let type = req.body.residential;
    let price = req.body.price;
    let beds = req.body.beds;
    let sql = `
        SELECT *
        FROM properties
        WHERE search LIKE '%?%'
        AND type = ?
        AND price > ?`;
        
            
    let questionmark = {search, type, price, beds}

    let size = 2;

    for (let i = 0; i < size; i++) {
        if (i == 0) {
            sql = sql.concat(`
        AND (`)
        }
        else {
            sql = sql.concat(`OR`)
        }
        sql = sql.concat(` beds = ? `)
    }
    sql = sql.concat(')')
    
    console.log(sql);
    console.log(search)
    
    // // run the sql query on db
    // db.get(sql, questionmark, (err, row) => {
    //     if (err) {
    //         res.json({success: false})
    //         res.end()
    //     }
    //     else if (!row) {
    //         res.json({success: false})
    //         res.end()
    //     }
    //     else {
    //         // res.json({{success:true},house:...})
    //         next();
    //     }
    // })
    next();
}


// =========== other functions =========== //



app.listen(5000,()=>{
    console.log('server is listening on port 5000')
})


// db.close();