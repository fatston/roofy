const db = require('./connection')


const getListingStats = (res) => {
    let sql = `
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

const getUserStats = (res) => {
    let sql = `
        SELECT (
            SELECT COUNT(*) FROM user WHERE datetime_created BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()
        ) AS userCount, (
            SELECT COUNT(*) FROM seller WHERE datetime_created BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()
        ) AS sellerCount;
    `;
    // run the sql query on db
    db.query(sql, (err, row) => {
        if (err) {
            res({success:false, msg:err});
        }
        else {
            res({success:true, data:row, msg:'past week user stats'});
        }
    })
}

const getViewStats = (res) => {
    let sql = `
        Select day(datetime_viewed) as day, count(*) as countViews
        FROM views 
        WHERE month(datetime_viewed) = month(CURRENT_DATE())
        AND year(datetime_viewed) = year(CURRENT_DATE())
        GROUP BY day 
        ORDER BY day ASC
    `;
    // run the sql query on db
    db.query(sql, (err, row) => {
        if (err) {
            res({success:false, msg:err});
        }
        else {
            res({success:true, data:row, msg:'past week user stats'});
        }
    })
}

const getViewStatsMonth = (req, res) => {
    let sql;
    if (!(req.params.month) || !(req.params.year)) { // normal
        sql = `
            Select day(datetime_viewed) as day, count(*) as countViews
            FROM views 
            WHERE month(datetime_viewed) = month(CURRENT_DATE())
            AND year(datetime_viewed) = year(CURRENT_DATE())
            GROUP BY day 
            ORDER BY day ASC
        `;
        // run the sql query on db
        db.query(sql, (err, row) => {
            if (err) {
                res({success:false, msg:err});
            }
            else {
                res({success:true, data:row, msg:'past month user stats'});
            }
        })
    }
    else {
        let month = req.params.month;
        let year = req.params.year;
        sql = `
            Select day(datetime_viewed) as day, count(*) as countViews
            FROM views 
            WHERE month(datetime_viewed) = ?
            AND year(datetime_viewed) = ?
            GROUP BY day 
            ORDER BY day ASC
        `;
        // run the sql query on db
        db.query(sql, [month, year], (err, row) => {
            if (err) {
                res({success:false, msg:err});
            }
            else {
                res({success:true, data:row, msg:'past month user stats'});
            }
        })
    }
    
}

module.exports = {
    getListingStats,
    getUserStats,
    getViewStats,
    getViewStatsMonth
}