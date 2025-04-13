const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if necessary
  password: "Goldenahmed14", // Change if necessary
  database: "hospital_management", // Your actual database name
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database!");
});

module.exports = db;
