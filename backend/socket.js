import { Server } from "socket.io";

let io;
export const userSocketMap = {};

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
      console.log(`User connected: ${userId} -> socket: ${socket.id}`);
    }

    io.emit("onlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      if (userId) {
        delete userSocketMap[userId];
        console.log(`User disconnected: ${userId}`);
      }
      io.emit("onlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export const getIo = () => io;