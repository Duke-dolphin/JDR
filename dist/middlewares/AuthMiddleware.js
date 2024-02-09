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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = require("../services/UserService");
class AuthMiddleware {
    constructor() {
        this.userService = UserService_1.UserService.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthMiddleware();
        }
        return this.instance;
    }
    loggerMiddleware(request, response, next) {
        console.log(`${request.method} ${request.path}`);
        next();
    }
    userVerification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside middleware");
            const token = req.cookies.token;
            if (!token)
                return res.json({ status: false });
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY, (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return res.json({ status: false });
                else {
                    const user = yield this.userService.getUser(data.id);
                    if (user)
                        return res.json({ status: true, user: user.username });
                    else
                        return res.json({ status: false });
                }
            }));
        });
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map