const express = require('express');
const router = express.Router();
const {
  

  deleteComment
} = require('../controllers/index');

router.delete('/:comment_id', deleteComment);

module.exports = router;
