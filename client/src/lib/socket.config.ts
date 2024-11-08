import {io, Socket } from "socket.io-client"
import Env from "./env"

let socket: Socket
export const getSocket = ():Socket =>{
    if (!socket) {
        socket = io(Env.BACKEND_URL, { autoConnect: false });
    
        socket.on("connect", () => {
          console.log("Socket connected with id:", socket.id);
        });
    
        socket.on("connect_error", (err) => {
          console.error("Connection error:", err);
        });
    
        socket.on("connect_timeout", () => {
          console.error("Connection timeout");
        });
    
        socket.on("disconnect", () => {
          console.log("Socket disconnected");
        });
        socket.connect()
      }
    console.log(socket)
    return socket
}