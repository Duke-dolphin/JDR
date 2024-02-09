import { ChatMessage } from "../database/models/ChatSchema";
import { ChatService } from "../services/ChatService";
import * as express from "express";

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = ChatService.getInstance();
  }

  public async getHistory(
    req: express.Request,
    res: express.Response
  ): Promise<ChatMessage[]> {
    try {
      res.status(200);
      return await this.chatService.getHistory();
    } catch (error) {
      res.status(500);
      throw error;
    }
  }
}
