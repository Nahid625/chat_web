const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);
// socket server
const { Server } = require("socket.io");
const path = require("path");
const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.broadcast.emit("hey", "there");

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("user Disconnected");
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

expressServer.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
