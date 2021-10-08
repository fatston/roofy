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

const searchListings = ([search, sale_or_rent, property_type, price_lower_bound, price_upper_bound], res) => {
    let sql = `
        SELECT *
        FROM listings
        WHERE (listing_address LIKE "%"?"%" OR title LIKE "%"?"%")
        AND sale_or_rent = ?
        AND property_type LIKE "%"?"%"
        AND pricing >= ? AND pricing <= ?
        ORDER BY listing_datetime DESC;
    `
    if (property_type != "hdb" && property_type != "condo" && property_type != "landed") {
        property_type = "";
    }
    if (price_lower_bound < 0) {
        price_lower_bound = 0;
    }
    if (price_upper_bound < 0 || price_upper_bound <= price_lower_bound) {
        price_upper_bound = price_lower_bound + 100000000;
    }
    // run the sql query on db
    db.query(sql, [search, search, sale_or_rent, property_type, price_lower_bound, price_upper_bound], (err, row) => {
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