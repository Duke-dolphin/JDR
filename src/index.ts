import dotenv from "dotenv";
dotenv.config();
import express, {
  Application,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import connect from "./db";
import socketConnect from "./sockets/init";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import { routes } from "./routes";

// Initialize the Express application
const app: Application = express();
const port = process.env.PORT;
const authMiddleware = new AuthMiddleware();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

//use cors middleware
app.use(cors(options));

//enable pre-flight
// @ts-ignore
app.options("*", cors(options));

app.use(authMiddleware.loggerMiddleware);

app.use("/", routes);

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(cookieParser());

// used to serve static files
// now this will work => http://localhost:3000/images/kitten.jpg
// app.use(express.static(path.join(__dirname, "public")));

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
