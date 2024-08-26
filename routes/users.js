const express = require("express");
const router = express.Router();
const fetchUserByUserName = require("../Controllers/fetchUserByUserName.controller");
const fetchAllUsers = require("../Controllers/fetchAllUsers.controller");
const { createNewUser } = require("../Controllers");

router.get("/", fetchAllUsers);
router.get("/:username", fetchUserByUserName);
router.post("/signup", createNewUser);

module.exports = router;
