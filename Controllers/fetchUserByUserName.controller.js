const fetchUser = require('../Models/fetchUserByUsername.model');

function fetchUserByUserName(req, res, next) {


    const username = req.params.username;


    fetchUser(username)
        .then((user) => {
            if (!user) {
 
                return res.status(404).send({ msg: "User Not Found" });
            }
            res.status(200).send(user);
        })
        .catch((err) => {

            next(err); 
        });
}

module.exports = fetchUserByUserName;
