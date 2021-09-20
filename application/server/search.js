const db = require('./connection')

const getListingDetails = (id, res) => {
    let sql = `
    SELECT *
    FROM listings
    WHERE listing_id = ?;
    `
    db.query(sql, id, (err, row) => {
        if (err) {
            res({success:false, msg:err});
        }
        else {
            res({success:true, data:row, msg:'listings details retrieved'});
        }
    })
}

const searchListings = ([search, sale_or_rent, property_type, price_lower_bound, price_upper_bound], res) => {
    let sql = `
        SELECT *
        FROM listings
        WHERE listing_address LIKE "%"?"%"
        AND sale_or_rent = ?
        AND property_type LIKE "%"?"%"
        AND pricing >= ? AND pricing <= ?;
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
    db.query(sql, [search, sale_or_rent, property_type, price_lower_bound, price_upper_bound], (err, row) => {
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