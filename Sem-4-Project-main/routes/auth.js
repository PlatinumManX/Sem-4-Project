const express = require("express");
const db = require("../db"); // Your MySQL connection

const router = express.Router();

// -------------------------
// User Signup Route
// -------------------------
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
      (err, result) => {
        if (err) {
          console.error("Database Insertion Error:", err);
          return res.status(500).json({ message: "Error saving user", error: err });
        }
        res.status(201).json({ message: "User registered successfully!" });
      }
    );
  });
});

// -------------------------
// Patient Login Route (using email)
// -------------------------
router.post("/patient-login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query("SELECT * FROM patients WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (password !== results[0].password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", redirect: "/patientdashboard.html" });
  });
});

module.exports = router;
