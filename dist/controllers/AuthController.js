"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
// import userVerification from "../middlewares/AuthMiddleware";
const secretToken_1 = __importDefault(require("../helpers/secretToken"));
// @Route("authenticate")
class AuthController {
    constructor() {
        this.authService = AuthService_1.AuthService.getInstance();
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            try {
                response.status(201);
                const auth = yield this.authService.isUserAuthentified(email, password);
                if (!auth) {
                    response.status(401);
                    return response.json({ message: "Incorrect password or email" });
                }
                // generate auth cookie
                const user = yield this.authService.getUser(email);
                const token = (0, secretToken_1.default)(user._id);
                response.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
                return response.json({ message: "Connected" });
            }
            catch (error) {
                response.status(500);
                return error;
            }
        });
    }
    createUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.status(201);
                const user = yield this.authService.createUser(request.body);
                if (user === "found") {
                    response.status(302);
                    return response.json({ message: "User already exist" });
                }
                // generate auth cookie
                const token = (0, secretToken_1.default)(user._id);
                response.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
                return response.json({ message: "User created", user });
            }
            catch (error) {
                // gérer le cas d'exist dnas le try comme pour login
                response.status(500);
                return error;
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map