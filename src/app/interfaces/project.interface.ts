import { ObjectId } from "mongoose";
import { TUser } from "./user.interface";

export type TQuery = {
  page: string;
  limit: string;
  priority: string;
  status: string;
  sortBy: string;
  taskStatus: string;
  asc: string;
};

export type TTask = {
  _id: ObjectId;
  name: string;
  description?: string;
  status: "to-do" | "in-progress" | "completed";
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProject = {
  _id: ObjectId;
  owner: ObjectId;
  title: string;
  description?: string;
  status: "active" | "archived";
  collaborators?: TUser[];
  tasks?: TTask[];
};
