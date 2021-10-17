// dependencies
const { EDESTADDRREQ } = require('constants');
const express = require('express');
const path = require('path');
const { send, nextTick } = require('process'); // delete if necessary
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { json } = require('express');
const multer = require('multer'); //to upload image

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/listings')
    },
    filename: (req, file, cb) => {
        var name = Date.now() + path.extname(file.originalname)
        cb(null, name)

        req.middlewareStorage = {
            fileimage : name
        }
    }
})
const upload = multer({storage: storage})

const { getListings, addListing, editListing, addListingImage, deleteAllImages } = require('./server/listings');
const { searchListings, getListingDetails } = require('./server/search');
const { getFacilities, addFacility, deleteFacilitiesFromListing, addFacilities } = require('./server/facilities');
const { createBookmark, deleteBookmark, getBookmarks } = require('./server/bookmark.js');
const { getAllComments, addComment, replyComment } = require('./server/comment');


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

// admin page
app.get('/admin',(req,res)=>{
    if (req.session.alcohol == "yamazaki")
        res.render(path.resolve(__dirname,'./public/admin'))
})

// home page
app.get('/',(req,res)=>{
    if (req.session.userid)
        res.render(path.resolve(__dirname,'./public/index'), {pageName: 'home', loggedIn: true})
    else
        res.render(path.resolve(__dirname,'./public/index'), {pageName: 'home'})
})

// about page
app.get('/about',(req,res)=>{
    if (req.session.userid)
        res.render(path.resolve(__dirname,'./public/about'), {pageName: 'about', loggedIn: true})
    else
        res.render(path.resolve(__dirname,'./public/about'), {pageName: 'about'})
})

// contact page
app.get('/contact',(req,res)=>{
    if (req.session.userid)
        res.render(path.resolve(__dirname,'./public/contact'), {pageName: 'contact', loggedIn: true})
    else
        res.render(path.resolve(__dirname,'./public/contact'), {pageName: 'contact'})
})

// route to login page
app.get('/login',(req,res)=>{
    if (req.session.userid)
        res.render(path.resolve(__dirname,'./public/login'), {pageName: 'login', loggedIn: true})
    else
        res.render(path.resolve(__dirname,'./public/login'), {pageName: 'login'})
})

// post login request
app.post('/login', authLogin, createSession, (req,res)=>{
    res.render(path.resolve(__dirname,'./public/buyer/profile'), {pageName: 'profile', loggedIn: true})
});

// route to seller login page
app.get('/seller/login',(req,res)=>{
    res.render(path.resolve(__dirname,'./public/seller/seller_login'))
})

// post seller login request
app.post('/seller/login', checkAuthAdminLogin, authSellerLogin, createSellerSession, (req,res)=>{
    res.render(path.resolve(__dirname,'./public/seller/seller_home'), {'pageName': 'home'})
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
    if (req.session.userid)
        res.render(path.resolve(__dirname,'./public/buyer/edit_profile'), {pageName:'profile', loggedIn: true})
    else
        res.render(path.resolve(__dirname,'./public/buyer/edit_profile'), {pageName:'profile'})
})

// post request for profile page
app.post('/profile/edit',checkSession, editProfile, (req,res)=>{
    res.render(path.resolve(__dirname,'./public/buyer/edit_profile'), {pageName: 'profile'})
})

// route to seller registration page
app.get('/seller/register',(req,res)=>{
    res.render(path.resolve(__dirname,'./public/seller/seller_registration'))
})

// post register page
app.post('/seller/register/confirmation',registerSeller,(req,res)=>{
    res.send(`<h1>Registration Success!</h1> 
    <h1>Please <a href="/seller/login">login</a></h1>`);
})

// profile page
app.get('/profile',checkSession,(req,res)=>{
    res.render(path.resolve(__dirname,'./public/buyer/profile'), {pageName: 'profile', loggedIn: true})
})

// bookmarks page
app.get('/bookmarks',checkSession,(req,res)=>{
    getBookmarks(req.session.userid, function(data) {
        res.render(path.resolve(__dirname,'./public/bookmarks'), {data, pageName: 'bookmarks', loggedIn: true})
    })
})

