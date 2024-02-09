import express, { Request, Response } from "express";
import { AuthRoutes } from "./AuthRoutes";

export const routes = express.Router();

routes.use(AuthRoutes);
