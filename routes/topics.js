const express = require('express');
const router = express.Router();
const { fetchAllTopics } = require('../controllers/index');

// Route to get all topics
router.get('/', fetchAllTopics);

module.exports = router;
