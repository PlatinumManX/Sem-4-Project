const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const patientRoutes = require("./routes/patientRouter"); // Only include patient routes

app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/auth", patientRoutes); // Only use patient routes for registration

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
