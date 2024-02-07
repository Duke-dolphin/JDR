import { ChatMessage } from "../database/models/ChatSchema";
import ChatRepository from "../database/repository/ChatRepository";

export class ChatService {
  private static instance: ChatService;
  public chatRepository: ChatRepository;
  private constructor() {
    this.chatRepository = ChatRepository.getInstance();
  }

  static getInstance(): ChatService {
    if (!this.instance) {
      this.instance = new ChatService();
    }
    return this.instance;
  }

  async getHistory(): Promise<ChatMessage[]> {
    return await this.chatRepository.getHistory();
  }
}
