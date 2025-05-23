const {
  startOrGetConversation, // <-- Fix the name here
  sendMessage,
  getMessages,
  getConversations,
} = require("../Controllers/MessageController");

const router = require("express").Router();

router.post("/conversation", startOrGetConversation); // Use the correct function here
router.get("/conversations/:userId", getConversations);
router.post("/message", sendMessage);
router.get("/messages/:conversationId", getMessages);

module.exports = router;
