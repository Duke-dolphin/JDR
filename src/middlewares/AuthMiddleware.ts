import * as express from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/UserService";

export default class AuthMiddleware {
  private static instance: AuthMiddleware;
  public userService: UserService;
  public constructor() {
    this.userService = UserService.getInstance();
  }
  static getInstance(): AuthMiddleware {
    if (!this.instance) {
      this.instance = new AuthMiddleware();
    }
    return this.instance;
  }

  loggerMiddleware(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    console.log(`${request.method} ${request.path}`);
    next();
  }

  async userVerification(req: express.Request, res: express.Response) {
    console.log("inside middleware");
    const token = req.cookies.token;
    if (!token) return res.json({ status: false });
    jwt.verify(token, process.env.TOKEN_KEY, async (err: any, data: any) => {
      if (err) return res.json({ status: false });
      else {
        const user = await this.userService.getUser(data.id);
        if (user) return res.json({ status: true, user: user.username });
        else return res.json({ status: false });
      }
    });
  }
}
