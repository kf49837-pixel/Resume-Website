const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Make uploaded files accessible in the browser
app.use("/uploads", express.static("uploads"));

const uploadRoutes = require("./routes/uploadRoutes");

app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Resume Upload API is working",
  });
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});