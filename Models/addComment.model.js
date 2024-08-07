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
    // if (isNaN(article_id)) {
    //     return Promise.reject({
    //         status: 400,
    //         msg: "Bad Request"
    //     });
    // }


    // return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    //     .then(({ rows }) => {
    //         if (rows.length === 0) {
    //             return Promise.reject({
    //                 status: 404,
    //                 msg: "Not Found"
    //             });
    //         }
        
    //         return db.query(`
    //             INSERT INTO comments (article_id, author, body)
    //             VALUES ($1, $2, $3)
    //             RETURNING *;
    //         `, [article_id, username, body]);
    //     })
    //     .then(({ rows }) => {
         
    //         return rows;
    //     })
    //     .catch((err) => {
           
    //         throw err;
    //     });
}

module.exports = { addComment };
