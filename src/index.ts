import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import userRouter from "./app/routes/user.route";
import cookieParser from "cookie-parser";
import projectRouter from "./app/routes/project.route";
import limiter from "./app/config/limiter";
import helmet from "helmet";

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(helmet());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to project management API");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);

// Error handling middleware
app.use(globalErrorHandler);

export default app;
