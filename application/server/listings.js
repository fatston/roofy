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

module.exports = {
    getListings
}



