const db = require('../db/connection')

function getArticle(article_id){
    if(isNaN(article_id)){
        return Promise.reject({
            status : 400,
            msg: 'Bad Request'
        })
    }
    return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
}

module.exports = getArticle