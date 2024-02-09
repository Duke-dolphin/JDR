import express from "express";
import { AuthRoutes } from "./AuthRoutes";

export const routes = express.Router();

routes.use(AuthRoutes);
