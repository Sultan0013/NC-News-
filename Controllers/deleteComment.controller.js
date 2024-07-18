const delete_comment = require("../Models/delectComment.model")
const delectComment = (req ,resp, next)=>{
    const {comment_id} = req.params
  
   
    delete_comment(comment_id).then(()=>{
  
        resp.status(204).send()
    }).catch(err=>{
        next(err)
    })
}

module.exports = delectComment