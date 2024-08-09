const db = require('../db/connection')


function delete_comment(comment_id) {
    console.log(comment_id);
    if(isNaN(comment_id)){
        return Promise.reject({
            status: 400,
            msg: 'Bad Request'
        })
    }
    return db.query(`
    DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [comment_id])
        .then(({ rows }) => {
            console.log(rows);
        if(rows.length ===0){
            return Promise.reject({
                status : 404,
                msg : 'Not Found'
            })
        }
        
    })
}

module.exports = delete_comment