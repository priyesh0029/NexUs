import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import  {ChatUsers, Imessage}  from "../../types/socketTypes/socketTypes";

const socketConfig = (io: Server<DefaultEventsMap>) => {
    io.on("connection",(socket)=>{
        console.log("connected to socket.io");

        socket.on("setup",(userData)=>{
            socket.join(userData)
            console.log("userData",userData);
            socket.emit("connected")
        })

        socket.on("join chat",(room)=>{
            socket.join(room)
            console.log("user joined room : ",room);
            
        })

        socket.on("typing",(room)=>socket.in(room).emit("typing",room))
        socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))


        socket.on("new message",(newMesageReceived : Imessage)=>{
            const chat = newMesageReceived.chatId
            if(!chat.users) return console.log("chat.users undefined");

           chat.users.forEach((user:ChatUsers) => {
                if(user.userName === newMesageReceived.sender.userName) return;

                socket.in(user.userName).emit("message received",newMesageReceived)
           });
            
        })

        socket.off("setup",(userData)=>{
            console.log("USER DISCONNECTED");
            socket.leave(userData)
        })
        
    })
}

export default socketConfig;