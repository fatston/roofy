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
    console.log("new facility name: " + new_facility);
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

module.exports = {
    getFacilities,
    addFacility
}



