import { Server, Socket } from "socket.io";
import prisma from "./config/db.config.js";
import { produceMessage } from "./helper.kafka.js";

interface CustomSocket extends Socket {
  room?: string;
}

export default function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    if (socket.room) {
      socket.join(socket.room);
    }
    console.log("Server connected", socket.id);

    socket.on("message", async (data) => {
      try {
        await produceMessage("chats", data);
        socket.to(socket.room!).emit("message", data);
      } catch (error) {
        console.log("Kafka produce error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
}
