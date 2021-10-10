const db = require('./connection')


const getFacilities = (res) => {
    let sql = `
        SELECT *
        FROM facilities ORDER BY facility_id;
    `;
    db.query(sql, (err, data) => {
        if(err) {
            res({status: false, data: [], msg: 'not found'})
        } else {
            res({status: true, data: data, msg: 'list of facilities'})
        }
    })
}

const addFacility = (new_facility, res) => {
    // console.log("new facility name: " + new_facility);
    let sql = `
        INSERT INTO facilities(facility_name)
        VALUES (?);
    `;
    db.query(sql, new_facility, (err, data) => {
        if(err) {
            res({status: false, data: [], msg: 'not found'})
        } else {
            res({status: true, data: data, msg: 'list of facilities'})
            console.log("facility added: " + new_facility);
        }
    })
}

const deleteFacilitiesFromListing = (listing_id, res) => {
    let sql = `
        DELETE FROM listing_facilities
        WHERE listing_id = ?;
    `
    db.query(sql, listing_id, function(err, data){
        
        if (err) {
            res({status: false, data: [], msg: err.message})
        }
        else {
            res({status: true, data: data, msg: 'list of facilities'})
        }
    })
}


const addFacilities = (listing_id, facilities, res) => {
    let sql = `
        INSERT INTO listing_facilities (listing_id, facility_id) 
        VALUES ?;
    `
    var values = []
    for(const facility of facilities) {
        values.push([listing_id, facility])
    }
    db.query(sql, [values], function(err, data){
        
        if (err) {
            res({status: false, data: [], msg: err.message})
        }
        else {
            res({status: true, data: data, msg: 'added facilities'})
        }
    })
}

module.exports = {
    getFacilities,
    addFacility,
    deleteFacilitiesFromListing,
    addFacilities
}



