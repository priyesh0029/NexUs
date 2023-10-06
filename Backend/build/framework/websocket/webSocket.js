"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let activeUsers:string[] = []
const rooms = {};
const socketConfig = (io) => {
    io.on("connection", (socket) => {
        console.log("connected to socket.io");
        socket.on("setup", (userData) => {
            socket.join(userData);
            console.log("userData", userData);
            // rooms[userData] = []; //for video chat
            socket.emit("connected");
        });
        socket.on("join chat", ({ room, user, peerId }) => {
            // socket.join(room);
            console.log("user joined room : ", room);
            //for videochat
            if (!rooms[room] || rooms[room].length < 1) {
                rooms[room] = [peerId];
            }
            else {
                if (rooms[room].some((id) => id !== peerId))
                    rooms[room].push(peerId);
            }
            console.log("user joined the room for video chat", rooms);
            socket.join(room);
            // socket.to(room).emit("user-joined", { peerId });
            // socket.emit("get-users", {
            //   room,
            //     participants: rooms[room],
            // });
            socket.on("disconnect", () => {
                console.log("user left the room", peerId);
                leaveRoom({ room, user, peerId });
            });
        });
        socket.on("join videoChat", (room) => {
            if (rooms[room]) {
                socket.emit("get-users", {
                    room,
                    participants: rooms[room],
                });
            }
        });
        socket.on("typing", (room) => socket.in(room).emit("typing", room));
        socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
        socket.on("new message", (newMesageReceived) => {
            const chat = newMesageReceived.chatId;
            if (!chat.users)
                return console.log("chat.users undefined");
            chat.users.forEach((user) => {
                if (user.userName === newMesageReceived.sender.userName)
                    return;
                socket.in(user.userName).emit("message received", newMesageReceived);
            });
        });
        // for video chat
        // socket.on("join videoChat", ({ room,user, peerId }: IvideoChatRoom) => {
        //     if (rooms[user]) {
        //         console.log("user joined the room for video chat", room,user, peerId);
        //         rooms[user].push(peerId);
        //         socket.join(room);
        //         socket.to(room).emit("user-joined", { peerId });
        //         socket.emit("get-users", {
        //           room,
        //             participants: rooms[user],
        //         });
        //     }
        //     socket.on("disconnect", () => {
        //         console.log("user left the room", peerId);
        //         leaveRoom({ room,user, peerId });
        //     });
        // });
        const leaveRoom = ({ peerId, user, room }) => {
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
exports.default = socketConfig;
