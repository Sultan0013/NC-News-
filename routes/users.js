const express = require('express');
const router = express.Router();
const fetchUserByUserName = require('../Controllers/fetchUserByUserName.controller')
const fetchAllUsers = require('../Controllers/fetchAllUsers.controller')
router.get('/', fetchAllUsers);
router.get('/:username', fetchUserByUserName);

module.exports = router;
