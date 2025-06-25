import { Application } from "express";
import userRouter from "./user.route";
import projectRouter from "./project.route";

const initiateRoutes = (app: Application) => {
  app.get("/", (req, res) => {
    res.send("Welcome to project management API from Docker!!");
  });

  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/projects", projectRouter);
};

export default initiateRoutes;
