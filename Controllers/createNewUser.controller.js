const { AddNewUser } = require("../Models/createNewUser.model");

const createNewUser = (req, res, next) => {
  const { username, name, avatar_url } = req.body;
  AddNewUser(username, name, avatar_url)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = createNewUser;
