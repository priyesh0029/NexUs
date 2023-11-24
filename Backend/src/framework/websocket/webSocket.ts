import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ChatUsers, Imessage } from "../../types/socketTypes/socketTypes";

// let activeUsers:string[] = []
const rooms: Record<string, string[]> = {};

interface IvideoChatRoom {
  room: string;
  peerId: string;
  user: string;
}

const socketConfig = (io: Server<DefaultEventsMap>) => {
  io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on("setup", (userData) => {
      socket.join(userData);
      console.log("userData", userData);
      socket.emit("connected");
    });

    socket.on("join chat", ({ room, user, peerId }: IvideoChatRoom) => {
      // socket.join(room);
      console.log("user joined room : ", room);
      //for videochat
      if (!rooms[room] || rooms[room].length < 1) {
        rooms[room] = [peerId];
      } else {
        if (rooms[room].some((id) => id !== peerId)) rooms[room].push(peerId);
      }
      console.log("user joined the room for video chat", rooms);
      socket.join(room);

      socket.on("disconnect", () => {
        console.log("user left the room", peerId);
        leaveRoom({ room, user, peerId });
      });
    });

    socket.on("join videoChat", (room: string) => {
      if (rooms[room]) {
        socket.emit("get-users", {
          room,
          participants: rooms[room],
        });
      }
    });

    socket.on("typing", (room) => socket.in(room).emit("typing", room));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("start calling", (room,caller: string, calledUser: string) => {
      console.log("start calling console : ",room,caller,calledUser);
      
      socket.in(calledUser).emit("received call", caller,room);
    });

    socket.on("stop calling", (room,calledUser: string,caller: string) => {
      console.log("start calling console : ",room,caller,calledUser);
      
      socket.in(calledUser).emit("stop call ", caller,room);
    });

    socket.on("new message", (newMesageReceived: Imessage) => {
      const chat = newMesageReceived.chatId;
      if (!chat.users) return console.log("chat.users undefined");

      chat.users.forEach((user: ChatUsers) => {
        if (user.userName === newMesageReceived.sender.userName) return;

        socket.in(user._id).emit("message received", newMesageReceived);
      });
    });

    const leaveRoom = ({ peerId, user, room }: IvideoChatRoom) => {
      rooms[room] = rooms[room]?.filter((id) => id !== peerId);
      socket.to(room).emit("user-disconnected", peerId);
    };
    //for video chat

    socket.off("setup", (userData) => {
      console.log("USER DISCONNECTED");
      socket.leave(userData);
    });
  });
};

export default socketConfig;
