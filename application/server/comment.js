const db = require('./connection')

const getAllComments = (listing_id, res) => {
    //cu standfor combined-user between seller and user
    let sql = `
    SELECT c.listing_id, c.comment_id, c.reply_id, c.comments, c.datetime, c.seller_id, cu.name, cu.display_picture
    FROM comments c
    INNER JOIN
    (
        SELECT NULL AS "user_id", seller_id, name, display_picture 
        FROM seller
    UNION
        SELECT user_id, NULL AS "seller_id", name, display_picture 
        FROM user
    ) AS cu
    ON (cu.user_id = c.user_id OR cu.seller_id = c.seller_id)
    WHERE c.listing_id = ?
    ORDER BY reply_id, datetime DESC
    ;`;
    db.query(sql, listing_id, (err, row) => {
        if(err) {
            res({status: false, data: [], msg: 'not found'})
        } else {
            let comments = [];
            row.forEach(comment => {
                if(comment.reply_id === null){
                    comments.push(comment)
                } else {
                    let index = comments.findIndex((obj => obj.comment_id == comment.reply_id))
                    if(index != -1) {
                        if(!("replies" in comments[index])) {
                            comments[index]["replies"] = [comment]
                        } else {
                            comments[index]["replies"].push(comment)
                        }
                    }
                }
            });
            res({status: true, data: comments, msg: 'list of listings'})
        }
    })
}
const addComment = (listing_id, comments, user_id, res) => {
    let sql = `
        INSERT INTO comments (listing_id, comments, datetime, user_id) VALUES (?, ?, ?, ?)
    `
    let date = new Date();
    db.query(sql, [listing_id, comments, date, user_id], (err) => {
        if (err) {
            console.log("err", err)
            res({status: false, data: [], msg: err.message})
        } else {
            res({status: true, data: [], msg: 'Comment Added'})
        }
    })
}

const replyComment = (listing_id, reply_id, comments, user_id, res) => {
    let sql = `
        INSERT INTO comments (listing_id, reply_id, comments, datetime, user_id) VALUES (?, ?, ?, ?, ?)
    `
    let date = new Date()
    db.query(sql, [listing_id, reply_id, comments, date, user_id], (err) => {
        if (err) {
            console.log("err", err)
            res({status: false, data: [], msg: err.message})
        } else {
            res({status: true, data: [], msg: 'Reply Added'})
        }
    })
}


module.exports = {
    getAllComments,
    addComment,
    replyComment
}