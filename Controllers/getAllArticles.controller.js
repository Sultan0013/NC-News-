const {fetchAllArticles} = require("../Models/getAllArticles.model")
const getAllArticles =(req, resp, next)=>{

   fetchAllArticles().then((articles)=>{
    resp.status(200).send({articles})
   
}).catch(error=>{
    next(error)
   })
    
}

module.exports = getAllArticles
