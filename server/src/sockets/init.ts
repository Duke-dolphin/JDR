import { Server, Socket } from "socket.io";
import ChatModel from "../database/models/ChatSchema";

export default (io: Server) => {
  // Handle socket events

  io.on("connection", (socket: Socket) => {
    console.log("New client connected");
    socket.on("chat", (data: String) => {
      console.log("Message received:", data);
      ChatModel.create(data);
      io.emit("chat", data);
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
