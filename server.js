const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/testdb";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define schema and model
const itemSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});
const Item = mongoose.model("Item", itemSchema);

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.render("index", { items });
});

app.post("/add", async (req, res) => {
  const { name } = req.body;
  if (name && name.trim() !== "") {
    const newItem = new Item({ name });
    await newItem.save();
  }
  res.redirect("/");
});

// Start server
app.listen(port, () => {
  console.log(`🌍 Server running at http://localhost:${port}`);
});

