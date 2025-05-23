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

// Import models for real-time saving
// const MessageModel = require("./Models/MessageModel");
// const ConversationModel = require("./Models/ConvoModel");

// App setup
const app = express();
const server = http.createServer(app);

const messages = [];

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with frontend URL in production
    methods: ["GET", "POST"],
  },
});

let onlineUsers = new Map();

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

io.on("connection", (socket) => {
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
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
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
