"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const AuthRoutes_1 = require("./AuthRoutes");
exports.routes = express_1.default.Router();
exports.routes.use("/", (_req, res) => {
    return res.send("Express Typescript on Vercel");
});
exports.routes.use(AuthRoutes_1.AuthRoutes);
//# sourceMappingURL=index.js.map