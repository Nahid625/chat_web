const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);
// socket server
const { Server } = require("socket.io");
const path = require("path");
const io = new Server(expressServer);

// namespech
const chatNameSpece = io.of("/chat");

chatNameSpece.on("connection", (socket) => {
  try {
    console.log(socket.id);

    socket.on("join_room", (roomID) => {
      if (!roomID) {
        return socket.emit("roomID is required");
      }
      socket.join(roomID);

      const totalPerson = chatNameSpece.adapter.rooms.get(roomID)?.size || 0;
      chatNameSpece
        .to(roomID)
        .emit("message", totalPerson + "hallow guys how are you ");

      chatNameSpece.in(roomID).emit("sleep", "hello");
      console.log("Users in room:", totalPerson);
    });

    socket.on("message", (msg, roomId) => {
      if (!msg || !roomId) {
        return socket.emit("msg and roomId required Perameter");
      }
      socket.to(roomId).emit("message", msg);
    });
   
  } catch (error) {
    console.log(error);
  }
});

const chat_w_room = io.of("/dirrect_chat");

chat_w_room.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send_message", (msg) => {
    if (!msg) {
      return socket.emit("error", "Message is required");
    }

    chat_w_room.emit("receive_message", msg);
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

expressServer.listen(4000, () => {
  console.log("server is running on http://localhost:4000");
});
