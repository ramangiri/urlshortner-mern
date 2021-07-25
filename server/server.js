const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDb");

const app = express();
app.use(express.json());
app.use(cors());

//Import route
const authRoutes = require("./routes/users");
const urlRoutes = require("./routes/urls");

//Middleware
app.use("/user", authRoutes);
app.use("/urls", urlRoutes);

//Server
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Server is up and running");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
