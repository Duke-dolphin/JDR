import dotenv from "dotenv";
import express, { Application } from "express";
import connect from "./db";
import socketConnect from "./sockets/init";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import * as swaggerJson from "../dist/swagger.json";
import { RegisterRoutes } from "../dist/routes";

dotenv.config();

// Initialize the Express application
const app: Application = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  ["/openapi", "/docs", "/swagger"],
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson)
);

RegisterRoutes(app);

app.use(cors());
app.use(cookieParser());

const server = createServer(app);
console.info("Initialize database");
const db = process.env.MONGO_SRC ?? "whatever default";
connect({ db });

console.info("initialize socket server");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

socketConnect(io);

// Start the Express server
server.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});
