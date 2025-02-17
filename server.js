//programmers: Stephanos Khoury , Rula Yosef
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware for Logging Requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
  next();
});

// Middleware for Authorization (applied only to /admin)
const authMiddleware = (req, res, next) => {
  const user = req.query.user;

  if (user !== "admin") {
    return res.status(403).json({ message: "Access Denied" });
  }

  next();
};

// Routes

// Home Page (Available to Everyone)
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

// Admin Page (Protected - Only accessible if user=admin)
app.get("/admin", authMiddleware, (req, res) => {
  res.send("Welcome to the admin page!");
});

// Public Page (Available to Everyone)
app.get("/public", (req, res) => {
  res.send("This is a public page.");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
