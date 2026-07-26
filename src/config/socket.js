const { Server } = require("socket.io");

let io;

const initSocket = (expressServer) => {
  io = new Server(expressServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // This is where the server actually listens to connected users
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listens for the frontend asking to enter a chat room
    socket.on("join_room", (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined room: ${conversationId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = {
  initSocket,
  getIO,
};
