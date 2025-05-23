const ConversationModel = require("../Models/ConvoModel");
const MessageModel = require("../Models/MessageModel");

exports.startOrGetConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ error: "senderId and receiverId are required" });
    }

    console.log(
      "Starting or getting conversation between:",
      senderId,
      receiverId
    );

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error("startOrGetConversation error:", error);
    res.status(500).json({ error: "Failed to start or get conversation" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, receiverId, text } = req.body;

    if (!conversationId || !senderId || !receiverId || !text) {
      return res.status(400).json({
        error: "conversationId, senderId, receiverId, and text are required",
      });
    }

    console.log("Sending message:", {
      conversationId,
      senderId,
      receiverId,
      text,
    });

    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const message = await MessageModel.create({
      conversationId,
      senderId,
      receiverId,
      text,
    });

    // Update last message info on the conversation
    conversation.lastMessage = {
      text,
      senderId,
      createdAt: new Date(),
    };
    await conversation.save();

    res.status(201).json(message);
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    if (!conversationId) {
      return res.status(400).json({ error: "conversationId is required" });
    }

    const messages = await MessageModel.find({ conversationId }).sort({
      createdAt: 1,
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("getMessages error:", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const conversations = await ConversationModel.find({
      participants: userId,
    }).sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    console.error("getConversations error:", error);
    res.status(500).json({ error: "Failed to get conversations" });
  }
};
