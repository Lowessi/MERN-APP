const express = require("express");
const router = express.Router();

const {
  SigninUser,
  SignupUser,
  searchUsers,
} = require("../Controllers/UsersController");

router.post("/signin", SigninUser);
router.post("/signup", SignupUser);
router.get("/search", searchUsers);

module.exports = router;
