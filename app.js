const express = require("express");
const app = express();
const { fetchAllTopics } = require('./controllers');

app.use(express.json());

app.get('/api/topics', fetchAllTopics);


app.use((req, res, next) => {
    res.status(404).send({ msg: 'Route Not Found' });
});

app.use((error, req, res, next) => {
  
     res.status(500).send({ msg: 'Internal Server Error' });
    
});

module.exports = app;
