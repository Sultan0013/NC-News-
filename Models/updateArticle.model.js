const db= require('../db/connection')

function update_Article (article_id,inc_votes){
   
    if (isNaN(article_id) ||isNaN(inc_votes) ) {
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
   const values = [inc_votes, article_id]
   return db.query(checkQuery, [article_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: 'Not Found'
                });
            }
          
        let updatedVotes;
            let  currentVotes = rows[0].votes;
            const checkForSum = currentVotes + inc_votes
         
            if (checkForSum<= 0) {
              updatedVotes = 0
              
              
           return db.query(` UPDATE articles
           SET votes = votes + $1
           WHERE article_id = $2
           RETURNING *;`, [updatedVotes, article_id]);
            }


           return db.query(updateQuery, values);
        }).then(({ rows }) => {

            return rows[0];
        });
      
}

module.exports ={update_Article}