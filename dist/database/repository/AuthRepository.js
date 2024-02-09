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
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
class AuthRepository {
    constructor() {
        this.userModel = UserSchema_1.default;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AuthRepository();
        }
        return this.instance;
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ email });
        });
    }
    isUserExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ email });
        });
    }
    createUser(email, password, username, createdAt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.create({
                email,
                password,
                username,
                createdAt,
            });
        });
    }
}
exports.default = AuthRepository;
//# sourceMappingURL=AuthRepository.js.map