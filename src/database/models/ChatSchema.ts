import { model, Schema } from "mongoose";

export interface ChatMessage {
  userName: string;
  message: string;
  timeStamp: {
    type: Date;
  };
}

const ChatSchema = new Schema({
  username: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatModel = model("ChatMessage", ChatSchema);

export default ChatModel;
