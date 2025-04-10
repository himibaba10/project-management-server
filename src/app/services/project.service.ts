import { TProject, TQuery, TTask } from "../interfaces/project.interface";
import Project from "../models/project.model";

const getProjectsFromDB = async (user: string, queries: TQuery) => {
  try {
    const { status } = queries;
    const projects = await Project.find({ status: status || "active", user });

    if (!projects.length) {
      const error = new Error("No project found!");
      (error as any).status = 404;
      throw error;
    }

    return projects;
  } catch (error) {
    throw error;
  }
};

const getProjectFromDB = async (
  user: string,
  projectId: string,
  queries: TQuery
) => {
  try {
    const { priority, taskStatus, status, sortBy, asc } = queries;

    const project = await Project.findOne({
      user,
      _id: projectId,
      status: status || "active",
    });

    if (!project) {
      const error = new Error("No project found!");
      (error as any).status = 404;
      throw error;
    }

    if (priority)
      project.tasks = project.tasks?.filter(
        (task) => task.priority === priority
      );
    if (taskStatus)
      project.tasks = project.tasks?.filter(
        (task) => task.status === taskStatus
      );

    if (sortBy) {
      project.tasks = project.tasks?.sort((a: TTask, b: TTask) => {
        if (Number(asc) === 1) {
          return (
            new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
          );
        }

        if (Number(asc) === 0) {
          return (
            new Date(b.dueDate!).getTime() - new Date(a.dueDate!).getTime()
          );
        }

        return 0; // Default return value if dueDate is undefined
      });
    }

    return project;
  } catch (error) {
    throw error;
  }
};

const createProjectToDB = async (payload: TProject) => {
  try {
    const project = await Project.create(payload);

    return project;
  } catch (error) {
    throw error;
  }
};

const updateProjectToDB = async (id: string, payload: Partial<TProject>) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: id, user: payload.user },
      payload,
      { new: true }
    );

    if (!project) {
      const error = new Error("No project found!");
      (error as any).status = 404;
      throw error;
    }

    return project;
  } catch (error) {
    throw error;
  }
};

const deleteProjectFromDB = async (id: string, user: string) => {
  try {
    const project = await Project.findOneAndDelete({ _id: id, user });

    if (!project) {
      const error = new Error("No project found!");
      (error as any).status = 404;
      throw error;
    }

    return project;
  } catch (error) {
    throw error;
  }
};

const getTaskFromProject = async (id: string, taskId: string, user: string) => {
  try {
    const project = await Project.findOne({ _id: id, user });

    if (!project) {
      const error = new Error("Project not found");
      (error as any).status = 404;
      throw error;
    }

    let task = project.tasks?.find((task) => task._id.toString() === taskId);

    if (!task) {
      const error = new Error("Task not found");
      (error as any).status = 404;
      throw error;
    }

    return task;
  } catch (error) {
    throw error;
  }
};

const addTaskToProject = async (
  id: string,
  payload: TTask & { user: string }
) => {
  try {
    const { user, ...taskPayload } = payload;

    const project = await Project.findOne({ _id: id, user });

    if (!project) {
      const error = new Error("Project not found");
      (error as any).status = 404;
      throw error;
    }

    project.tasks?.push(taskPayload);

    const task = project.tasks?.[project.tasks.length - 1];

    await project.save();

    return task;
  } catch (error) {
    throw error;
  }
};

const udpateTaskToProject = async (
  id: string,
  taskId: string,
  payload: Partial<TTask> & { user: string }
) => {
  try {
    const project = await Project.findOne({ _id: id, user: payload.user });

    if (!project) {
      const error = new Error("Project not found");
      (error as any).status = 404;
      throw error;
    }

    let task = project.tasks?.find((task) => task._id.toString() === taskId);

    if (!task) {
      const error = new Error("Task not found");
      (error as any).status = 404;
      throw error;
    }

    if (payload.name !== undefined) task.name = payload.name;
    if (payload.description !== undefined)
      task.description = payload.description;
    if (payload.status !== undefined) task.status = payload.status;
    if (payload.dueDate !== undefined) task.dueDate = payload.dueDate;
    if (payload.priority !== undefined) task.priority = payload.priority;

    await project.save();

    return task;
  } catch (error) {
    throw error;
  }
};

const deleteTaskFromProject = async (
  id: string,
  taskId: string,
  user: string
) => {
  try {
    const project = await Project.findOne({ _id: id, user });

    if (!project) {
      const error = new Error("Project not found");
      (error as any).status = 404;
      throw error;
    }

    let taskIndex = project.tasks?.findIndex(
      (task) => task._id.toString() === taskId
    );

    if (taskIndex === -1 || taskIndex === undefined) {
      const error = new Error("Task not found");
      (error as any).status = 404;
      throw error;
    }

    // Removing the task
    project.tasks?.splice(taskIndex, 1);

    await project.save();
  } catch (error) {
    throw error;
  }
};

export const projectServices = {
  getProjectsFromDB,
  getProjectFromDB,
  createProjectToDB,
  updateProjectToDB,
  deleteProjectFromDB,
  getTaskFromProject,
  addTaskToProject,
  udpateTaskToProject,
  deleteTaskFromProject,
};
