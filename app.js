const express = require("express");
const app = express();
const {fetchAllTopics}  = require('./controllers/fetchAllTopics.controller');
const getALLapi = require('./Controllers/getAPI.controller')
app.use(express.json());

app.get('/api/topics', fetchAllTopics);

app.get('/api' ,getALLapi)
app.use((req, res, next) => {
    res.status(404).send({ msg: 'Route Not Found' });
});



app.use((error, req, res, next) => {
  res.status(500).send({ msg: 'Internal Srver Error' });
});

module.exports = app;
