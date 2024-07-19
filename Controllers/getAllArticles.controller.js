const {fetchAllArticles} = require("../Models/getAllArticles.model")
const getAllArticles =(req, resp, next)=>{
    const { sort_by , order} = req.query;

 
   fetchAllArticles(sort_by , order).then((articles)=>{
    resp.status(200).send({articles})
   
}).catch(error=>{
    next(error)
   })
    
}

module.exports = getAllArticles
