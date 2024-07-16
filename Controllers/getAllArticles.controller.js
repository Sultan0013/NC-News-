const {fetchAllArticles} = require("../Models/getAllArticles.model")
const getAllArticles =(req, resp, next)=>{

   fetchAllArticles().then((articles)=>{
    console.log(articles)

    resp.status(200).send({articles})
   
}).catch(error=>{
    next(error)
   })
    
}

module.exports = getAllArticles
