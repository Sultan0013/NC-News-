const {selectCommentsByArticle_ID} = require("../Models/selectCommentsByID.model")

const selectCommentsByArticleId = (req, resp , next)=>{
    const {article_id} = req.params
   selectCommentsByArticle_ID(article_id).then((comments)=>{
    
    resp.status(200).send({comments})
   }).catch(error=>{
    next(error)
   })
}

module.exports = selectCommentsByArticleId