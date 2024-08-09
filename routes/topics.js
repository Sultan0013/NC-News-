const express = require('express');
const router = express.Router();
const { fetchAllTopics } = require('../controllers/index');


router.get('/', fetchAllTopics);

module.exports = router;
