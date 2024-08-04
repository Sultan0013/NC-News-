const db = require('../db/connection')


function fetchUser(username) {
  
    return db.query(`SELECT * FROM users where username = $1`, [username]).then(({rows}) => {


        return rows[0]
    })

}


module.exports = fetchUser