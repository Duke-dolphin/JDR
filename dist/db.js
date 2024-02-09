"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = ({ db }) => {
    const connect = () => {
        // Connect to MongoDB Atlas
        mongoose_1.default
            .connect(db)
            .then(() => {
            console.log("connection sucessful");
        })
            .catch((err) => {
            console.error("Connection error", err);
            return process.exit(1);
        });
    };
    connect();
    mongoose_1.default.connection.on("disconnected", connect);
};
//# sourceMappingURL=db.js.map