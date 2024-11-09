import { Server, Socket } from "socket.io";
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
    io.on("connection",(socket)=>{
        console.log("server connected", socket.id);

        socket.on("message", (data) =>{
            console.log("server side message", data)
            socket.broadcast.emit("message", data)
        });

        socket.on("disconnect", () => {
            console.log(" user disconnected", socket.id)
        });
    })
}