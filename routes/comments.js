const express = require('express');
const router = express.Router();
const deleteComment = require('../Controllers/deleteComment.controller')

router.delete('/:comment_id', deleteComment);

module.exports = router;
