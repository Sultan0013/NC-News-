
const {addComment} = require('../Models/addComment.model')
const addNewComment = (req ,response , next)=>{
  
    const { article_id } = req.params;
    const {username , body}= req.body


    addComment(username, body, article_id).then(({rows})=>{
        response.status(201).send({Comment :rows[0]})
    }).catch(err=>{
        next(err)
    })
    
}

module.exports = {addNewComment}