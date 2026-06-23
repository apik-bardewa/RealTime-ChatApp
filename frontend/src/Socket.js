import { io } from "socket.io-client";
import { serverurl } from "./main";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io(serverurl, {
      query: { userId },
      withCredentials: true,
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};