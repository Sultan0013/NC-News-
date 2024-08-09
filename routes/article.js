const express = require('express');
const router = express.Router();
const {
  fetchArticleById,
  getAllArticles,
  selectCommentsByArticleId,
  addNewComment,
  updateArticle,
  deleteComment
} = require('../controllers/index');


router.get('/', getAllArticles);


router.get('/:article_id', fetchArticleById);

router.get('/:article_id/comments', selectCommentsByArticleId);

router.post('/:article_id/comments', addNewComment);


router.patch('/:article_id', updateArticle);


router.delete('/comments/:comment_id', deleteComment);

module.exports = router;
