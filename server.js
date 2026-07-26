const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");

const expressServer = http.createServer(app);
const userRoutes = require("./src/routes/user_rotues");
const chatRouter = require("./src/routes/chat_route");
// socket server
const { Server } = require("socket.io");
const path = require("path");


const { initSocket } = require("./src/config/socket"); 
const io = initSocket(expressServer);




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/chat", chatRouter);
expressServer.listen(4000, () => {
  console.log("server is running on http://localhost:4000");
});
