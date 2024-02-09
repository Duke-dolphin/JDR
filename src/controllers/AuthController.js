"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const tsoa_1 = require("tsoa");
const AuthService_1 = require("../services/AuthService");
const secretToken_1 = __importDefault(require("../helpers/secretToken"));
let AuthController = class AuthController extends tsoa_1.Controller {
    constructor() {
        super();
        this.authService = AuthService_1.AuthService.getInstance();
    }
    login(request, loginParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = request.res;
            try {
                response.status(201);
                const auth = yield this.authService.isUserAuthentified(loginParams);
                if (!auth) {
                    response.status(401);
                    return response.json({ message: "Incorrect password or email" });
                }
                // generate auth cookie
                const user = yield this.authService.getUser(loginParams);
                const token = (0, secretToken_1.default)(user._id);
                response.cookie("token", token, {
                    httpOnly: true,
                });
            }
            catch (error) {
                response.status(500);
                return error;
            }
        });
    }
    createUser(request, userParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = request.res;
            try {
                response.status(201);
                const user = yield this.authService.createUser(userParams);
                if (user === "found") {
                    response.status(302);
                    return response.json({ message: "User already exist" });
                }
                // generate auth cookie
                const token = (0, secretToken_1.default)(user._id);
                response.cookie("token", token, {
                    httpOnly: true,
                });
                return user;
            }
            catch (error) {
                // gérer le cas d'exist dnas le try comme pour login
                response.status(500);
                return error;
            }
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.SuccessResponse)("201", "OK"),
    (0, tsoa_1.Post)("login")
    // @Middlewares(userVerification)
    ,
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)())
], AuthController.prototype, "login", null);
__decorate([
    (0, tsoa_1.SuccessResponse)("201", "Ok"),
    (0, tsoa_1.Post)("signup"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)())
], AuthController.prototype, "createUser", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("authenticate")
], AuthController);
