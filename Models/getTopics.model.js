const db = require('../db/connection');

function getTopics() {
    return db.query('SELECT * FROM topics;');
}

module.exports = getTopics;
