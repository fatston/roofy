// todo test db query
const db = require('./server/connection');

async function testttt() {
    let email = 'a@b.c'
    let sql = `
        SELECT *
        FROM user
        WHERE email = ?
    `;
    // run the sql query on db
    db.query(sql, [email], (error, result) => {
        if (error) throw error;
        // connected!
        console.log(result);
    })
        
}

testttt();

