import { Controller, Get, Route, SuccessResponse } from "tsoa";
import { ChatMessage } from "../database/models/ChatSchema";
import { ChatService } from "../services/ChatService";

@Route("chat")
export class ChatController extends Controller {
  private chatService: ChatService;

  constructor() {
    super();
    this.chatService = ChatService.getInstance();
  }

  @SuccessResponse("200", "Ok")
  @Get()
  public async getHistory(): Promise<ChatMessage[]> {
    try {
      this.setStatus(200);
      return await this.chatService.getHistory();
    } catch (error) {
      this.setStatus(500);
      throw error;
    }
  }
}
