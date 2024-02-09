import express, { Request, Response } from "express";
import { AuthRoutes } from "./AuthRoutes";

export const routes = express.Router();

routes.use("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

routes.use(AuthRoutes);
