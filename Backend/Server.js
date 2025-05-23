require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Import routes
const UserAuth = require("./Routes/UserAuth");
const JobRoutes = require("./Routes/JobRoutes");
const ProfileRoutes = require("./Routes/ProfileRoutes");
const MessageRoutes = require("./Routes/MessageRoutes");

// Import models for real-time saving
const MessageModel = require("./Models/MessageModel");
const ConversationModel = require("./Models/ConvoModel");

// App setup
const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with frontend URL in production
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Request logger (for development)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/userauth", UserAuth);
app.use("/api/jobs", JobRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/chat", MessageRoutes); // ✅ Messaging routes

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join a room by user ID
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`Socket ${socket.id} joined room ${userId}`);
  });

  // Real-time message handling
  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    try {
      // Find or create conversation
      let conversation = await ConversationModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await ConversationModel.create({
          participants: [senderId, receiverId],
        });
      }

      // Save the message
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

      // Emit to receiver and sender
      io.to(receiverId).emit("receiveMessage", { message });
      socket.emit("messageSent", { message });
    } catch (err) {
      console.error("Socket sendMessage error:", err);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server and DB
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO;

mongoose
  .connect(MONGO)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Connected to DB & listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to DB", error);
    process.exit(1);
  });
