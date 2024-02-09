"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const init_1 = __importDefault(require("./sockets/init"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const AuthMiddleware_1 = __importDefault(require("./middlewares/AuthMiddleware"));
const routes_1 = require("./routes");
// Initialize the Express application
const app = (0, express_1.default)();
const port = process.env.PORT;
const authMiddleware = new AuthMiddleware_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
//options for cors midddleware
const options = {
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
app.use((0, cors_1.default)(options));
//enable pre-flight
// @ts-ignore
app.options("*", (0, cors_1.default)(options));
app.use(authMiddleware.loggerMiddleware);
app.use("/", routes_1.routes);
app.use(function notFoundHandler(_req, res) {
    res.status(404).send({
        message: "Not Found",
    });
});
app.use((0, cookie_parser_1.default)());
// used to serve static files
// now this will work => http://localhost:3000/images/kitten.jpg
// app.use(express.static(path.join(__dirname, "public")));
const server = (0, node_http_1.createServer)(app);
console.info("Initialize database");
const db = (_a = process.env.MONGO_SRC) !== null && _a !== void 0 ? _a : "whatever default";
(0, db_1.default)({ db });
console.info("initialize socket server");
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
(0, init_1.default)(io);
// Start the Express server
server.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map