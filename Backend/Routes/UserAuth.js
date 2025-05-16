const express = require("express");
const router = express.Router();

const {
  SigninUser,
  SignupUser,
  searchUsers,
  getUserById,
} = require("../Controllers/UsersController");

router.post("/signin", SigninUser);
router.post("/signup", SignupUser);
router.get("/search", searchUsers);
router.get("/:id", getUserById);

module.exports = router;
