const express = require('express');
const router = express.Router();

   const  fetchArticleById  = require('../Controllers/fetchArticlesById.controller')
 const  getAllArticles = require('../Controllers/getAllArticles.controller')
 const   selectCommentsByArticleId = require('../Controllers/selectCommentsByArticleID.controller')
 const  addNewComment = require('../Controllers/addNewComment.controller')
 const updateArticle = require('../Controllers/updateArticle.controller')


router.get('/', getAllArticles);


router.get('/:article_id', fetchArticleById);

router.get('/:article_id/comments', selectCommentsByArticleId);

router.post('/:article_id/comments', addNewComment);


router.patch('/:article_id', updateArticle);


module.exports = router;
