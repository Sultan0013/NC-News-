
//const fetchUser = require('../Models/fetchUserByUsername.model')
function fetchUserByUserName(req,resp, err , next) {
    const username = req.params.username
   console.log(username);
    // fetchUser(username).then((user) => {
     
    //     resp.status(200).send({user})
    // }).catch((err) => {
    //     console.log(err);  
   
    // })
}


module.exports = fetchUserByUserName