// listing details page
app.get('/listing/:id', (req,res)=>{
    getListingDetails(req.params.id, function(data) {
        // res.send(data);
        res.render(path.resolve(__dirname,'./public/listing_details'), {data, 'pageName': 'home', loggedIn: true})
    })
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

app.post('/seller/listings', checkSellerSession, upload.single('image'), async (req, res) => {
    var fileimage = req.middlewareStorage.fileimage;
    addListing(req.session.sellerid, fileimage, req, async function(data) {
        getFacilities(function(facilities) {
            res.render(path.resolve(__dirname,'./public/seller/seller_listings_add'), {'successAlert': data.status, 'facilities': facilities.data, 'pageName': 'listings'})
        })
    })
})

app.get('/seller/listings/add', checkSellerSession, async (req, res) => {
    getFacilities(function(facilities) {
        res.render(path.resolve(__dirname,'./public/seller/seller_listings_add'), {'facilities': facilities.data, 'pageName': 'listings'});
    })
})

// edit facility form post request

app.post('/seller/listings/edit/:id/edit_facility', checkSellerSession, async(req,res) => {
    deleteFacilitiesFromListing(req.params.id, async function() {
        addFacilities(req.params.id, req.body.facilities, async function() {
            getListingDetails(req.params.id, async function(data) {
                getFacilities(function(facilities) {
                    res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'listings'});
                })
            })
        })
        
    })
})

// add facility form post request
app.post('/seller/listings/edit/:id/add_facility', checkSellerSession, async(req,res) => {
    addFacility(req.body.new_facility, async function() {
        // if (data.status == false) res.send('failed... press back and try again');
        // else {
            getListingDetails(req.params.id, async function(data) {
                getFacilities(function(facilities) {
                    res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'listings'});
                    // res.send({data, 'facilities': facilities.data, 'pageName': 'listings'})
                })
            })
        // }
    })
})

// edit image form post request
app.post('/seller/listings/edit/:id/add_image', checkSellerSession, checkSellerListing, upload.single('image'), async (req,res) => {
    try {
        var fileimage = req.middlewareStorage.fileimage;
        addListingImage(req.params.id, fileimage, req, async function() {
            getListingDetails(req.params.id, async function(data) {
                getFacilities(async function(facilities) {
                    res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'listings'});
                })
            })
        })
    }
    catch {
        getListingDetails(req.params.id, async function(data) {
            getFacilities(async function(facilities) {
                res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'listings'});
            })
        })
    }
})

// delete all images form post request
app.post('/seller/listings/edit/:id/delete_all_images', checkSellerSession, checkSellerListing, (req,res) => {
    deleteAllImages(req.params.id, async function() {
        getListingDetails(req.params.id, async function(data) {
            getFacilities(async function(facilities) {
                res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'listings'});
            })
        })
    }) 
})

//route to edit listings page
app.get('/seller/listings/edit/:id*',checkSellerSession, checkSellerListing, async (req, res) => {
    getListingDetails(req.params.id, async function(data) {
        getFacilities(async function(facilities) {
            res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'listings'});
            
            // res.send({data, 'facilities': facilities.data, 'pageName': 'listings'});
        })
    })
})

// edit listing form post request
app.post('/seller/listings/edit/:id', checkSellerSession, checkSellerListing, async (req, res) => {
    editListing(req.session.sellerid, req, async function(data) {
        getListingDetails(req.params.id, async function(data) {
            getFacilities(async function(facilities) {
                res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'listings'});
            })
        })
    })
})


// =========== Search =========== //

// search router
app.get('/search',(req,res)=>{
    if (req.session.userid)
        res.render(path.resolve(__dirname,'./public/search'), {'pageName':'home',loggedIn:true})
    else
    res.render(path.resolve(__dirname,'./public/search'), {'pageName':'home'})
})

// search post request
app.post('/search',(req,res)=>{
    let search = req.body.search;
    let sale_or_rent = req.body.sale_or_rent;
    let property_type = req.body.property_type;
    let price_lower_bound = req.body.price_lower_bound;
    let price_upper_bound = req.body.price_upper_bound;
    
    let room_rental = req.body.room_rental;
    let studio = req.body.studio;
    let _1room = req.body._1room;
    let _2room = req.body._2room;
    let _3room = req.body._3room;
    let _4room = req.body._4room;
    let _5room = req.body._5room;

    searchListings([search, sale_or_rent, property_type, price_lower_bound, price_upper_bound, room_rental, studio, _1room, _2room, _3room, _4room, _5room], req.session.userid, function(data) {
        if (req.session.userid)
            res.render(path.resolve(__dirname,'./public/search'), {data, 'pageName': 'home', loggedIn:true})
        else
            res.render(path.resolve(__dirname,'./public/search'), {data, 'pageName': 'home'})
        // res.send(data);
    })
})

