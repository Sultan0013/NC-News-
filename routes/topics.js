const express = require('express');
const router = express.Router();
const  fetchAllTopics  = require('../controllers/fetchAllTopics.controller');


router.get('/', fetchAllTopics);

module.exports = router;
