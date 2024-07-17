const db  = require("../db/connection")


function selectCommentsByArticle_ID(article_id){
    if(isNaN(article_id)){
        return Promise.reject({
            status : 400,
            msg : "bad request"
        })
    }
    return db.query(`SELECT * FROM comments WHERE article_id = $1 
    ORDER BY created_at DESC;`,[article_id]).then(({rows})=>{
        if(rows.length === 0){
            return Promise.reject({
                status : 404,
                msg : "Not Found"
            })
        }
        return rows
    })
}

module.exports = {selectCommentsByArticle_ID}