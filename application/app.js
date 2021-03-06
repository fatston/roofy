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

const { getListings, addListing, editListing, addListingImage, deleteAllImages, deleteListing, updateListingStatus } = require('./server/listings');
const { searchListings, getListingDetails, getHomeListings } = require('./server/search');
const { getFacilities, addFacility, deleteFacilitiesFromListing, addFacilities } = require('./server/facilities');
const { createBookmark, deleteBookmark, getBookmarks } = require('./server/bookmark.js');
const { getListingStats, getUserStats, getViewStats, getViewStatsMonth } = require('./server/admin');
const { getAllComments, addComment, replyComment, addCommentSeller, replyCommentSeller } = require('./server/comment');
const { addUserView, addSellerView } = require('./server/views');


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
    if (!req.session.alcohol || req.session.alcohol != "yamazaki") {
        res.send('<h1>You are not the admin. <a href="/seller/login">login as admin</a></h1>')
    }
    else {
        getListingStats(function(listingData) {
            getUserStats(function(userData) {
                getViewStats(function(viewsData) {
                    res.render(path.resolve(__dirname,'./public/admin/admin'), {listingData, userData, viewsData})
                    // res.send({listingData, userData, viewsData})
                })
            })
        })
    }
})

// admin views page
app.get('/admin/views',(req,res)=>{
    if (!req.session.alcohol || req.session.alcohol != "yamazaki") {
        res.send('<h1>You are not the admin. <a href="/seller/login">login as admin</a></h1>')
    }
    else {
        getViewStatsMonth(req, function(viewsData) {
            let d = new Date()
            let month_year = {month: (d.getMonth()+1).toString(), year: d.getFullYear().toString()}
            res.render(path.resolve(__dirname,'./public/admin/views'), {viewsData, month_year})
            // res.send({viewsData, month_year})
        })
    }
})

// admin views page (month)
app.get('/admin/views/month/:month/:year',(req,res)=>{
    if (!req.session.alcohol || req.session.alcohol != "yamazaki") {
        res.send('<h1>You are not the admin. <a href="/seller/login">login as admin</a></h1>')
    }
    else {
        getViewStatsMonth(req, function(viewsData) {
            let month_year = {month: req.params.month, year: req.params.year}
            res.render(path.resolve(__dirname,'./public/admin/views'), {viewsData, month_year})
            // res.send({viewsData, month_year})
        })
    }
})

// admin listings page
app.get('/admin/listings',(req,res)=>{
    if (!req.session.alcohol || req.session.alcohol != "yamazaki") {
        res.send('<h1>You are not the admin. <a href="/seller/login">login as admin</a></h1>')
    }
    else {
        getListingStats(function(listingData) {
                    res.render(path.resolve(__dirname,'./public/admin/listings'), {listingData})
                    // res.send({listingData, userData, viewsData})
        })
    }
})

// admin page
app.get('/admin/users',(req,res)=>{
    if (!req.session.alcohol || req.session.alcohol != "yamazaki") {
        res.send('<h1>You are not the admin. <a href="/seller/login">login as admin</a></h1>')
    }
    else {
        getUserStats(function(userData) {
            res.render(path.resolve(__dirname,'./public/admin/users'), {userData})
            // res.send({listingData, userData, viewsData})
        })
    }
})

// home page
app.get('/',(req,res)=>{
    getHomeListings(req, function(data) {
        if (req.session.userid)
            res.render(path.resolve(__dirname,'./public/index'), {data, pageName: 'home', loggedIn: true})
        else
            res.render(path.resolve(__dirname,'./public/index'), {data, pageName: 'home'})
    })
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
    res.redirect('/seller');
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
    if (req.session.userid)
    res.render(path.resolve(__dirname,'./public/buyer/edit_profile'), {pageName:'profile', loggedIn: true})
else
    res.render(path.resolve(__dirname,'./public/buyer/edit_profile'), {pageName:'profile'})
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
        addUserView(req.session.userid, req.params.id, function(status) {})
        if (req.session.userid || req.session.sellerid) {
            res.render(path.resolve(__dirname,'./public/listing_details'), {data, 'pageName': 'home', loggedIn: true})
        } else {
            res.render(path.resolve(__dirname,'./public/listing_details'), {data, 'pageName': 'home', loggedIn: false})
        }
        
    })
})

