require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth"); // Ensure the path is correct

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware (Order Matters)
app.use(cors());
app.use(express.json()); // ✅ Make sure this is included
app.use(bodyParser.json()); // ✅ Ensures JSON requests are parsed

// ✅ Authentication Routes
app.use("/auth", authRoutes); // ✅ This registers the /auth/signup route

// ✅ Root Route (Health Check)
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
