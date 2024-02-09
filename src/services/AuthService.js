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
exports.AuthService = void 0;
const bcryptjs_1 = require("bcryptjs");
const AuthRepository_1 = __importDefault(require("../database/repository/AuthRepository"));
class AuthService {
    constructor() {
        this.authRepository = AuthRepository_1.default.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }
    isUserAuthentified(loginParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authRepository.getUser(loginParams.email);
            return yield (0, bcryptjs_1.compare)(loginParams.password, user.password);
        });
    }
    getUser(loginParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.getUser(loginParams.email);
        });
    }
    createUser(userCreation) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.authRepository.isUserExist(userCreation.email);
            if (userExist)
                return "found";
            const user = yield this.authRepository.createUser(userCreation.email, userCreation.password, userCreation.username, new Date());
            return user;
        });
    }
}
exports.AuthService = AuthService;
