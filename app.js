const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/article');
const topicRouter = require('./routes/topics');
const commentRouter = require('./routes/comments')
const getAllapi = require('./Controllers/getAPI.controller.js')

app.use(cors());
app.use(express.json());


app.use('/api/users', userRouter);
app.use('/api/articles', articleRouter);
app.use('/api/topics', topicRouter);
app.use('/api/comments' , commentRouter)


app.get('/api' ,getAllapi )


app.use((err, request, response, next) => {
    if(err.code === '22P02' || err.code === '23502'){
        response.status(400).send({ msg: "Bad Request" })
        
    }else if(err.code === '23503'){
        response.status(404).send('Not Found' )
    }
    
    else{
        next(err);
    }
});
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
