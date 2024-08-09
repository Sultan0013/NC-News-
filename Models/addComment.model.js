const db = require('../db/connection');
const getArticle = require('./fetchArticleById.model')

function addComment(username, body, article_id) {

       const postQuery = 'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;'

    
        return getArticle(article_id)

.then(() => {

    return db.query(postQuery, [article_id, username, body])

})
        
            .then(({ rows }) => {

                return rows

            })
   
}

module.exports = { addComment };
