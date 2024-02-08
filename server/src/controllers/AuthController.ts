import {
  Body,
  Controller,
  Post,
  Request,
  Route,
  SuccessResponse,
  Response,
} from "tsoa";
import { User } from "../database/models/UserSchema";
import { AuthService } from "../services/AuthService";
import express from "express";
// import createSecretToken from "../helpers/secretToken";

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

      // const token = createSecretToken(user._id);
      // response.cookie("token", token, {
      //   httpOnly: true,
      // });
    } catch (error) {
      if (error === "wrongCredentials") {
        this.setStatus(401);
        // response.status(401);
        // return response.json({message: "Wrong credentials"})
      } else this.setStatus(500);
      return error;
    }
  }

  @SuccessResponse("201", "Ok")
  @Post("signup")
  public async createUser(
    @Request() request: express.Request,
    @Body() userParams: userCreation
  ): Promise<User | string> {
    try {
      this.setStatus(201);
      const user = await this.authService.createUser(userParams);

      // generate auth cookie

      // const response = (<any>request).res as express.Response;
      // const token = createSecretToken(user._id);
      // response.cookie("token", token, {
      //   httpOnly: true,
      // });
      return user;
    } catch (error) {
      // gérer le cas d'exist dnas le try comme pour login
      if (error === "exist") {
        this.setStatus(302);
        return "User already exist";
      } else {
        this.setStatus(500);
        return error;
      }
    }
  }
}
