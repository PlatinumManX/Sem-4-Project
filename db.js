const mysql = require("mysql"); // or "mysql2" if using MySQL2

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if using a different user
  password: "Goldenahmed14", // Change if MySQL has a password
  database: "hospital_management", // Replace with your actual database name
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database!");
});

module.exports = db;
