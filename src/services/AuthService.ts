import { compare } from "bcryptjs";
import { loginParams, userCreation } from "../controllers/AuthController";
import { User } from "../database/models/UserSchema";
import AuthRepository from "../database/repository/AuthRepository";

export class AuthService {
  private static instance: AuthService;
  public authRepository: AuthRepository;
  private constructor() {
    this.authRepository = AuthRepository.getInstance();
  }

  static getInstance(): AuthService {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  async isUserAuthentified(email: string, password: string): Promise<boolean> {
    const user = await this.authRepository.getUser(email);
    if (!user) return null;
    return await compare(password, user.password);
  }

  async getUser(email: string): Promise<User> {
    return await this.authRepository.getUser(email);
  }

  async createUser(userCreation: userCreation): Promise<User | string | any> {
    const userExist = await this.authRepository.isUserExist(userCreation.email);
    if (userExist) return "found";
    const user = await this.authRepository.createUser(
      userCreation.email,
      userCreation.password,
      userCreation.username,
      new Date()
    );

    return user;
  }
}
