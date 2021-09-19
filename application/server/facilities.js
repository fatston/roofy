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

module.exports = {
    getFacilities
}



