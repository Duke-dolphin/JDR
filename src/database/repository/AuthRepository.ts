import UserModel, { User } from "../models/UserSchema";

export default class AuthRepository {
  private static instance: AuthRepository;
  public userModel = UserModel;
  private constructor() {}

  public static getInstance(): AuthRepository {
    if (!this.instance) {
      this.instance = new AuthRepository();
    }
    return this.instance;
  }

  async getUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async isUserExist(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async createUser(
    email: string,
    password: string,
    username: string,
    createdAt: Date
  ): Promise<User> {
    return await this.userModel.create({
      email,
      password,
      username,
      createdAt,
    });
  }
}
