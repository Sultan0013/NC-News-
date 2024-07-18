const fetchUsers  =require('../Models/fetchUsers.model')

const fetchAllUsers = (request , response , next)=>{

    fetchUsers().then((users)=>{
       response.status(200).send({users})
    }).catch(error=>{
        next(error)
    })
    
}

module.exports = fetchAllUsers