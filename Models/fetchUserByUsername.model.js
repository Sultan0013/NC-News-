const db = require('../db/connection')


function fetchUser(username) {
  
  console.log(username);
    return db.query(`SELECT * FROM users WHERE username = $1`, [username]).then(({ rows }) => {
      
        
        return rows[0]
    })

}


module.exports = fetchUser