import ChatModel, { ChatMessage } from "../models/ChatSchema";

export default class ChatRepository {
  private static instance: ChatRepository;
  public chatModel = ChatModel;
  private constructor() {}

  public static getInstance(): ChatRepository {
    if (!this.instance) {
      this.instance = new ChatRepository();
    }
    return this.instance;
  }

  async getHistory(): Promise<ChatMessage[]> {
    return await this.chatModel.find();
  }
}
