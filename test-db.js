const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "Goldenahmed14", // Add your MySQL password if needed
  database: "hospital_management"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL connected successfully!");
});
