const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Goldenahmed14",
  database: "hospital_management",
});

// Login route for patients
router.post("/patient-login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM patients WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      // Login success
      res.status(200).json({ message: "Login successful" });
    } else {
      // Invalid login
      res.status(401).json({ message: "Please enter correct id and password" });
    }
  });
});

module.exports = router;
