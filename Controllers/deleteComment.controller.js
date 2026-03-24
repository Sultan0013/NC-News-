const delete_comment = require("../Models/deleteComment.model")
const deleteComment = (req ,resp, next)=>{
    const {comment_id} = req.params
  
   
    delete_comment(comment_id).then(()=>{
  
        resp.status(204).send()
    }).catch(err=>{
        next(err)
    })
}

module.exports = deleteComment