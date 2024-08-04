const express = require("express");
const app = express();

const {
  addNewComment,
  deleteComment,
  fetchArticleById,
  fetchAllTopics,
  getAllArticles,
  getALLapi,
  selectCommentsByArticleId,
  updateArticle,
  fetchAllUsers,
} = require("./Controllers/index.js");

app.use(express.json());

app.get("/api/topics", fetchAllTopics);

app.get("/api", getALLapi);

app.get("/api/articles/:article_id", fetchArticleById);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", selectCommentsByArticleId);

app.get("/api/users", fetchAllUsers);

app.post("/api/articles/:article_id/comments", addNewComment);

app.patch("/api/articles/:article_id", updateArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.use((req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
});

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status).send(error.msg);
  }
  res.status(500).send({ msg: "Internal Srver Error" });
});

module.exports = app;