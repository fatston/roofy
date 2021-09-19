const db = require('./connection')


const getListings = (id, res) => {
    let sql = `
        SELECT *
        FROM listings
        WHERE user_id = ? ORDER BY listing_date DESC;
    `;
    db.query(sql, id, (err, row) => {
        if(err) {
            res({status: false, data: [], msg: 'not found'})
        } else {
            res({status: true, data: row, msg: 'list of listings'})
        }
    })
}

const addListing = (id, req, res) => {
    let user_id = id;
    let listing_address = req.body.listing_address;
    let listing_pc = req.body.listing_pc;
    let listing_date = new Date();
    let sale_or_rent = req.body.sale_or_rent;
    let description = req.body.description;
    let image = "";
    let property_type = req.body.property_type;
    let floor_level = req.body.floor_level;
    let floor_size = req.body.floor_size;
    let rooms = req.body.rooms;
    let pricing = req.body.pricing;
    let p_negotiable = req.body.p_negotiable;
    let furnishings = req.body.furnishings;
    let facilities_and_amenities = req.body.facilities_and_amenities;
    let availability = req.body.availability;
    let lease_term = req.body.lease_term;
    let price_psf = pricing/floor_size;
    let tenure = req.body.tenure;
    let facilities = req.body.facilities;

    let listingsql = `
        INSERT INTO listings(user_id, listing_address, listing_pc, listing_date, sale_or_rent, description, image, property_type, floor_level, floor_size, rooms, pricing, p_negotiable, furnishings, facilities_and_amenities, availability, lease_term, price_psf, tenure) 
        VALUES (
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
        );`;

    let listingfacilitiessql = `
        INSERT INTO listing_facilities (listing_id, facility_id) VALUES ?
        ;`;
    
    db.query(listingsql, [user_id,listing_address, listing_pc, listing_date, sale_or_rent, description, image, property_type, floor_level, floor_size, rooms, pricing, p_negotiable, furnishings, facilities_and_amenities, availability, lease_term, price_psf, tenure],(err, result, fields)=>{
        if (err) {
            res({status: false, data: [], msg: err.message})
        } else {
            if (result.insertId) {
                var values = []
                for(const facility of facilities) {
                    values.push([result.insertId, facility])
                }
                db.query(listingfacilitiessql, [values], function(err){
                    if (err) {
                        res({status: false, data: [], msg: err.message})
                    } else {
                        res({status: true, data: [], msg: 'Added new listing'})
                    }
                })
            }
            
        }
    })
}

module.exports = {
    getListings,
    addListing
}



