const express = require('express');
const router = express.Router();

   const  fetchArticleById  = require('../Controllers/fetArticlesById.controller')
 const  getAllArticles = require('../Controllers/getAllArticles.controller')
 const   selectCommentsByArticleId = require('../Controllers/selectCommentsByArticleID.controller')
 const  addNewComment = require('../Controllers/addNewComment.controller')
 const updateArticle = require('../Controllers/updateArticle.controller')
 const  deleteComment = require('../Controllers/deleteComment.controller')



router.get('/', getAllArticles);


router.get('/:article_id', fetchArticleById);

router.get('/:article_id/comments', selectCommentsByArticleId);

router.post('/:article_id/comments', addNewComment);


router.patch('/:article_id', updateArticle);


router.delete('/comments/:comment_id', deleteComment);

module.exports = router;
