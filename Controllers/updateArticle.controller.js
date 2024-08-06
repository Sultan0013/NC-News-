
const {update_Article} = require("../Models/updateArticle.model")
const updateArticle = (req,res,next)=>{
  
    const {inc_votes}= req.body
   
        

    const {article_id} = req.params
update_Article(article_id,inc_votes).then((article)=>{
  res.status(201).send({article})
}).catch(err=>{
    next(err)
})
    
}

module.exports = updateArticle