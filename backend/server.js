const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const routes = require("./routes/index");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Smartlink Backend is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});