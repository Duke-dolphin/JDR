"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatSchema_1 = __importDefault(require("../database/models/ChatSchema"));
exports.default = (io) => {
    // Handle socket events
    io.on("connection", (socket) => {
        console.log("New client connected");
        socket.on("chat", (data) => {
            console.log("Message received:", data);
            ChatSchema_1.default.create(data);
            io.emit("chat", data);
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};
