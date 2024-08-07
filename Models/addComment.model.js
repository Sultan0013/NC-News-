const db = require('../db/connection')
const users = require('../db/data/test-data/users')

function addComment(username,body,article_id){


    if(isNaN(article_id)){
        return Promise.reject(
            {
                status : 400,
                msg : "Bad Request"
            }
            )
    }
    
   return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id]).then(({rows})=>{
    if(rows.length !== 0 ){
        return db.query(`INSERT INTO comments (article_id,author,body)
        VALUES($1,$2,$3)
        RETURNING *; `, [article_id, username, body])
    }else{
        return Promise.reject(
            {
                status : 404,
                msg : "Not Found"
            }
            )
    }
   })
 
}



module.exports={addComment}