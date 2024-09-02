const fs = require("fs");
const path = require("path");
const endpointPath = path.join(__dirname, "../endpoints.json");
const endpoints = require("../endpoints.json");
const getALLapi = (req, res, next) => {
  try {
    const endpoint = fs.readFileSync(endpointPath, "utf8");

    const data = JSON.parse(endpoint);

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = getALLapi;
