const db = require('../db/connection');

function update_Article(article_id, inc_votes) {
  
    if (isNaN(article_id)) {
        return Promise.reject({
            status: 400,
            msg: 'Bad Request'
        });
    }

    const checkQuery = `SELECT votes FROM articles WHERE article_id = $1;`;
    const updateQuery = `
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;
    `;
    const values = [inc_votes, article_id];

    // Check if article exists
    return db.query(checkQuery, [article_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: 'Not Found'
                });
            }

            // Proceed with updating the vote count
            return db.query(updateQuery, values);
        })
        .then(({ rows }) => {
            return rows[0];
        });
}

module.exports = { update_Article };
