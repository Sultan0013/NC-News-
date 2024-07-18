const getTopics = require("../Models/getTopics.model");

const fetchAllTopics = (req, res, next) => {
    getTopics().then(({ rows }) => {
       
   res.status(200).send({ topics: rows });
    }).catch((error) => {
        next(error);
    });
};

module.exports = fetchAllTopics

