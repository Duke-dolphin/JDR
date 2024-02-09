"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
exports.AuthRoutes = express_1.default.Router();
const authController = new AuthController_1.AuthController();
exports.AuthRoutes.post("/authenticate/login", (req, res, _next) => {
    authController.login(req, res);
});
exports.AuthRoutes.post("/authenticate/signup", (req, res, _next) => {
    authController.createUser(req, res);
});
//# sourceMappingURL=AuthRoutes.js.map