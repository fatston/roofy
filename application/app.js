// dependencies
const { EDESTADDRREQ } = require('constants');
const express = require('express');
const path = require('path');
const { send, nextTick } = require('process'); // delete if necessary
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { json } = require('express');
const { getListings, addListing } = require('./server/listings');
const { getFacilities } = require('./server/facilities');


// using dependencies I guess
const app = express();
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use(session({
    secret: "clifton is an awesome programmer",
    resave: false,
    saveUninitialized: true 
}));

// connect to db
app.set('view engine', 'ejs');
const db = require('./server/connection');

// =========== paths =========== //

// home page
app.get('/',(req,res)=>{
    res.render(path.resolve(__dirname,'./public/index'), {pageName: 'home'})
})

// about page
app.get('/about',(req,res)=>{
    res.render(path.resolve(__dirname,'./public/about'), {pageName: 'about'})
})

// contact page
app.get('/contact',(req,res)=>{
    res.render(path.resolve(__dirname,'./public/contact'), {pageName: 'contact'})
})

// route to login page
app.get('/login',(req,res)=>{
    res.render(path.resolve(__dirname,'./public/login'), {pageName: 'login'})
})

// post login request
app.post('/login', authLogin, createSession, (req,res)=>{
    res.render(path.resolve(__dirname,'./public/buyer/profile'))
});

// route to seller login page
app.get('/seller/login',(req,res)=>{
    res.render(path.resolve(__dirname,'./public/seller/seller_login'))
})

// post seller login request
app.post('/seller/login', authSellerLogin, createSellerSession, (req,res)=>{
    res.send('<h1>login success</h1><a href="/seller/">continue</a>')
});

// route to registration page
app.get('/register',(req,res)=>{
    res.render(path.resolve(__dirname,'./public/register'), {pageName: 'register'})
})

// post register page
app.post('/register',registerUser,(req,res)=>{
    res.send(`<h1>Registration Success!</h1> 
    <p>Please <a href="login">login</a></p>`);
})

// route to edit profile page
app.get('/profile/edit',checkSession, (req,res)=>{
    res.render(path.resolve(__dirname,'./public/buyer/edit_profile'))
})

// post request for profile page
app.post('/profile/edit',checkSession, editProfile, (req,res)=>{
    res.render(path.resolve(__dirname,'./public/buyer/edit_profile'))
})

// route to seller registration page
app.get('/seller/register',(req,res)=>{
    res.render(path.resolve(__dirname,'./public/seller/seller_registration'))
})

// post register page
app.post('/seller/register/confirmation',registerSeller,(req,res)=>{
    res.send(`<h1>Registration Success!</h1> 
    <p>Please <a href="/seller/login">login</a></p>`);
})

// =========== seller routes =========== //

// route to seller home page
app.get('/seller',checkSellerSession, (req,res)=>{
    res.render(path.resolve(__dirname,'./public/seller/seller_home'), {'pageName': 'home'})
})

// route to seller profile page
app.get('/seller/profile', checkSellerSession,(req,res)=>{
    res.render(path.resolve(__dirname,'./public/seller/seller_profile'), {'pageName': 'profile'})
})

// route to edit profile page
app.get('/seller/profile/edit',checkSellerSession, (req,res)=>{
    res.render(path.resolve(__dirname,'./public/seller/edit_profile'), {'pageName': 'profile'})
})

// post request for sellerprofile page
app.post('/seller/profile/edit',checkSellerSession, editSellerProfile, (req,res)=>{
    res.render(path.resolve(__dirname,'./public/seller/edit_profile'))
})

//route to seller listings page
app.get('/seller/listings',checkSellerSession, async (req, res) => {
    getListings(req.session.sellerid, function(data) {
        res.render(path.resolve(__dirname,'./public/seller/seller_listings'), {data, 'pageName': 'listings'})
    })
})

app.post('/seller/listings', checkSellerSession, async (req, res) => {
    addListing(req.session.sellerid, req, async function(data) {
        getFacilities(function(facilities) {
            res.render(path.resolve(__dirname,'./public/seller/seller_listings_add'), {'successAlert': data.status, 'facilities': facilities.data})
        })
    })
})

app.get('/seller/listings/add', checkSellerSession, async (req, res) => {
    getFacilities(function(facilities) {
        res.render(path.resolve(__dirname,'./public/seller/seller_listings_add'), {'facilities': facilities.data})
    })
})

// =========== Search =========== //

// search home
app.get('/search',searchProperties,(req,res)=>{
    res.render(path.resolve(__dirname,'./public/search'))
})

// search query
app.get('/search/:a/:b',searchProperties,(req,res)=>{
    
})

app.get('/logout',(req,res)=>{
    req.session.destroy(function(err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(`<p>You have logged out.<br><a href="/">home</a>`)
        }
    })
})


// =========== Paths that need checkSession =========== //

// profile page
app.get('/profile',checkSession,(req,res)=>{
    res.render(path.resolve(__dirname,'./public/buyer/profile'))
})


// =========== APIs =========== //

// get profile details
app.get('/api/user', checkSession, getProfileDetails,(req,res)=>{
    res.json({success:true, userid:req.session.userid, email:res.email, name:res.name, password:res.password});
})

// get seller details
app.get('/api/seller', checkSellerSession, getSellerDetails, (req,res)=>{
    
})

// get search details
app.get('/api/search/:a', searchProperties, (req,res)=>{
    res.json(res.row);
})

// check session
app.get('/api/checkSession', checkSession, (req,res)=> {
    res.json({success:true, userid:req.session.userid});
})