// =========== seller routes =========== //

// route to seller home page
app.get('/seller',checkSellerSession, (req,res)=>{
    res.redirect('/seller/listings');
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

// post request for seller to create listings seller listings page
app.post('/seller/listings', checkSellerSession, upload.single('image'), async (req, res) => {
    var fileimage = req.middlewareStorage.fileimage;
    addListing(req.session.sellerid, fileimage, req, async function(data) {
        getFacilities(function(facilities) {
            res.render(path.resolve(__dirname,'./public/seller/seller_listings_add'), {'successAlert': data.status, 'facilities': facilities.data, 'pageName': 'home'})
        })
    })
})

app.get('/seller/listings/add', checkSellerSession, async (req, res) => {
    getFacilities(function(facilities) {
        res.render(path.resolve(__dirname,'./public/seller/seller_listings_add'), {'facilities': facilities.data, 'pageName': 'home'});
    })
})

// listing details page
app.get('/seller/listing/:id', checkSellerSession, async (req,res)=>{
    getListingDetails(req.params.id, function(data) {
        // res.send(data);
        addSellerView(req.session.sellerid, req.params.id, function(status) {})
        res.render(path.resolve(__dirname,'./public/seller/seller_listing_details'), {data, 'pageName': 'listings', loggedIn: true})
    })
})

// edit facility form post request

app.post('/seller/listings/edit/:listingid/edit_facility', checkSellerSession, checkSellerListing, async(req,res) => {
    deleteFacilitiesFromListing(req.params.listingid, async function() {
        addFacilities(req.params.listingid, req.body.facilities, async function() {
            getListingDetails(req.params.listingid, async function(data) {
                getFacilities(function(facilities) {
                    res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'home'});
                })
            })
        })
        
    })
})

// add facility form post request
app.post('/seller/listings/edit/:listingid/add_facility', checkSellerSession, checkSellerListing, async(req,res) => {
    addFacility(req.body.new_facility, async function() {
        // if (data.status == false) res.send('failed... press back and try again');
        // else {
            getListingDetails(req.params.listingid, async function(data) {
                getFacilities(function(facilities) {
                    res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'home'});
                    // res.send({data, 'facilities': facilities.data, 'pageName': 'home'})
                })
            })
        // }
    })
})

// edit image form post request
app.post('/seller/listings/edit/:listingid/add_image', checkSellerSession, checkSellerListing, upload.single('image'), async (req,res) => {
    try {
        var fileimage = req.middlewareStorage.fileimage;
        addListingImage(req.params.listingid, fileimage, req, async function() {
            getListingDetails(req.params.listingid, async function(data) {
                getFacilities(async function(facilities) {
                    res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'home'});
                })
            })
        })
    }
    catch {
        getListingDetails(req.params.id, async function(data) {
            getFacilities(async function(facilities) {
                res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'home'});
            })
        })
    }
})

// delete all images form post request
app.post('/seller/listings/edit/:listingid/delete_all_images', checkSellerSession, checkSellerListing, (req,res) => {
    deleteAllImages(req.params.listingid, async function() {
        getListingDetails(req.params.listingid, async function(data) {
            getFacilities(async function(facilities) {
                res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'home'});
            })
        })
    }) 
})

// edit listing form post request
app.post('/seller/listings/edit/:listingid', checkSellerSession, checkSellerListing, async (req, res) => {
    
    editListing(req, async function(data) {
        getListingDetails(req.params.listingid, async function(data) {
            getFacilities(async function(facilities) {
                res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'home'});
            })
        })
    })
})

//route to edit listings page
app.get('/seller/listings/edit/:listingid*',checkSellerSession, checkSellerListing, async (req, res) => {
    getListingDetails(req.params.listingid, async function(data) {
        getFacilities(async function(facilities) {
            res.render(path.resolve(__dirname,'./public/seller/edit_listing'), {data, 'facilities': facilities.data, 'pageName': 'home'});
            
            // res.send({data, 'facilities': facilities.data, 'pageName': 'home'});
        })
    })
})

