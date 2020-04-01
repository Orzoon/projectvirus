const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mapRoutes = require("./routes/routes")
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")))

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  next();
})

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + "/public" + "/index.html"))
})

app.use(mapRoutes);

app.listen(PORT, () => {
  console.log("server running on port" + PORT)
})