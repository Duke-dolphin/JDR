import {
  Body,
  Controller,
  Post,
  Request,
  Route,
  SuccessResponse,
  Response,
  Middlewares,
} from "tsoa";
import { User } from "../database/models/UserSchema";
import { AuthService } from "../services/AuthService";
import express from "express";
import userVerification from "../middlewares/AuthMiddleware";
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

@Route("authenticate")
export class AuthController extends Controller {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = AuthService.getInstance();
  }

  @SuccessResponse("201", "OK")
  @Post("login")
  // @Middlewares(userVerification)
  public async login(
    @Request() request: express.Request,
    @Body() loginParams: loginParams
  ): Promise<any> {
    const response = (<any>request).res as express.Response;
    try {
      response.status(201);
      const auth = await this.authService.isUserAuthentified(loginParams);
      if (!auth) {
        response.status(401);
        return response.json({ message: "Incorrect password or email" });
      }
      // generate auth cookie
      const user = await this.authService.getUser(loginParams);
      const token = createSecretToken(user._id);
      response.cookie("token", token, {
        httpOnly: true,
      });
    } catch (error) {
      response.status(500);
      return error;
    }
  }

  @SuccessResponse("201", "Ok")
  @Post("signup")
  public async createUser(
    @Request() request: express.Request,
    @Body() userParams: userCreation
  ): Promise<User | string | any> {
    const response = (<any>request).res as express.Response;
    try {
      response.status(201);
      const user = await this.authService.createUser(userParams);
      if (user === "found") {
        response.status(302);
        return response.json({ message: "User already exist" });
      }
      // generate auth cookie
      const token = createSecretToken(user._id);
      response.cookie("token", token, {
        httpOnly: true,
      });

      return user;
    } catch (error) {
      // gérer le cas d'exist dnas le try comme pour login
      response.status(500);
      return error;
    }
  }
}