app.get('/logout',(req,res)=>{
    req.session.destroy(function(err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(`<h1>You have logged out.<br><a href="/">home</h1>`)
        }
    })
})




// =========== APIs =========== //

// check if user is logged in
app.get('/api/user/checkLogin', (req,res) => {
    if (req.session.userid)
        res.json({success: true});
    else
        res.json({success: false});
})

// get profile details
app.get('/api/user', checkSession, getProfileDetails,(req,res)=>{
    res.json({success:true, userid:req.session.userid, email:res.email, name:res.name, password:res.password, display_picture: res.display_picture});
})

// get seller details
app.get('/api/seller', checkSellerSession, getSellerDetails, (req,res)=>{
    
})

// create bookmark
app.get('/api/bookmark/create/:listing_id', checkSession, (req,res) => {
    createBookmark(req.session.userid, req.params.listing_id, async function(data) {
        res.json({"success":true});
    })
})

app.get('/api/bookmark/delete/:listing_id', checkSession, (req,res) => {
    deleteBookmark(req.session.userid, req.params.listing_id, async function(data) {
        res.json({"success":true});
    })
})

//get all comment by id
app.get('/api/comment/:listing_id',(req,res)=>{
    getAllComments(req.params.listing_id, async function(data) {
        res.json(data)
    })
})

//post a comment or reply a comment
app.post('/api/comment', (req, res) => {
    let listing_id = req.body.listing_id
    let comments = req.body.comments
    let user_id = req.session.userid
    let reply_id = req.body.reply_id
    if(reply_id !== undefined) {
        replyComment(listing_id, reply_id, comments, user_id, function(data){
            res.send(data)
        })
    } else {
        addComment(listing_id, comments, user_id, function(data){
            res.send(data)
        })
    }
})



// get search details
app.post('/api/search', (req,res)=>{
    let search = req.body.search;
    let sale_or_rent = req.body.sale_or_rent;
    let property_type = req.body.property_type;
    let price_lower_bound = req.body.price_lower_bound;
    let price_upper_bound = req.body.price_upper_bound;

    console.log(`search: ` + search);
    console.log(`sale_or_rent: ` + sale_or_rent);
    console.log(`property type: ` + property_type);
    console.log(`price: ` + price_lower_bound + ` up to ` + price_upper_bound);
    searchListings([search, sale_or_rent, property_type, price_lower_bound, price_upper_bound], function(data) {
        res.send(data)
    })
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
        res.send('error: session not created...');
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
        res.send(`
            <h1>WARNING: YOU ARE NOT LOGGED IN.</h1>
            <h1><a href="/login">Login</a></h1>
        `)
    }
}

function checkSellerSession(req,res,next) {
    if (req.session.sellerid) {
        // session is active
        next()
    } else {
        // session is not active
        res.send(`
            <h1>WARNING: YOU ARE NOT LOGGED IN AS A SELLER.</h1>
            <h1><a href="/seller/login">Login</a></h1>
        `)
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
            res.end();
        }
        else if (!row[0] || password != row[0].password) {
            res.send(`wrong email or password. <a href="/login">try again</a>`)
            res.end();
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
            res.send('<h1>login failed. <a href="/seller/login">try again</a></h1>')
        }
        else if (!row || !row[0] || password != row[0].password) {
            res.send('<h1>wrong username or password. <a href="/seller/login">try again</a></h1>')
        }
        else {
            res.sellerid = row[0].seller_id;
            next();
        }
    })
}

function checkAuthAdminLogin(req, res, next) {
    if (req.body.username == "alcohol" && req.body.password == "alcohol") { // process admin login
        req.session.alcohol = "yamazaki";
        console.log("got here admin")
        res.send("<h1>welcome back admin</h1><h1><a href='/admin'>proceed</a></h1>");
    }
    else 
        next();
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
            console.log("asdasd", row[0].display_picture);
            res.email = row[0].email;
            res.name = row[0].name;
            res.password = row[0].password;
            res.display_picture = row[0].display_picture;
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

function checkSellerListing(req,res,next) {
    let sellerid = req.session.sellerid;
    let listingid = req.params.listingid;

    let sql = `
        SELECT COUNT(*)
        FROM listings
        WHERE seller_id = ?
        AND listing_id = ?
    `

    // run the sql query on db
    db.query(sql, [sellerid, listingid], (err, row) => {
        if (err || !row) {
            // return false
            res.send(`<h1>error: this listing does not belong to you... please <a href="/seller/login">login</a>.</h1>`);
            res.end();
        }
        else {
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