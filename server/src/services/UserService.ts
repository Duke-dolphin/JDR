import { User } from "../database/models/UserSchema";
import UserRepository from "../database/repository/UserRepository";

export class UserService {
  private static instance: UserService;
  public userRepository: UserRepository;
  private constructor() {
    this.userRepository = UserRepository.getInstance();
  }

  static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  async getUser(id: string): Promise<User> {
    return await this.userRepository.getUser(id);
  }
}
