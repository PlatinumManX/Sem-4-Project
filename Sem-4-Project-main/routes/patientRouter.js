const express = require("express");
const router = express.Router();
const db = require("../db"); // Assuming db.js is in the same directory as your router

// Handle patient registration
router.post("/register", (req, res) => {
  const { name, email, phone, birth_date, gender, address_line1, address_line2, country, city, region, postal_code, password } = req.body;

  // Validate if required fields are provided
  if (!name || !email || !phone || !birth_date || !address_line1 || !country || !city || !region || !postal_code || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Insert patient data into the database
  const query = `INSERT INTO patients (name, email, phone, birth_date, gender, address_line1, address_line2, country, city, region, postal_code, password) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [name, email, phone, birth_date, gender, address_line1, address_line2, country, city, region, postal_code, password], (err, result) => {
    if (err) {
      console.error("Error inserting patient:", err);
      return res.status(500).json({ message: "Error registering patient." });
    }

    res.status(201).json({ message: "Patient registration successful!" });
  });
});

module.exports = router;
