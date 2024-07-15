const getTopics = require('../models/index');

const fetchAllTopics = (req, res, next) => {
    getTopics().then(({ rows }) => {
       
   res.status(200).send({ topics: rows });
    }).catch((error) => {
        next(error);
    });
};

module.exports = { fetchAllTopics };
