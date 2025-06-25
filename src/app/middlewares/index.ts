import { Application } from "express";
import limiter from "../config/limiter";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

const initiateMiddlewares = (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(limiter);
  app.use(helmet());
};

export default initiateMiddlewares;
