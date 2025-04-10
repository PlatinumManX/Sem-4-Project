const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Import database connection

const router = express.Router(); // ✅ You forgot this line!

// User Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (results.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Database Insertion Error:", err); // Debugging
            return res.status(500).json({ message: "Error saving user", error: err });
          }
          res.status(201).json({ message: "User registered successfully!" });
        }
      );      
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; // ✅ Make sure to export router!

// Patient Login Route
router.post("/patient-login", async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    db.query("SELECT * FROM patients WHERE id = ?", [id], async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid ID or password" });
      }

      const isMatch = await bcrypt.compare(password, results[0].password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid ID or password" });
      }

      // Success
      res.status(200).json({ message: "Login successful", redirect: "/patientdashboard.html" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
