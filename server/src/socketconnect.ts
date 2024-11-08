import { Server } from "socket.io";

export default function setupSocket(io : Server){
    io.on("connection",(socket)=>{
        console.log("server connected", socket.id);
        socket.on("message", (data) =>{
            console.log("server side message", data)
            socket.emit("message", data)
        });
        socket.on("disconnect", () => {
            console.log(" user disconnected", socket.id)
        });
    })
}