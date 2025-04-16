import { Router } from "express";
import { projectControllers } from "../controllers/project.controller";
import auth from "../middlewares/auth";
import projectConstants from "../constants/project.constant";

const projectRouter = Router();

// Since every route is protected, hence this middleware is used globally
projectRouter.use(auth.authUser());

// Get all projects
projectRouter.get("/", projectControllers.getProjects);

// Get project by id
projectRouter.get("/:id", projectControllers.getProject);

// Create a project
projectRouter.post(
  "/",
  projectConstants.validateCreateProject,
  projectControllers.createProject
);

// Update project info
projectRouter.put(
  "/:id",
  projectConstants.validateUpdateProject,
  projectControllers.updateProject
);

// Delete a project
projectRouter.delete("/:id", projectControllers.deleteProject);

// Get a task from project
projectRouter.get("/:id/tasks/:taskId", projectControllers.getTask);

// add a task within a project
projectRouter.post(
  "/:id/tasks",
  projectConstants.validateCreateTask,
  projectControllers.addTask
);

// Update task
projectRouter.put(
  "/:id/tasks/:taskId",
  projectConstants.validateUpdateTask,
  projectControllers.updateTask
);

// Delete task from project
projectRouter.delete("/:id/tasks/:taskId", projectControllers.deleteTask);

export default projectRouter;
