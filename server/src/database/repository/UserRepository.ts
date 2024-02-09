import UserModel, { User } from "../models/UserSchema";

export default class UserRepository {
  private static instance: UserRepository;
  public userModel = UserModel;
  private constructor() {}

  public static getInstance(): UserRepository {
    if (!this.instance) {
      this.instance = new UserRepository();
    }
    return this.instance;
  }

  async getUser(id: string): Promise<User> {
    return await this.userModel.findById({ id });
  }
}
