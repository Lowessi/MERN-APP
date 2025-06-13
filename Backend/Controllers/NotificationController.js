const NotificationModel = require("../Models/NotificationModel");

const createNotification = async (req, res) => {
  try {
    const { recipient, sender, type, message } = req.body;

    const newNotification = await NotificationModel.create({
      recipient,
      sender,
      type,
      message,
    });

    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification" });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await NotificationModel.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .populate("sender", "email");

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

const markNotificationsRead = async (req, res) => {
  try {
    const { userId } = req.params;
    await NotificationModel.updateMany({ recipient: userId }, { isRead: true });
    res.status(200).json({ message: "Marked all as read" });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markNotificationsRead,
};
