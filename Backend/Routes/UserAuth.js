const express = require("express");
const router = express.Router();

const { SigninUser, SignupUser } = require("../Controllers/UsersController");

router.post("/signin", SigninUser);
router.post("/signup", SignupUser);

module.exports = router;
