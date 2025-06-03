const express = require("express");
const {
  createNotification,
  getNotifications,
  markNotificationsRead,
} = require("../Controllers/NotificationController");

const router = express.Router();

router.post("/", createNotification);
router.get("/:userId", getNotifications);
router.put("/mark-read/:userId", markNotificationsRead);

module.exports = router;
