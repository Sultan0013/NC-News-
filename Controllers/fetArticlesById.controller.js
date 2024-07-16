const getArticle = require('../Models/fetchArticleById.model')
const fetchArticleBId = (req , res , next)=>{
    const {article_id} = req.params

    getArticle(article_id).then(({rows})=>{
        if(rows.length === 0 ){
            res.status(404).send("Not Found")
        }
   res.status(200).send( {article : rows})
    }).catch((err)=>{
        next(err)
    })

}


module.exports = fetchArticleBId