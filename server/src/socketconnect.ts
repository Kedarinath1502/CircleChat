import { Server, Socket } from "socket.io";
import prisma from "./config/db.config.js";
interface CustomSocket extends Socket {
    room?: string;
  }
export default function setupSocket(io : Server){
   
    io.use((socket: CustomSocket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
          return next(new Error("Invalid room"));
        }
        socket.room = room;
        next();
      });
    io.on("connection",(socket:CustomSocket)=>{
        socket.join(socket.room);
        console.log("server connected", socket.id);

        socket.on("message", async (data) =>{
            console.log("server side message", data)
            await prisma.chats.create({
                data: data
            })
            socket.to(socket.room).emit("message", data)
        });

        socket.on("disconnect", () => {
            console.log(" user disconnected", socket.id)
        });
    })
}