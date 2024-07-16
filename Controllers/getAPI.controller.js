const fs = require("fs")

const getALLapi = ((req, resp, err)=>{
   try{
    const apidata = fs.readFileSync('/Users/sultandara/Desktop/NorthCoders/backend/be-nc-news/endpoints.json', 'utf-8')
    resp.status(200).send(JSON.parse(apidata))
   }catch(err){
    next(err)
   }

})

module.exports = getALLapi