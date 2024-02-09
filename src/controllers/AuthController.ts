import { User } from "../database/models/UserSchema";
import { AuthService } from "../services/AuthService";
import express from "express";
// import userVerification from "../middlewares/AuthMiddleware";
import createSecretToken from "../helpers/secretToken";

export interface userCreation {
  email: string;
  username: string;
  password: string;
}

export interface loginParams {
  email: string;
  password: string;
}

// @Route("authenticate")
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  public async login(
    request: express.Request,
    response: express.Response
  ): Promise<express.Response> {
    const { email, password } = request.body;
    try {
      response.status(201);
      const auth = await this.authService.isUserAuthentified(email, password);
      if (!auth) {
        response.status(401);
        return response.json({ message: "Incorrect password or email" });
      }
      // generate auth cookie
      const user = await this.authService.getUser(email);
      const token = createSecretToken(user._id);
      response.cookie("token", token, {
        httpOnly: false,
        sameSite: "none",
        secure: true,
      });
      return response.json({ message: "Connected" });
    } catch (error) {
      response.status(500);
      return error;
    }
  }

  public async createUser(
    request: express.Request,
    response: express.Response
  ): Promise<express.Response> {
    try {
      response.status(201);
      const user = await this.authService.createUser(request.body);
      if (user === "found") {
        response.status(302);
        return response.json({ message: "User already exist" });
      }
      // generate auth cookie
      const token = createSecretToken(user._id);
      response.cookie("token", token, {
        httpOnly: false,
        sameSite: "none",
        secure: true,
      });
      return response.json({ message: "User created", user });
    } catch (error) {
      // gérer le cas d'exist dnas le try comme pour login
      response.status(500);
      return error;
    }
  }
}