// post delete listing page
app.post('/seller/listings/delete/:listingid', checkSellerSession, checkSellerListing, async (req,res) => {
    deleteListing(req.params.listingid, async function(data) {
        res.send(`
            listing has been deleted.<br>
            <a href='/seller'>continue</a>
        `)
    })
})



// =========== Search =========== //

// search router
app.get('/search',(req,res)=>{
    let searchJSON = {'search':'', 'sale_or_rent':'SALE',property_type:'',price_lower_bound:'',price_upper_bound:'',room_rental:''}
    if (req.session.userid)
        res.render(path.resolve(__dirname,'./public/search'), {'pageName':'home',loggedIn:true, 'searchQuery':searchJSON})
    else
        res.render(path.resolve(__dirname,'./public/search'), {'pageName':'home', 'searchQuery':searchJSON})
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

    let searchObject = [search, sale_or_rent, property_type, price_lower_bound, price_upper_bound, room_rental, studio, _1room, _2room, _3room, _4room, _5room];
    let searchJSON = {'search':search, 'sale_or_rent':sale_or_rent,property_type:property_type,price_lower_bound:price_lower_bound,price_upper_bound:price_upper_bound,room_rental:room_rental,studio:studio,_1room:_1room, _2room:_2room, _3room:_3room, _4room:_4room, _5room:_5room}

    searchListings(searchObject, req.session.userid, function(data) {
        if (req.session.userid)
            res.render(path.resolve(__dirname,'./public/search'), {'searchQuery': searchJSON, data, 'pageName': 'home', loggedIn:true})
        else
            res.render(path.resolve(__dirname,'./public/search'), {'searchQuery': searchJSON, data, 'pageName': 'home'})
            // res.send({data, 'searchQuery': searchJSON});
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

// check if seller is logged in
app.get('/api/seller/checkLogin', (req, res) => {
    if (req.session.sellerid)
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
    res.json({success: true, sellerid: req.session.sellerid, username: res.username, password: res.password, name: res.name, company: res.company, email: res.email, contact : res.contact, display_picture: res.display_picture})

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
    let sellerid = req.session.sellerid
    let reply_id = req.body.reply_id
    if(reply_id !== undefined) {
        if(sellerid !== undefined) {
            replyCommentSeller(listing_id, reply_id, comments, sellerid, function(data){
                res.send(data)
            })
        } else {
            replyComment(listing_id, reply_id, comments, user_id, function(data){
                res.send(data)
            })
        }
        
    } else {
        if(sellerid !== undefined) {
            addCommentSeller(listing_id, comments, sellerid, function(data){
                res.send(data)
            })
        } else {
            addComment(listing_id, comments, user_id, function(data){
                res.send(data)
            })
        }
    }
})

//api update listing status
app.post('/api/listing/status', checkSellerSession, (req, res) => {
    let listing_id = req.body.listing_id
    let status = req.body.status
    updateListingStatus(listing_id, status, function(data){
        res.send(data)
    })
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
            // console.log("asdasd", row[0].display_picture);
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
            res.username = row[0].username
            res.password = row[0].password
            res.name = row[0].name
            res.company = row[0].company
            res.email = row[0].email
            res.contact = row[0].contact_number
            res.display_picture = row[0].display_picture;
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
            if (err.errno == 1062) 
                res.send('Email is already used. <a href="register">try again</a>')
            else
                res.send('something went wrong')
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
            res.send('Username or email or phone number is already used. <a href="/seller/register">try again</a>')
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
            if (err.errno == 1062) {
                res.send("<h1>" + err.sqlMessage + "</h1><h1>Please <a href='/profile/edit'>try again</a></h1>")
            }
            else {
                res.send('Something went wrong...')
            }
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
            if (err.errno == 1062) {
                res.send("<h1>" + err.sqlMessage + "</h1><h1>Please <a href='/seller/profile/edit'>try again</a></h1>")
            }
            else {
                res.send("something went wrong...")
            }
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