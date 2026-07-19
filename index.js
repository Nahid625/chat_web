const express = require("express");
const app = express();
const http = require("http");

const expressServer = http.createServer(app);
// socket server
const { Server } = require("socket.io");
const path = require("path");
const io = new Server();

io.on("connection", (socket) => {
  socket.on("connection", () => {
    console.log("user Connected");
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
