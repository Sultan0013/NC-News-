const db = require("../db/connection");

const AddNewUser = (username, name, avatar_url) => {
  return db
    .query(
      `
    INSERT INTO users (username , name , avatar_url) VALUES ($1 , $2 , $3)  RETURNING * ;
    `,
      [username, name, avatar_url]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

module.exports = { AddNewUser };
