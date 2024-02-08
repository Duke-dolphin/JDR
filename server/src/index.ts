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
import swaggerUi from "swagger-ui-express";
import * as swaggerJson from "../dist/swagger.json";
import { RegisterRoutes } from "../dist/routes";
import { ValidateError } from "tsoa";
// import path from "node:path";

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
RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(cookieParser());

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

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
