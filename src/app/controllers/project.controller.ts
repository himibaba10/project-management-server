import { NextFunction, Request, Response } from "express";
import { projectServices } from "../services/project.service";
import validateErrors from "../utils/validateErrors";
import { TQuery } from "../interfaces/project.interface";

const getProjectsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await projectServices.getProjectsByUserFromDB(
      (req as any).user,
      req.query as TQuery
    );

    res.json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await projectServices.getProjectFromDB(
      (req as any).user,
      req.params.projectId,
      req.query as TQuery
    );

    res.json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validateErrors(req, res)) return;
  try {
    req.body.owner = (req as any).user;

    const project = await projectServices.createProjectToDB(req.body);

    res.json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validateErrors(req, res)) return;
  try {
    req.body.owner = (req as any).user;

    const project = await projectServices.updateProjectToDB(
      req.params.projectId,
      req.body
    );

    res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await projectServices.deleteProjectFromDB(
      req.params.projectId,
      (req as any).user
    );

    res.json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await projectServices.getTaskFromProject(
      req.params.projectId,
      req.params.taskId,
      (req as any).user
    );

    res.json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const addTask = async (req: Request, res: Response, next: NextFunction) => {
  if (validateErrors(req, res)) return;
  try {
    req.body.user = (req as any).user;

    const task = await projectServices.addTaskToProject(
      req.params.projectId,
      req.body
    );

    res.json({
      success: true,
      data: task,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  if (validateErrors(req, res)) return;
  try {
    req.body.user = (req as any).user;

    const task = await projectServices.udpateTaskToProject(
      req.params.projectId,
      req.params.taskId,
      req.body
    );

    res.json({
      success: true,
      data: task,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await projectServices.deleteTaskFromProject(
      req.params.projectId,
      req.params.taskId,
      (req as any).user
    );

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const projectControllers = {
  getProjectsByUser,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
