"use client"
import { getSocket } from '@/lib/socket.config'
import React, { useEffect, useMemo } from 'react'
import {v4 as uuidV4} from "uuid"
import { Button } from '../ui/button'

export default function ChatBase() {
    let socket = useMemo(()=>{
        const socket = getSocket()
        return socket
    }, [])

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Client connected to server with socket ID:", socket.id);
        });
    
        socket.on("message", (data: any) => {
            console.log("Received message:", data);
        });
    
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    
        return () => {
            socket.close();
        };
    }, [socket]);

    const handleClick = () =>{
        socket.emit("message", {name : "venkat", id: uuidV4()})
    }
  return (
    <div>
        <Button onClick={handleClick}>
            send
        </Button>
    </div>
  )
}
