require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const UserAuth = require("./Routes/UserAuth");

const app = express();

const cors = require("cors");

app.use(cors()); // Allow all origins by default

// Use CORS middleware
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/userauth", UserAuth);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO;

mongoose
  .connect(MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB & listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  });
