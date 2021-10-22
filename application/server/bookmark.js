const db = require('./connection')

const createBookmark = (user_id, listing_id, res) => {
    let sql = `
        INSERT INTO bookmarks VALUES (?, ?)
    `

    db.query(sql, [user_id, listing_id], (err,result,fields) => {
        if (err) {
            console.log("err", err)
            res({status: false, data: [], msg: err.message})
        } else {
            res({status: true, data: [], msg: 'Bookmark Added'})
        }
    })

}

const deleteBookmark = (user_id, listing_id, res) => {
    let sql = `
        DELETE FROM bookmarks 
        WHERE user_id = ?
        AND listing_id = ?;
    `

    db.query(sql, [user_id, listing_id], (err,result,fields) => {
        if (err) {
            console.log("err", err)
            res({status: false, data: [], msg: err.message})
        } else {
            res({status: true, data: [], msg: 'Bookmark Added'})
        }
    })

}

const getBookmarks = (user_id, res) => {
    let sql = `
        SELECT l.*, b.user_id, COUNT(b1.listing_id) AS countbookmarks, DATE_FORMAT(l.listing_datetime, '%d %b %Y at %h:%i %p') AS niceD8
        FROM listings l
        INNER JOIN bookmarks b ON b.listing_id = l.listing_id
        LEFT JOIN bookmarks b1 ON b1.listing_id = l.listing_id
        WHERE b.user_id = ?
        AND (isnull(l.status) OR l.status = 0)
        GROUP BY l.listing_id;
    `
    // run the sql query on db
    db.query(sql, user_id, (err, row) => {
        if (err) {
            res({success:false, msg:err});
        }
        else {
            res({success:true, data:row, msg:'list of listings'});
        }
    })
}

module.exports = {
    createBookmark,
    deleteBookmark,
    getBookmarks
}