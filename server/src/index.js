import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import chatModel from "./controllers/models/chatSchema.js";
dotenv.config();

// Initialize the Express application
const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = 3000;

// In the MongoDB Atlas connection string. Replace '<password>' with your actual password
const connectionString = process.env.MONGO_SRC;

// Connect to MongoDB Atlas
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("connection sucessful");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Initialize a simple API endpoint for fetching chat history
app.get("/chatHistory", async (req, res) => {
  const messages = await chatModel.find();
  res.json(messages);
});

// Handle socket events
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("chat", (data) => {
    console.log("Message received:", data);
    chatModel.create(data);
    io.emit("chat", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the Express server
server.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});