app.get('/api/getuserid',(req,res)=>{
    if (req.session.userid) {
        res.json({userid:req.session.userid});
    }
    else {
        res.json({userid:0, loser:true});
    }
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
    try {
        sess = req.session;
        sess.userid = res.userid;
        // console.log("session userid: " + sess.userid);
    }
    catch {
        // console.log('failure: session not created');
        res.send('session not created...');
        res.end();
    }
    finally {
        next();
    }
    
    
}

function createSellerSession(req, res, next) {
    try {
        sess = req.session;
        sess.sellerid = res.sellerid;
        // console.log("session userid: " + sess.sellerid);
    }
    catch {
        // console.log('failure: session not created');
        res.send('session not created...');
        res.end();
    }
    finally {
        next();
    }
}

function checkSession(req,res,next) {
    // todo create check session function
    if (req.session.userid) {
        // session is active
        next()
    } else {
        // session is not active
        res.json({success: false});
    }
}

function checkSellerSession(req,res,next) {
    if (req.session.sellerid) {
        // session is active
        next()
    } else {
        // session is not active
        res.json({success: false});
    }
}


function createCookie(req, res, next) {
    // todo create session function
    // console.log('session created :)');
    next()
}

// =========== db functions =========== //

// =========== select statements =========== //

function authLogin(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    let sql = `
        SELECT password, user_id
        FROM user
        WHERE email = ?;
    `;
    // run the sql query on db
    db.query(sql, [email], (err, row) => {
        if (err) {
            res.send('login failed. <a href="/login">try again</a>')
        }
        else if (!row || password != row[0].password) {
            res.send(`wrong email or password. <a href="/login">try again</a>`)
        }
        else {
            res.userid = row[0].user_id;
            next();
        }
    })
}

function authSellerLogin(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    let sql = `
        SELECT *
        FROM seller
        WHERE username = ?;
    `;
    // run the sql query on db
    db.query(sql, [username], (err, row) => {
        if (err) {
            res.send('login failed. <a href="/seller/login">try again</a>')
        }
        else if (!row || password != row[0].password) {
            res.send('wrong username or password. <a href="/seller/login">try again</a>')
        }
        else {
            res.sellerid = row[0].seller_id;
            next();
        }
    })
}

function getProfileDetails(req,res,next) {
    let userid = req.session.userid;

    let sql = `
        SELECT *
        FROM user
        WHERE user_id = ?;
    `;
    // run the sql query on db
    db.query(sql, [userid], (err, row) => {
        if (err || !row) {
            // return false
            res.json({success:false})
        }
        else {
            res.email = row[0].email;
            res.name = row[0].name;
            res.password = row[0].password;
            next();
        }
    })
}

function getSellerDetails(req,res,next) {
    let sellerid = req.session.sellerid;

    let sql = `
        SELECT *
        FROM seller
        WHERE seller_id = ?;
    `;
    // run the sql query on db
    db.query(sql, [sellerid], (err, row) => {
        if (err || !row) {
            // return false
            res.json({success:false})
        }
        else {
            let username = row[0].username
            let password = row[0].password
            let name = row[0].name
            let company = row[0].company
            let email = row[0].email
            let contact = row[0].contact_number
            res.json({success: true, sellerid: sellerid, username: username, password: password, name: name, company: company, email: email, contact : contact})
            next();
        }
    })
}

function searchProperties(req,res,next) {
    let search = req.params.a;
    let sql = `
        SELECT *
        FROM listings
        WHERE listing_address LIKE "%"?"%";
    `
    // run the sql query on db
    db.query(sql, [search], (err, row) => {
        if (err) {
            res.json({success:false, problem:err});
        }
        else if (!row[0]) {
            res.json({success:false, err:err, row:row});
        }
        else {
            res.row = row;
            next();
        }
    })
}

// =========== insert statements =========== //

function registerUser(req,res,next) {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;

    let sql = `
        INSERT INTO user(email,password,name) VALUES (
            ?,?,?
        );
    `;

    db.query(sql, [email,password,name],(err)=>{
        if (err) {
            res.send('Email is already used. <a href="register">try again</a>')
            res.end();
        } else {
            next()
        }
    })
}

function registerSeller(req,res,next) {
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let company = req.body.company;
    let contact = req.body.contact;
    let email = req.body.email;

    let sql = `
        INSERT INTO seller(username, password, name, company, contact_number, email) VALUES (
            ?,?,?,?,?,?
        );
    `;

    db.query(sql, [username,password,name,company,contact,email],(err)=>{
        if (err) {
            res.send(err)
            res.end();
        } else {
            next()
        }
    })
}


// =========== update statements =========== //

function editProfile(req,res,next) {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let userid = req.session.userid;

    let sql = `
        UPDATE user 
        SET email = ?, password = ?, name = ?
        WHERE user_id = ?;
    `;

    db.query(sql, [email,password,name,userid],(err)=>{
        if (err) {
            res.send('Something went wrong...')
            res.end();
        } else {
            next()
        }
    })
}

function editSellerProfile(req,res,next) {
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let company = req.body.company;
    let contact = req.body.contact;
    let email = req.body.email;
    let sellerid = req.session.sellerid;

    let sql = `
        UPDATE seller 
        SET username=?,password=?,name=?,company=?,contact_number=?,email=?
        WHERE seller_id = ?;
    `;

    db.query(sql, [username, password, name, company, contact, email, sellerid],(err)=>{
        if (err) {
            res.send(err)
            console.log(err);
            res.end();
        } else {
            next()
        }
    })
}







// =========== other functions =========== //



app.listen(80,()=>{
    console.log('server is listening')
})


// db.close();