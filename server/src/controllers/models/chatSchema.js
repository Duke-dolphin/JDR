import { model, Schema } from "mongoose";

const chatSchema = new Schema({
  username: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatModel = model("ChatMessage", chatSchema);

export default chatModel;
