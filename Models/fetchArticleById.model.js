const db = require('../db/connection')

function getArticle(article_id){
    if(isNaN(article_id)){
        return Promise.reject({
            status : 400,
            msg: 'Bad Request'
        })
    }
      return db.query(
        `SELECT 
            articles.*,
            COUNT(comments.comment_id) ::int AS comment_count
         FROM articles
         LEFT JOIN comments ON articles.article_id = comments.article_id
         WHERE articles.article_id = $1
         GROUP BY articles.article_id`, 
        [article_id]
    )
}

module.exports = getArticle