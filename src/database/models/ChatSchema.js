"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    username: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
const ChatModel = (0, mongoose_1.model)("ChatMessage", ChatSchema);
exports.default = ChatModel;
