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

  async isUserAuthentified(loginParams: loginParams): Promise<boolean> {
    const user = await this.authRepository.getUser(loginParams.email);
    return await compare(loginParams.password, user.password);
  }

  async createUser(userCreation: userCreation): Promise<User> {
    const userExist = await this.authRepository.isUserExist(userCreation.email);
    // renvoyer le user et s'il existe gérer le cas dans le try
    // plus propre que throw
    if (userExist) throw "exist";
    const user = await this.authRepository.createUser(
      userCreation.email,
      userCreation.password,
      userCreation.username,
      new Date()
    );

    return user;
  }
}
