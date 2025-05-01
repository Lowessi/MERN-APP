// middleware/requireAuth.js
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(_id).select("_id");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Request not authorized" });
  }
};

module.exports = requireAuth;
