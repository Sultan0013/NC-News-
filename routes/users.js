const express = require('express');
const router = express.Router();
const { fetchUserByUserName, fetchAllUsers } = require('../controllers/index.js');

router.get('/', fetchAllUsers);
router.get('/:username', fetchUserByUserName);

module.exports = router;
