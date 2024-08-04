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

// the routers for each task
const topicsRouter = express.Router();
const articlesRouter = express.Router();
const commentsRouter = express.Router();
const usersRouter = express.Router();
const apiRouter = express.Router();

//topics router
topicsRouter.get("/", fetchAllTopics);

// article routers
articlesRouter.get("/:article_id", fetchArticleById);
articlesRouter.get("/", getAllArticles);
articlesRouter.get("/:article_id/comments", selectCommentsByArticleId);
articlesRouter.post("/:article_id/comments", addNewComment);
articlesRouter.patch("/:article_id", updateArticle);

//comments routers
commentsRouter.delete("/:comment_id", deleteComment);

//users routers
usersRouter.get("/", fetchAllUsers);

// Define routes for API info
apiRouter.get("", getALLapi);



app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/users", usersRouter);
app.use("/api", apiRouter);


app.use((req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
});


app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status).send(error.msg );
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
