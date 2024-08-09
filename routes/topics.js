const express = require('express');
const router = express.Router();
const fetchAllTopics = require('../Controllers/fetchAllTopics.controller.js')


router.get('/', fetchAllTopics);

module.exports = router;
