const db = require('./connection')

const addUserView = (user_id, listing_id, res) => {
    let sql = 'INSERT INTO views (user_id, listing_id) VALUES (?, ?)';
    
    db.query(sql, [user_id, listing_id], (err, row) => {
        if(err) {
            res({status: false, data: [], msg: 'insert fail'})
        } else {
            res({status: true, data: row, msg: 'insert successfully'})
        }
    })
}

const addSellerView = (seller_id, listing_id, res) => {
    //cu standfor combined-user between seller and user
    let sql = 'INSERT INTO views (seller_id, listing_id) VALUES (?, ?)';
    
    db.query(sql, [seller_id, listing_id], (err, row) => {
        if(err) {
            res({status: false, data: [], msg: 'insert fail'})
        } else {
            res({status: true, data: row, msg: 'insert successfully'})
        }
    })
}

module.exports = {
    addUserView,
    addSellerView
}