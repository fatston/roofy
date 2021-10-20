const db = require('./connection')


const getListingStats = (res) => {
    sql = `
        (
            SELECT COUNT(*) AS last_week
            FROM listings l
            WHERE l.listing_datetime BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()
        )
        UNION ALL (
            SELECT COUNT(*)
            FROM listings
            WHERE listing_datetime BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 14 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
        )
        UNION ALL (
            SELECT COUNT(*)
            FROM listings
            WHERE listing_datetime BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 21 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 14 DAY)
        )
        UNION ALL (
            SELECT COUNT(*)
            FROM listings
            WHERE listing_datetime BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 28 DAY) AND DATE_SUB(CURRENT_DATE(), INTERVAL 21 DAY)
        );
    `
    // run the sql query on db
    db.query(sql, (err, row) => {
        if (err) {
            res({success:false, msg:err});
        }
        else {
            res({success:true, data:row, msg:'past month listing stats'});
        }
    })
}

module.exports = {
    getListingStats
}