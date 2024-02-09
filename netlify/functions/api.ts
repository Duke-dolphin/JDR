import express, { Router } from "express";
import serverless from "serverless-http";
import { routes } from "../../src/routes";

const api = express();

api.use("/api/", routes);

export const handler = serverless(api);
