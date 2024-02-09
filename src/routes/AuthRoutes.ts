import express from "express";
import { AuthController } from "../controllers/AuthController";

export const AuthRoutes = express.Router();

const authController = new AuthController();

AuthRoutes.post("/authenticate/login", (req, res, _next) => {
  authController.login(req, res);
});

AuthRoutes.post("/authenticate/signup", (req, res, _next) => {
  authController.createUser(req, res);
});
