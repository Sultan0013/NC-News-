const getTopics = require("../Models/getTopics.model");

exports.fetchAllTopics = (req, res, next) => {
    getTopics().then(({ rows }) => {
       
   res.status(200).send({ topics: rows });
    }).catch((error) => {
        next(error);
    });
};

