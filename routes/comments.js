const express = require('express');
const router = express.Router();
const {
  

  deleteComment
} = require('../controllers/index');



// Route to delete a comment
router.delete('/:comment_id', deleteComment);

module.exports = router;
