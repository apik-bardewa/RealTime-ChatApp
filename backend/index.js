import express from 'express';
import dotenv from "dotenv";
import connectDb from './config/db.js';
import dns from 'dns';
import authRouter from './routes/auth.router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.router.js';
import errorHandler from './middleware/error.middleware.js';
import rateLimit from 'express-rate-limit';
import messageRoute from './routes/message.router.js';
import { getMessages, sendData } from './controller/message.controller.js';
import isAuth from './middleware/isAuth.js';
import { createServer } from 'http';           // ✅ new
// import { Server } from 'socket.io';            // ✅ new
import { initSocket } from './socket.js';

dns.setServers(["1.1.1.1","8.8.8.8"]);
dotenv.config();

const app = express();
const httpServer = createServer(app);          // ✅ wrap express in http server

// ✅ Socket.io setup
const io = initSocket(httpServer);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ['GET', 'POST']
//   }
// });

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  message: "Too many requests from your IP, try again later"
});
app.use(limiter);

// ✅ Map to track userId -> socketId
export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User connected: ${userId} -> socket: ${socket.id}`);
  }

  // Broadcast online users to everyone
  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
      console.log(`User disconnected: ${userId}`);
    }
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

// ✅ Export io so controllers can use it
export { io };

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/sendmessage", messageRoute);
app.post("/api/add", isAuth, sendData);
app.get("/api/messages/:id", isAuth, getMessages);

app.get("/", (req, res) => {
  res.send("hello guys");
});

app.use(errorHandler);

httpServer.listen(port, () => {         // ✅ listen on httpServer, not app
  console.log("server is listening at port", port);
  connectDb();
});