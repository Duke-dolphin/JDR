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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const ChatService_1 = require("../services/ChatService");
class ChatController {
    constructor() {
        this.chatService = ChatService_1.ChatService.getInstance();
    }
    getHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200);
                return yield this.chatService.getHistory();
            }
            catch (error) {
                res.status(500);
                throw error;
            }
        });
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=ChatController.js.map