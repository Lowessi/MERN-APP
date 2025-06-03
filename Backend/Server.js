const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

// Import routes
const UserAuth = require("./Routes/UserAuth");
const JobRoutes = require("./Routes/JobRoutes");
const ProfileRoutes = require("./Routes/ProfileRoutes");
const MessageRoutes = require("./Routes/MessageRoutes");
const NotificationRoutes = require("./Routes/NotificationRoutes");

<<<<<<< HEAD
// Import models
const MessageModel = require("./Models/MessageModel");
const ConversationModel = require("./Models/ConvoModel");
=======
// Import models for real-time saving
// const MessageModel = require("./Models/MessageModel");
// const ConversationModel = require("./Models/ConvoModel");
>>>>>>> 68c342b1b5ecb45ccec3cf8954896021fb375a7f

// App setup
const app = express();
const server = http.createServer(app);

const messages = [];

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend URL in production
    methods: ["GET", "POST"],
  },
});

let onlineUsers = new Map();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/userauth", UserAuth);
app.use("/api/jobs", JobRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/chat", MessageRoutes);
app.use("/api/notifications", NotificationRoutes);

// ==================== SOCKET.IO ====================

const connectedUsers = new Map();

io.on("connection", (socket) => {
<<<<<<< HEAD
  console.log("🟢 New client connected:", socket.id);

  // Join personal room
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    connectedUsers.set(userId, socket.id);
    console.log(`✅ Socket ${socket.id} joined room for user ${userId}`);
  });

  // ----- Real-time messaging -----
  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    try {
      let conversation = await ConversationModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await ConversationModel.create({
          participants: [senderId, receiverId],
        });
      }

      const message = await MessageModel.create({
        conversationId: conversation._id,
        senderId,
        receiverId,
        text,
      });

      // Update last message
      await ConversationModel.findByIdAndUpdate(conversation._id, {
        lastMessage: {
          text,
          senderId,
          createdAt: new Date(),
        },
      });

      // Emit to receiver
      io.to(receiverId).emit("receiveMessage", { message });

      // Emit back to sender
      socket.emit("messageSent", { message });
    } catch (err) {
      console.error("❌ sendMessage error:", err);
      socket.emit("error", { message: "Failed to send message" });
=======
  console.log("User connected:", socket.id);

  socket.on("user-connected", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("User connected with ID:", userId);
  });

  socket.on("send-message", ({ to, from, text }) => {
    // Save message to "DB"
    const message = { to, from, text, timestamp: new Date() };
    messages.push(message);

    // Send message in real-time if recipient online
    const recipientSocket = onlineUsers.get(to);
    if (recipientSocket) {
      io.to(recipientSocket).emit("receive-message", message);
>>>>>>> 68c342b1b5ecb45ccec3cf8954896021fb375a7f
    }
  });

  // ----- Real-time notification -----
  socket.on("sendNotification", ({ recipientId, notification }) => {
    const socketId = connectedUsers.get(recipientId);
    if (socketId) {
      io.to(socketId).emit("receiveNotification", notification);
      console.log(`🔔 Notification sent to user ${recipientId}`);
    } else {
      console.log(`⚪ Recipient ${recipientId} is not connected`);
    }
  });

  // ----- Disconnect -----
  socket.on("disconnect", () => {
<<<<<<< HEAD
    console.log("🔴 Client disconnected:", socket.id);
    for (let [userId, sockId] of connectedUsers.entries()) {
      if (sockId === socket.id) {
        connectedUsers.delete(userId);
=======
    console.log("User disconnected:", socket.id);
    for (const [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
>>>>>>> 68c342b1b5ecb45ccec3cf8954896021fb375a7f
        break;
      }
    }
  });
});

// ==================== DATABASE & SERVER ====================

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO;

mongoose
  .connect(MONGO)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Connected to MongoDB & Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });
