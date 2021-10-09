const db = require('./connection')

const getListingDetails = (id, res) => {
    let sql = `
    SELECT l.*, s.name, s.contact_number, af.facility_id, af.facility_name
    FROM seller s, listings l
    LEFT JOIN (
        SELECT lf.listing_id, f.* 
        FROM facilities f, listing_facilities lf 
        WHERE f.facility_id = lf.facility_id
    ) AS af
    ON af.listing_id = l.listing_id
    WHERE l.seller_id = s.seller_id
    AND l.listing_id = ?;
    `
    db.query(sql, id, (err, row) => {
        if (err) {
            res({success:false, msg:err});
        }
        else {
            //number of rows depending on the number of facilities, hence need to do a loop to seperate it
            var listing = {};
            const facilities = []
            row.forEach(element => {
                facilities.push({"facility_id": element.facility_id, 
                                "facility_name": element.facility_name});
                delete element.facility_id;
                delete element.facility_name;
                if(Object.keys(listing).length === 0) {
                    listing = element;
                }
            });
            // console.log(listing)
            listing["facilities"] = facilities;
            res({success:true, data: [listing], msg:'listings details retrieved'});
        }
    })
}

const searchListings = ([search, sale_or_rent, property_type, price_lower_bound, price_upper_bound, room_rental, studio, _1room, _2room, _3room, _4room, _5room], userid, res) => {
    let sql;
    let question_mark;
    let and_inputted = false;

    if (property_type != "hdb" && property_type != "condo" && property_type != "landed") {
        property_type = "";
    }
    if (price_lower_bound < 0) {
        price_lower_bound = 0;
    }
    if (price_upper_bound < 0 || price_upper_bound <= price_lower_bound) {
        price_upper_bound = price_lower_bound + 100000000;
    }

    if (userid) { // get bookmarks too
        sql = `
            SELECT l.*, b.user_id
            FROM listings l
            LEFT JOIN bookmarks b ON l.listing_id = b.listing_id AND b.user_id = ?
            WHERE (l.listing_address LIKE "%"?"%" OR l.title LIKE "%"?"%")
            AND l.sale_or_rent = ?
            AND l.property_type LIKE "%"?"%"
            AND l.pricing >= ? AND pricing <= ?
        `
        question_mark = [userid, search, search, sale_or_rent, property_type, price_lower_bound, price_upper_bound];
    }
    else {
        sql = `
            SELECT *
            FROM listings l
            WHERE (l.listing_address LIKE "%"?"%" OR l.title LIKE "%"?"%")
            AND l.sale_or_rent = ?
            AND l.property_type LIKE "%"?"%"
            AND l.pricing >= ? AND l.pricing <= ?
        `
        question_mark = [search, search, sale_or_rent, property_type, price_lower_bound, price_upper_bound];
    }
    if (room_rental) {
        if (and_inputted) {
            sql += `
                OR l.rooms LIKE 'Room Rental'
            `
        }
        else {
            sql += `
                AND l.rooms LIKE 'Room Rental'
            `
            and_inputted = true;
        }
    }

    if (studio) {
        if (and_inputted) {
            sql += `
                OR l.rooms LIKE 'studio'
            `
        }
        else {
            sql += `
                AND l.rooms LIKE 'studio'
            `
            and_inputted = true;
        }
    }

    if (_1room) {
        if (and_inputted) {
            sql += `
                OR l.rooms LIKE '1'
            `
        }
        else {
            sql += `
                AND l.rooms LIKE '1'
            `
            and_inputted = true;
        }
    }

    if (_2room) {
        if (and_inputted) {
            sql += `
                OR l.rooms LIKE '2'
            `
        }
        else {
            sql += `
                AND l.rooms LIKE '2'
            `
            and_inputted = true;
        }
    }

    if (_3room) {
        if (and_inputted) {
            sql += `
                OR l.rooms LIKE '3'
            `
        }
        else {
            sql += `
                AND l.rooms LIKE '3'
            `
            and_inputted = true;
        }
    }

    if (_4room) {
        if (and_inputted) {
            sql += `
                OR l.rooms LIKE '4'
            `
        }
        else {
            sql += `
                AND l.rooms LIKE '4'
            `
            and_inputted = true;
        }
    }

    if (_5room) {
        if (and_inputted) {
            sql += `
                OR l.rooms LIKE '5'
            `
        }
        else {
            sql += `
                AND l.rooms LIKE '5'
            `
            and_inputted = true;
        }
    }

    sql += `
        ORDER BY l.listing_datetime DESC;
    `
    
       
    
    
    
    
    // run the sql query on db
    db.query(sql, question_mark, (err, row) => {
        if (err) {
            res({success:false, msg:err});
        }
        else {
            res({success:true, data:row, msg:'list of listings'});
        }
    })
}

module.exports = {
    searchListings,
    getListingDetails
}