const e = require('express');
const db = require('./connection')


const getListings = (id, res) => {
    let sql = `
        SELECT *
        FROM listings
        WHERE seller_id = ? ORDER BY listing_datetime DESC;
    `;
    db.query(sql, id, (err, row) => {
        if(err) {
            res({status: false, data: [], msg: 'not found'})
        } else {
            res({status: true, data: row, msg: 'list of listings'})
        }
    })
}

const addListing = (id, image, req, res) => {
    let user_id = id;
    let title = req.body.title;
    let listing_address = req.body.listing_address;
    let listing_pc = req.body.listing_pc;
    let listing_date = new Date();
    let sale_or_rent = req.body.sale_or_rent;
    let description = req.body.description;
    let property_type = req.body.property_type;
    let floor_level = req.body.floor_level;
    let floor_size = req.body.floor_size;
    let rooms = req.body.rooms;
    let pricing = req.body.pricing;
    let p_negotiable = req.body.p_negotiable;
    let furnishings = req.body.furnishings;
    let availability = req.body.availability == "" ? null : req.body.availability;
    let lease_term = req.body.lease_term;
    let price_psf = pricing/floor_size;
    let tenure = req.body.tenure;
    let facilities = req.body.facilities;

    let listingsql = `
        INSERT INTO listings(seller_id, listing_address, listing_pc, listing_date, sale_or_rent, description, image, property_type, floor_level, floor_size, rooms, pricing, p_negotiable, furnishings, availability, lease_term, price_psf, tenure, title) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;

    let listingfacilitiessql = `
        INSERT INTO listing_facilities (listing_id, facility_id) VALUES ?
        ;`;
    
    db.query(listingsql, [user_id, listing_address, listing_pc, listing_date, sale_or_rent, description, image, property_type, floor_level, floor_size, rooms, pricing, p_negotiable, furnishings, availability, lease_term, price_psf, tenure, title],(err, result, fields)=>{
        if (err) {
            console.log("err", err)
            res({status: false, data: [], msg: err.message})
        } else {
            if (result.insertId && facilities) {
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
            } else {
                res({status: true, data: [], msg: 'Added new listing'})
            }   
        }
    })
}

const editListingImage = (id, image, req, res) => {
    console.log("got here!" + "\n\n\n\n\n\n\n\n")
    let sql = `
        UPDATE listings
        SET image = ?
        WHERE listing_id = ?;
    `

    db.query(sql, [image, id], (err,result,fields) => {
        if (err) {
            console.log("err", err)
            res({status: false, data: [], msg: err.message})
        } else {
            res({status: true, data: [], msg: 'Updated Image'})
        }
    })

}

const editListing = (id, req, res) => {
    let listing_id = req.params.id;
    let sale_or_rent = req.body.sale_or_rent;
    let title = req.body.title;
    let listing_address = req.body.address;
    let listing_pc = req.body.listing_pc;
    let description = req.body.description;
    let property_type = req.body.property_type;
    let floor_level = req.body.floor_level;
    let rooms = req.body.rooms;
    let furnishings = req.body.furnishings;
    let floor_size = req.body.floor_size;
    let tenure = req.body.tenure;
    let pricing = req.body.pricing;
    let availability = req.body.availability;
    let lease_term = req.body.lease_term;

    let listingsql = `
        UPDATE listings 
        SET sale_or_rent = ?, title = ?, listing_address = ?, listing_pc = ?, description = ?, property_type = ?,
        floor_level = ?, rooms = ?, furnishings = ?, floor_size = ?, tenure = ?, pricing = ?,
        availability = ?, lease_term = ?
        WHERE listing_id = ?;
    `;
    let questionMark = [sale_or_rent, title, listing_address, listing_pc, description, property_type, floor_level, rooms, furnishings, floor_size, tenure, pricing, availability, lease_term, listing_id];
    
    db.query(listingsql, questionMark,(err, result)=>{
        if (err) {
            console.log("err", err)
            res({status: false, data: [], msg: err.message})
        } else {
            res({status: true, data: [], msg: 'Added new listing'})
        }
    })
}

module.exports = {
    getListings,
    addListing,
    editListing,
    editListingImage
}



